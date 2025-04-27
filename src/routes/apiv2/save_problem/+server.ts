import {promises as fs} from 'zlib';
import * as path from 'path';
import type { UUID } from '$lib/types';
import { isUUID } from '$lib/util';
import { json, error } from '@sveltejs/kit';
import { BASE_PROBLEM_DIR } from '$lib/constants';
import type { RequestHandler } from './$types';

/**
 * Handles the request to update the content of a problem file for a specific course.
 * 
 * This handler performs the following steps:
 * - Checks if the user has the necessary permissions to update assignments for the course.
 * - Validates the `problemId` to ensure it is a valid UUID.
 * - Checks if the `problemId` exists in the database.
 * - Writes the new content to the corresponding problem file.
 * 
 * @param {RequestEvent} event - The SvelteKit request event containing the `courseId`, `problemId`, and `content` in the request body.
 * @returns {Response} A JSON response with a success message or error details.
 * 
 * @throws {HttpError} 400 - If the `problemId` is invalid or the problem is not found in the database.
 * @throws {HttpError} 403 - If the user does not have permission to update the assignment.
 * @throws {HttpError} 500 - If there is an error determining the user's permissions or any unexpected error occurs.
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
