import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

  // set the proof as completed
export const POST: RequestHandler = async ({ request, locals: { safeQuery, permCheck } }) => {
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
