import {promises as fs} from 'zlib';
import * as path from 'path';
import { json, error } from '@sveltejs/kit';
import { BASE_PROOF_DIR, BASE_PROBLEM_DIR } from '$lib/constants';
import type { RequestHandler } from './$types';

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
