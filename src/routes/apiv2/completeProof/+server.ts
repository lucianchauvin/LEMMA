import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { safeQuery } }) => {
	const { proofId } = await request.json();

  // set the proof as completed
	const { error: updateProofErr } = await safeQuery(
		`UPDATE student_proofs SET complete = true WHERE proof_id = $1`,
		[proofId]
	);
	if (updateProofErr) {
		console.error('ERROR: Failed to mark proof complete', updateProofErr);
		throw error(500, { message: 'Failed to mark proof as complete' });
	}

	return json({ message: 'Proof completed and grade updated' });
};
