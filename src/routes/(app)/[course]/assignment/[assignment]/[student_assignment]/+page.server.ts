import type { PageServerLoad, Actions } from './$types';
import type { UUID, Course, Assignment, StudentAssignment, StudentProof, Problem, Statement } from '$lib/types';
import { isUUID } from '$lib/util';
import { fail, error, redirect } from '@sveltejs/kit';
import { BASE_PROBLEM_DIR } from '$lib/constants';
import {promises as fs} from 'zlib';
import * as path from 'node:path';

type ProblemStatementProofs = Problem & {complete: boolean, statements: Statement[]};

export const load = (async ({params, locals: { safeQuery, permCheck }}) => {
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

    if (assignmentResult!.length === 0) 
        throw error(404, {message: 'No assignment found'}); 
    if (assignmentResult!.length > 1) {
        // should never happen
        console.error(`Found multiple assignments with id ${params.assignment}`);
        throw error(500);
    }

    const {data: studentAssignmentData, error: studentErr} = await safeQuery<StudentAssignment>("SELECT * FROM student_assignments WHERE student_assignment_id=$1", [params.student_assignment]);
    if(studentErr){
        console.error('ERROR: Database failed to query student assignments for assignment:', studentErr);
        throw error(400, {message: 'Invalid student assignment id'})
    }
    if(studentAssignmentData!.length == 0) {
        console.error('ERROR: Failed to find student assignment');
        throw error(500, {message: 'Failed to find student assignment'})
    }
    const studentAssignment = studentAssignmentData![0];
    const {data: problemStatementProofs, error: problemStatementProofErr} = await safeQuery<ProblemStatementProofs>(`
        SELECT DISTINCT ON (problem_number)
            p.*, 
            pr.proof_id,
            COALESCE(pr.complete, false) AS complete,  -- Default to false if no proof
            COALESCE(jsonb_agg(to_jsonb(s)) FILTER (WHERE s.statement_id IS NOT NULL), '[]'::jsonb) AS statements
        FROM problems p
        LEFT JOIN problem_statements ps ON p.problem_id = ps.problem_id
        LEFT JOIN statements s ON s.statement_id = ps.statement_id
        LEFT JOIN student_proofs pr ON pr.problem_id = p.problem_id AND pr.student_assignment_id = $1
        WHERE p.assignment_id = (SELECT assignment_id FROM student_assignments WHERE student_assignment_id = $1)
        GROUP BY p.problem_id, pr.complete, pr.proof_id
        ORDER BY p.problem_number;
    `, [params.student_assignment]);
    if(problemStatementProofErr){
        console.error('ERROR: Database failed to query for all the statements for each problem:', problemStatementProofErr);
        error(500, {message: 'Database failed to query for all the statements for each problem:'})
    }

    const {data: viewStudentAssignments, error: viewStudentAssignmentsErr} = await permCheck('view_course_student_assignments', params.course);

    if(viewStudentAssignmentsErr) {
        console.error('ERROR: Failed to determine permission for view all student assignments:', viewStudentAssignmentsErr);
        throw error(500, {message: 'Failed to determine permission for view all student assignments'})
    }


    return {
        course: courseResult[0],
        assignment: assignmentResult![0],
        studentAssignment,
        problems: problemStatementProofs,
        permissions: {
            view_course_student_assignments: viewStudentAssignments
        }
    };
        
}) satisfies PageServerLoad;

export const actions: Actions = {
  /**
   * Updating the problem description
   */
    problem_description: async({ request, params, locals: { safeQuery, permCheck } }) => {
        const {data: perm, error: permErr} = await permCheck('update_assignments', params.course);
        if(permErr) {
            console.error("ERROR: Failed to determine permission for updating assignments:", permErr);
            throw error(500, {message: "Failed to determine permission for updating assignments"})
        }
        if(!perm.access) {
            return fail(403, {error: "Forbidden"});
        }

        const formData = await request.formData();
        const description = formData.get("description") as string;
        const problemId = formData.get("problemId") as string;

        if(!description) return fail(400, {error: "Expected description"});
        if(!problemId || !isUUID(problemId)) return fail(400, {error: "Expected problem id"});

        const {error: updateErr} = await safeQuery(
            `UPDATE problems SET problem_description=$1 WHERE problem_id=$2`, 
        [description, problemId]);

        if(updateErr) {
            console.error("ERROR: Failed to update problem description:", updateErr);
            throw error(500, {message: "Failed to update problem description"});
        }
    },

  /**
   * Creating a new problem
   */
    problem_name: async({ request, params, locals: { safeQuery, permCheck } }) => {
        const {data: perm, error: permErr} = await permCheck('update_assignments', params.course);
        if(permErr) {
            console.error("ERROR: Failed to determine permission for updating assignments:", permErr);
            throw error(500, {message: "Failed to determine permission for updating assignments"})
        }
        if(!perm.access) {
            return fail(403, {message: "Forbidden"});
        }

        const formData = await request.formData();
        const problemName = formData.get("problemName");

        if(!problemName) return fail(400, {message: "Expected description"});

        const {error: insertErr} = await safeQuery(
            `INSERT INTO problems (assignment_id, problem_name) VALUES ($1, $2)`, 
        [params.assignment, problemName]);

        if(insertErr) {
            console.error("ERROR: Failed to insert new problem name:", insertErr);
            throw error(500, {message: "Failed to insert new problem"});
        }
    },

  /**
   * Deleting a problem
   */
    delete_problem: async({ request, params, locals: { safeQuery, permCheck } }) => {
        const {data: perm, error: permErr} = await permCheck('update_assignments', params.course);
        if(permErr) {
            console.error("ERROR: Failed to determine permission for updating assignments:", permErr);
            throw error(500, {message: "Failed to determine permission for updating assignments"})
        }
        if(!perm.access) {
            return fail(403, {message: "Forbidden"});
        }

        const formData = await request.formData();
        const problemId = formData.get("problemId");

        if(!problemId || !isUUID(problemId as string)) return fail(400, {message: "Expected problem id"});

        const {error: deleteErr} = await safeQuery(
            `DELETE FROM problems WHERE problem_id=$1`, 
        [problemId as UUID]);

        if(deleteErr) {
            console.error("ERROR: Failed to delete problem:", deleteErr);
            throw error(500, {message: "Failed to delete problem"});
        }

    },

  /**
   * Saving a problem into file
   */
    save_problem: async({ request, params, locals: { safeQuery, permCheck } }) => {
        const {data: perm, error: permErr} = await permCheck('update_assignments', params.course);
        if(permErr) {
            console.error("ERROR: Failed to determine permission for updating assignments:", permErr);
            throw error(500, {message: "Failed to determine permission for updating assignments"})
        }
        if(!perm.access) {
            return fail(403, {message: "Forbidden"});
        }

        const formData = await request.formData();
        const problemId = formData.get("problemId");
        const content = formData.get("content");

        if(!problemId || !isUUID(problemId as string)) return fail(400, {message: "Expected problem id"});
        if(!content) return fail(400, {message: "Expected content"});

        const problemFilePath = path.join(BASE_PROBLEM_DIR, problemId as UUID);

        const { data: result_statements, error: err_statements } = await safeQuery('SELECT 1 FROM problems where problem_id = $1', [problemId]);
        if(err_statements || result_statements!.length <= 0) throw error(400, { message: 'Problem not found in database' });

        await fs.writeFile(problemFilePath, content as string, 'utf-8');
    }
}
