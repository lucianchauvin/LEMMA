import {promises as fs} from 'zlib';
import * as path from 'path';
import { json, error } from '@sveltejs/kit';
import { DATAROOT } from '$env/static/private';
import type { RequestHandler } from './$types';

const BASE_PROOF_DIR = DATAROOT + '/proofs'; // Change this to your actual proof storage directory
const BASE_PROBLEM_DIR = DATAROOT + '/problems';

export const POST:RequestHandler = async ({ request, locals: { safeQuery } }) => {
    const { proofId, content } = await request.json();

    try {
        const { data, error: queryError } = await safeQuery(
            'SELECT proof_filepath FROM student_proofs WHERE proof_id = $1',
            [proofId]
        );

        if (queryError || data.length === 0) {
            return error(404, { message: 'Proof not found' });
        }

        const filePath = path.join(BASE_PROOF_DIR, data[0].proof_filepath);
        await fs.writeFile(filePath, content, 'utf-8');
        return json({ message: 'Proof saved successfully' });
    } catch (err) {
        console.error('Error saving proof:', err);
        return error(500, { message: 'Failed to save proof' });
    }
};
