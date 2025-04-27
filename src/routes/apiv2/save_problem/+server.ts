import {promises as fs} from 'zlib';
import * as path from 'path';
import type { UUID } from '$lib/types';
import { isUUID } from '$lib/util';
import { json, error } from '@sveltejs/kit';
import { BASE_PROBLEM_DIR } from '$lib/constants';
import type { RequestHandler } from './$types';

/**
 * Updates the content of a problem file.
 * 
 * Checks user permission to update assignments for the given course, verifies the problem exists,
 * and saves the new content to the problem's file.
 * 
 * @param courseId {UUID} - Course id to check if have permission to save a problem
 * @param problemId {UUID} - Problem id for what the content is save to
 * @param content {string} - Content to save to the problem
 * @returns A JSON response confirming the proof was saved successfully.
 * 
 * @throws 400 - If the problem ID is missing, invalid, or the problem does not exist.
 * @throws 403 - If the user does not have permission to update assignments.
 * @throws 500 - If there is a failure checking permissions or saving the file.
 */
export const POST: RequestHandler = async ({ request, locals: { safeQuery, permCheck } }) => {
    const { courseId, problemId, content } = await request.json();

    const {data: perm, error: permErr} = await permCheck('update_assignments', courseId);
    if(permErr) {
        console.error("ERROR: Failed to determine permission for updating assignments:", permErr);
        throw error(500, {message: "Failed to determine permission for updating assignments"})
    }
    if(!perm.access) {
        return error(403, {message: "Forbidden"});
    }

    if(!problemId || !isUUID(problemId as string)) return error(400, {message: "Expected problem id"});

    const problemFilePath = path.join(BASE_PROBLEM_DIR, problemId as UUID);

    const { data: result_statements, error: err_statements } = await safeQuery('SELECT 1 FROM problems where problem_id = $1', [problemId]);
    if(err_statements || result_statements!.length <= 0) return error(400, { message: 'Problem not found in database' });

    await fs.writeFile(problemFilePath, content as string, 'utf-8');

    return json({ message: 'Proof saved successfully' });
};
