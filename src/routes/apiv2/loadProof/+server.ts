import {promises as fs} from 'zlib';
import * as path from 'path';
import { json, error } from '@sveltejs/kit';
import { DATAROOT } from '$env/static/private';
import type { RequestHandler } from './$types';
import { warn } from 'console';

const BASE_PROOF_DIR = DATAROOT + '/proofs'; // Change this to your actual proof storage directory
const BASE_PROBLEM_DIR = DATAROOT + '/problems';

export const POST: RequestHandler = async ({ request, params, locals: { safeQuery, permCheck } }) => {
    const { courseId, proofId, problemId } = await request.json();
    const { data: res, error: err } = await permCheck('update_assignments', courseId);

    if(err) {
        console.error('Error checking perms', err);
        throw error(500, { message: 'Error checking perms' });
    }

    if(res.access) {
        const problemFilePath = path.join(BASE_PROBLEM_DIR, problemId);
        try {
            const content = await fs.readFile(problemFilePath, 'utf-8');
            return json({ content });
        } catch (err) {
            const { data: result_statements, error: err_statements } = await safeQuery('SELECT * FROM problems where problem_id = $1', [problemId]);
            if(err_statements || result_statements!.length <= 0) throw error(500, { message: 'LOADPROOF: Problem doesnt exist in db or cannot connect to db' });

            await fs.writeFile(problemFilePath, '', 'utf-8');
            return json({ content: "" });
        }
    }

    try {
        const filePath = path.join(BASE_PROOF_DIR, proofId);
        const content = await fs.readFile(filePath, 'utf-8');
        return json({ content });
    } catch (err) {
        console.error('Error loading proof, attempting to load problem file:', err);
        try {
            const problemFilePath = path.join(BASE_PROBLEM_DIR, problemId);
            const content = await fs.readFile(problemFilePath, 'utf-8');
            return json({ content });
        } catch (problemError) {
            console.error('Error loading problem file:', problemError);
            throw error(500, { message: 'Failed to load proof and problem file' });
        }
    }
}
