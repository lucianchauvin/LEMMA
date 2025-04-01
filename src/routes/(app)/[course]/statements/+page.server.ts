import type { PageServerLoad } from './$types';
import type { Statements } from '$lib/types';
import { error } from '@sveltejs/kit';

const colors = ["darkgreen", "maroon"];

export const load: PageServerLoad = async ({locals: { safeQuery }}) => {
    // get courses
    const {data: result_statements, error: err_statements} = await safeQuery<Statements>('SELECT * FROM statements');
    if (err_statements) {
        console.error('ERROR: Database failed to query for statements:', err_statements);
        error(500, {message: 'Database failed to query for statements'})
    }
    
    return {
        statements: result_statements
    }
}