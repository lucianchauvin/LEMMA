import {promises as fs} from 'zlib';
import * as path from 'path';
import { json, error } from '@sveltejs/kit';
import { BASE_PROOF_DIR, BASE_PROBLEM_DIR } from '$lib/constants';
import type { RequestHandler } from './$types';

/**
 * Handles the request to save or update a proof file based on the provided `proofId`.
 * 
 * This handler performs the following steps:
 * - Validates the provided `proofId`.
 * - Checks if the `proofId` exists in the database.
 * - Writes the new content to the proof file if the proof exists.
 * 
 * @param {RequestEvent} event - The SvelteKit request event containing the request body with `proofId` and `content`.
 * @returns {Response} A JSON response with a success message or error details.
 * 
 * @throws {HttpError} 400 - If the `proofId` is not provided or invalid.
 * @throws {HttpError} 500 - If there is an error with the database query or file writing.
 */
export const POST: RequestHandler = async ({ request, locals: { safeQuery, permCheck } }) => {
    const { proofId, content } = await request.json();

    if(!proofId) {
        throw error(400, { message: 'Proof id is not valid'});
    }

    try {
        const filePath = path.join(BASE_PROOF_DIR, proofId);
        const { data: result_statements, error: err_statements } = await safeQuery('SELECT * FROM student_proofs where proof_id = $1', [proofId]);
        if(err_statements || result_statements!.length <= 0) throw error(500, { message: 'SAVEPROOF: Proof doesnt exist in db or cannot connect to db' });
        await fs.writeFile(filePath, content, 'utf-8');
        return json({ message: 'Proof saved successfully' });
    } catch (err) {
        console.error('Error saving proof:', err);
        throw error(500, { message: 'Failed to save proof' });
    }
};
