import {promises as fs} from 'zlib';
import * as path from 'path';
import { json, error } from '@sveltejs/kit';
import { BASE_PROOF_DIR, BASE_PROBLEM_DIR } from '$lib/constants';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, params, locals: { safeQuery, permCheck } }) => {
    const { courseId, proofId, problemId, content } = await request.json();
    const { data: res, error: err } = await permCheck('update_assignments', courseId);

    if(err) {
        console.error('SAVEPROOF: Error checking perms', err);
        throw error(500, { message: 'SAVEPROOF: Error checking perms' });
    }

    if(res.access) {
        const problemFilePath = path.join(BASE_PROBLEM_DIR, problemId);
        try {
            const { data: result_statements, error: err_statements } = await safeQuery('SELECT * FROM problems where problem_id = $1', [problemId]);
            if(err_statements || result_statements!.length <= 0) throw error(500, { message: 'SAVEPROOF: Problem doesnt exist in db or cannot connect to db' });
            await fs.writeFile(problemFilePath, content, 'utf-8');
            return json({ message: 'Proof saved successfully' });
        } catch (err) {
            throw error(500, { message: 'SAVEPROOF: Failed to save problem file as instructor' });
        }
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
