import {promises as fs} from 'zlib';
import * as path from 'path';
import { json, error } from '@sveltejs/kit';
import { BASE_PROOF_DIR, BASE_PROBLEM_DIR } from '$lib/constants';
import type { RequestHandler } from './$types';

/**
 * Handles requests to load a proof or problem file, and creates a new proof if does not exist.
 * 
 * This handler supports:
 * - Returning the original problem file content if `orig` is `true`.
 * - Inserting a new proof record if `proofId` is not provided.
 * - Returning the content of the existing proof file, or if not found, return the problem file.
 * 
 * @param {RequestEvent} event - The request event containing the proofId, problemId, studentAssignmentId, and orig fields.
 * @returns {Response} A JSON response with the proof content or problem content and proofId.
 * 
 * @throws {HttpError} 400 - If proof insertion fails due to bad request.
 * @throws {HttpError} 500 - If there is an error loading the proof or problem file.
 */
export const POST: RequestHandler = async ({ request, locals: { safeQuery, permCheck } }) => {
    let { proofId, problemId, studentAssignmentId, orig } = await request.json();
    const problemFilePath = path.join(BASE_PROBLEM_DIR, problemId);
    if(orig === true) {
        try {
            const content = await fs.readFile(problemFilePath, 'utf-8');
            return json({ content, proofId });
        } catch (err) {
            console.error('Error loading original problem file:', err);
            throw error(500, { message: 'Failed to load original problem file' });
        }
    }

    if(!proofId) {
        const { data: proofRes, error: proofErr} = await safeQuery(`INSERT INTO student_proofs (problem_id, student_assignment_id) VALUES ($1, $2) RETURNING proof_id`, [problemId, studentAssignmentId]);

        if(proofErr) {
            console.log(proofErr)
            throw error(400, { message: 'Bad Request'})
        }

        proofId = proofRes![0].proof_id;
    }

    try {
        const filePath = path.join(BASE_PROOF_DIR, proofId);
        const content = await fs.readFile(filePath, 'utf-8');
        return json({ content, proofId });
    } catch (err) {
        console.error('Proof doesnt exist, attempting to load problem file proofId: ', proofId, ' problemId: ', problemId);
        try {
            const { data: edit, error: editErr} = await safeQuery<{edit: boolean}>(`SELECT edit FROM student_assignments WHERE student_assignment_id=$1`, [studentAssignmentId]);

            if(editErr) {
                console.log(editErr)
                throw error(500, { message: 'Failed to determine if assignment is editable'})
            }

            if(edit![0].edit) {
                await fs.writeFile(problemFilePath, '', 'utf-8');
                return json({content: '', proofId});
            }

            const content = await fs.readFile(problemFilePath, 'utf-8');
            return json({ content, proofId });
        } catch (problemError) {
            console.error('Error loading problem file:', problemError);
            throw error(500, { message: 'Failed to load proof and problem file' });
        }
    }
}
