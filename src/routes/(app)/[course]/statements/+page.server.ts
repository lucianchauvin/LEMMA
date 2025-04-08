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
    add: async ({ request, params, locals: { safeQuery, permCheck } }) => {
        const formData = await request.formData();
        const statement_name = formData.get("statement_name") as string;
        const statement_type = formData.get("statement_type") as string;
        const statement_description = formData.get("statement_description") as string;
        const statement_category = formData.get("statement_category") as string;
        const statement_file = formData.get("statement_file") as string;

        console.log(statement_name, statement_type, statement_description, statement_category, statement_file);
        if (!statement_name) {
            return fail(400, { error: "Error: No statement name chosen!" });
        }
        if (!statement_type) {
            return fail(400, { error: "Error: No statement type chosen!" });
        }
        if (!statement_description) {
            return fail(400, { error: "Error: No statement description chosen!" });
        }
        if (!statement_category) {
            return fail(400, { error: "Error: No statement category chosen!" });
        }
        if (!statement_file.name) {
            return fail(400, { error: "Error: No statement file chosen!" });
        }
        if (!statement_file.name.endsWith(".lean")) {
            return fail(400, { error: "Error: Statement file must be a .lean file!"})
        }

        const {error: insertErr} = await safeQuery(
            "INSERT INTO statements (statement_name, statement_type, statement_description, statement_category) VALUES ($1, $2, $3, $4)",
            [statement_name, statement_type, statement_description, statement_category] 
        );

        if (insertErr) {
            console.error("ERROR: Database failed to add course statement:", insertErr);
            return fail(500, { message: "Database failed to course statement" });
        }

        return { success: true, message: "Successfully added statement!" }; 
    },

    remove: async ({ request, params, locals: { safeQuery, permCheck } }) => {
        const formData = await request.formData();
        const statement_id = formData.get("statement_id") as string;

        if(!statement_id) {
            fail(400, { message: "User ID is required" });
        }

        const {error: deleteErr} = await safeQuery(
            "DELETE FROM statements WHERE statement_id = $1",
            [statement_id]
        );

        if (deleteErr) {
            console.error("ERROR: Failed to remove statement:", deleteErr);
            fail(500, { message: "Failed to remove statement" });
        }

        return { success: true, message: "Successfully removed statement!" }; 
    }
}
