import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Marks a student's proof as completed. By the database trigger also updates the grade.
 * 
 * @param {RequestEvent} event The request event containing the proof ID and completion value.
 * @returns {Response} A JSON response indicating success or throws an error if the update fails.
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
