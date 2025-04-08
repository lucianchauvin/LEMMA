import type { PageServerLoad, Actions } from './$types';
import type { Statements } from '$lib/types';
import { error, fail } from '@sveltejs/kit';

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

export const actions: Actions = {
    remove: async ({ request, params, locals: { safeQuery, permCheck } }) => {
        const formData = await request.formData();
        const statement_id = formData.get("statement_id") as string;

        if(!statement_id) {
            fail(400, { message: "User ID is required" });
        }
        else {
            console.error(statement_id);
        }

        const {error: deleteErr} = await safeQuery(
            "DELETE FROM course_statements WHERE statement_id = $1",
            [statement_id]
        );

        if (deleteErr) {
            console.error("ERROR: Failed to remove statement:", deleteErr);
            fail(500, { message: "Failed to remove statement" });
        }

        return { success: true }; 
    }
}
