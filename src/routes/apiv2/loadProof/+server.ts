import {promises as fs} from 'zlib';
import * as path from 'path';
import { json, error } from '@sveltejs/kit';
import { DATAROOT } from '$env/static/private';
import type { RequestHandler } from './$types';

const BASE_PROOF_DIR = DATAROOT + '/proofs'; // Change this to your actual proof storage directory
const BASE_PROBLEM_DIR = DATAROOT + '/problems';

export const POST: RequestHandler = async ({ request, locals: { safeQuery } }) => {
    const { proofId, problemId } = await request.json();

    try {
        const { data, error: queryError } = await safeQuery(
            'SELECT proof_filepath FROM student_proofs WHERE proof_id = $1',
            [proofId]
        );

        if (queryError || data.length === 0) {
            console.error('ERROR: Proof not found:', queryError);
            error(500, "ERROR: Proof not found");
        }

        const filePath = path.join(BASE_PROOF_DIR, data[0].proof_filepath);
        const content = await fs.readFile(filePath, 'utf-8');
        return json({ content });
    } catch (err) {
        console.error('Error loading proof, attempting to load problem file:', err);
        try {
            const problemFilePath = path.join(BASE_PROBLEM_DIR, problemId + ".lean");
            const content = await fs.readFile(problemFilePath, 'utf-8');
            return json({ content });
        } catch (problemError) {
            console.error('Error loading problem file:', problemError);
            return error(500, { message: 'Failed to load proof and problem file' });
        }
    }
};
