import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Marks a student's proof as complete.
 * 
 * Updates the `complete` status for a specific proof in the database. 
 * This also causes the trigger in database to update grade for the assignment.
 * 
 * @param request - The request containing JSON body with `proofId` and `val` (completion status).
 * @returns A JSON response confirming the update.
 * 
 * @throws 500 - If the database update operation fails.
 */
export const POST: RequestHandler = async ({ request, locals: { safeQuery } }) => {
	const { proofId, val } = await request.json();

	const { error: updateProofErr } = await safeQuery(
		`UPDATE student_proofs SET complete = $2 WHERE proof_id = $1`,
		[proofId, val]
	);
	if (updateProofErr) {
		console.error('ERROR: Failed to mark proof complete', updateProofErr);
		throw error(500, { message: 'Failed to mark proof as complete' });
	}

	return json({ message: 'Proof completed and grade updated' });
};
