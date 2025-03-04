import type { PageServerLoad } from './$types';
import type { Course, Assignment, StudentAssignment, StudentProof, Problem, Statement } from '$lib/types';
import { error } from '@sveltejs/kit';

type ProblemStatementProofs = {problem: Problem, statements: Statement[], proofs: StudentProof[]};

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const {course, assignment} = await parent();
    const {data: [studentAssignment], error: studentErr} = await safeQuery<StudentAssignment>("SELECT * FROM student_assignments WHERE student_assignment_id=$1", [params.student_assignment]);
    if(studentErr){
        console.error('ERROR: Database failed to query student assignments for assignment:', studentErr);
        error(500, {message: 'Database failed to query student assignments for assignment'})
    }
    const {data: problemStatementProofs, error: problemStatementProofErr} = await safeQuery<ProblemStatementProofs>(`
        SELECT 
            json_agg(p.*) AS problem,
            json_agg(s.*) AS statements
            json_agg(pr.*) AS proofs
        FROM problems p
        JOIN problem_statements ps ON p.problem_id = ps.problem_id
        JOIN statements s ON s.statement_id = ps.statement_id
        JOIN proofs pr ON pr.problem_id = p.problem_id
        WHERE p.assignment_id=$1
        GROUP BY p.problem_id;
    `, [studentAssignment.student_assignment_id]);
    if(problemStatementProofErr){
        console.error('ERROR: Database failed to query for all the statements for each problem:', problemStatementProofErr);
        error(500, {message: 'Database failed to query for all the statements for each problem:'})
    }

    return {
        course,
        assignment,
        studentAssignment,
        problems: problemStatementProofs
    };
        
}) satisfies PageServerLoad;
