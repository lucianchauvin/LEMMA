import type { PageServerLoad } from './$types';
import type { Course, Assignment, StudentAssignment, StudentProof, Problem, Statement } from '$lib/types';
import { error } from '@sveltejs/kit';

type ProblemStatementProofs = Problem & {complete: boolean, proof_filepath: string, statements: Statement[]};

export const load = (async ({params, locals: { safeQuery }}) => {
    const {data: courseResult, error: courseErr} = await safeQuery<Course>("SELECT * FROM courses WHERE course_id=$1", [params.course]);

    if(courseErr) {
        console.error('ERROR: Database failed to query courses for specific course:', courseErr);
        error(500, {message: 'Database failed to query courses for specific course'})
    }

    if (!courseResult) 
        throw error(404, {message: 'No course found'}); // no course found like this
    if (courseResult.length > 1) {
        // should never happen
        console.error(`Found multiple courses with id ${params.course}`);
        throw error(500, {message: 'Multiple courses found with this id'});
    }

    const {data: assignmentResult, error: assignmentErr} = await safeQuery<Assignment>("SELECT * FROM assignments WHERE assignment_id=$1", [params.assignment]);

    if(assignmentErr) {
        console.error('ERROR: Database failed to query assignments for specific assignment:', assignmentErr);
        error(500, {message: 'Database failed to query assignments for specific assignment'});
    }

    if (assignmentResult.length === 0) 
        throw error(404, {message: 'No assignment found'}); 
    if (assignmentResult.length > 1) {
        // should never happen
        console.error(`Found multiple assignments with id ${params.assignment}`);
        throw error(500);
    }

    const {data: [studentAssignment], error: studentErr} = await safeQuery<StudentAssignment>("SELECT * FROM student_assignments WHERE student_assignment_id=$1", [params.student_assignment]);
    if(studentErr){
        console.error('ERROR: Database failed to query student assignments for assignment:', studentErr);
        error(500, {message: 'Database failed to query student assignments for assignment'})
    }
    const {data: problemStatementProofs, error: problemStatementProofErr} = await safeQuery<ProblemStatementProofs>(`
        SELECT 
            p.*,
            pr.complete,
            pr.proof_filepath,
            COALESCE(jsonb_agg(to_jsonb(s)) FILTER (WHERE s.statement_id IS NOT NULL), '[]'::jsonb) AS statements
        FROM problems p
        LEFT JOIN problem_statements ps ON p.problem_id = ps.problem_id
        LEFT JOIN statements s ON s.statement_id = ps.statement_id
        LEFT JOIN student_proofs pr ON pr.problem_id = p.problem_id
        WHERE pr.student_assignment_id=$1
        GROUP BY p.problem_id, pr.complete, pr.proof_filepath;
    `, [params.student_assignment]);
    if(problemStatementProofErr){
        console.error('ERROR: Database failed to query for all the statements for each problem:', problemStatementProofErr);
        error(500, {message: 'Database failed to query for all the statements for each problem:'})
    }

    console.log(problemStatementProofs);

    return {
        course: courseResult[0],
        assignment: assignmentResult[0],
        studentAssignment,
        problems: problemStatementProofs
    };
        
}) satisfies PageServerLoad;
