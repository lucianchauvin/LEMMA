import type { PageServerLoad, Actions } from './$types';
import type { UUID, Course, Assignment, StudentAssignment, StudentProof, Problem, Statement } from '$lib/types';
import { DATAROOT } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import * as stream from 'stream';
import * as fsStream from 'fs';
import * as path from 'path';

type ProblemStatementProofs = Problem & {complete: boolean, statements: Statement[]};

const BASE_DIR = path.join("data", "problems");

export const load = (async ({params, locals: { safeQuery, getSession }}) => {
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

    return {
        course: courseResult[0],
        assignment: assignmentResult[0],
        studentAssignment,
        problems: problemStatementProofs
    };
        
}) satisfies PageServerLoad;

export const actions: Actions = {
    problem: async({ request, cookies, locals: { safeQuery } }) => {
        const formData = await request.formData();
        
        const problemId: UUID = formData.get("problem_id") as UUID;
        const file: File = formData.get("file") as File;

        if (!file || !(file instanceof File)) {
          throw error(400, "Invalid file");
        }

        const filePath = path.join(DATAROOT, BASE_DIR, problemId + '.lean');


        // Use a writable stream to write directly to the file
        const writableStream = fsStream.createWriteStream(filePath);

        // Pipe the incoming file stream to the writable stream
        const readableStream = file.stream();
        readableStream.pipe(writableStream);

        // Wait for the file to be written completely
        await new Promise<void>((resolve, reject) => {
          writableStream.on('finish', resolve);
          writableStream.on('error', reject);
        });

        try {
          await fs.writeFile(filePath, file, "utf-8");
        } catch (err) {
          console.error("File write error:", err);
          throw error(500, "Failed to write file");
        }

        return { type: "success" };
      }       
    }
}
