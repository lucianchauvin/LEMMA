import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// set the proof as completed
export const POST: RequestHandler = async ({ request, locals: { safeQuery, permCheck } }) => {
	const { proofId, remove } = await request.json();

	// Step 1: Fetch student_proof to get student_assignment_id and problem_id
	const { data: proofs, error: proofErr } = await safeQuery(
		`SELECT proof_id, student_assignment_id, problem_id FROM student_proofs WHERE proof_id = $1`,
		[proofId]
	);
	if (proofErr || proofs.length === 0) {
		console.error('COMPLETEPROOF: Failed to find student_proof', proofErr);
		throw error(404, { message: 'Proof not found' });
	}

	const { student_assignment_id, problem_id } = proofs[0];

	// Step 2: Find assignment_id via problem_id
	const { data: problems, error: problemErr } = await safeQuery(
		`SELECT assignment_id FROM problems WHERE problem_id = $1`,
		[problem_id]
	);
	if (problemErr || problems.length === 0) {
		console.error('COMPLETEPROOF: Failed to find problem', problemErr);
		throw error(500, { message: 'Internal error fetching problem data' });
	}

	const { assignment_id } = problems[0];

	// Step 3: Count number of problems in the assignment
	const { data: countRes, error: countErr } = await safeQuery(
		`SELECT COUNT(*) FROM problems WHERE assignment_id = $1`,
		[assignment_id]
	);
	if (countErr || countRes.length === 0) {
		console.error('COMPLETEPROOF: Failed to count problems', countErr);
		throw error(500, { message: 'Internal error counting problems' });
	}

	const numProblems = parseInt(countRes[0].count, 10);
	if (numProblems === 0) throw error(500, { message: 'Assignment has no problems' });

	// Step 4: Update proof to complete
	const { error: updateProofErr } = await safeQuery(
		`UPDATE student_proofs SET complete = ${remove ? "true" : "false"} WHERE proof_id = $1`,
		[proofId]
	);
	if (updateProofErr) {
		console.error('ERROR: Failed to mark proof complete', updateProofErr);
		throw error(500, { message: 'Failed to mark proof as complete' });
	}

	// Step 5: Increment grade
	const { error: gradeUpdateErr } = await safeQuery(
		`UPDATE student_assignments SET grade = grade ${remove ? "-" : "+"} $1 WHERE student_assignment_id = $2`,
		[100 / numProblems, student_assignment_id]
	);
	if (gradeUpdateErr) {
		console.error('COMPLETEPROOF: Failed to update grade', gradeUpdateErr);
		throw error(500, { message: 'Failed to update grade' });
	}

	return json({ message: 'Proof completed and grade updated' });
};
