import type { PageServerLoad, Actions } from './$types';
import type { Statements } from '$lib/types';
import { error, fail } from '@sveltejs/kit';
import { BASE_STATEMENT_DIR } from '$lib/constants';
import { writeFile, unlink } from 'zlib';
import * as path from 'node:path';

export const load: PageServerLoad = async ({parent, locals: { safeQuery }}) => {
    const {permissions} = await parent();

    if(!permissions.view_course_statements.access) {
        throw error(403, { message: "Forbidden" });
    }

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
    /**
     * Adds a new statement and uploads a file to the server.
     * 
     * Validates the provided statement data and uploads the associated file to the server. A new record is added to the database for the statement.
     * 
     * @param statement_name {string} - The name of the statement to be added.
     * @param statement_type {string} - The type of the statement to be added.
     * @param statement_description {string} - The description of the statement to be added.
     * @param statement_category {string} - The category of the statement to be added.
     * @param statement_file {string} - The file content of the statement to be uploaded.
     * 
     * @returns A success message if the statement is added and file is uploaded successfully, or a fail response with an error message.
     * 
     * @throws 400 - If any required fields (statement_name, statement_type, statement_description, statement_category, or statement_file) are missing.
     * @throws 500 - If there is a database insertion error or file upload error.
     */
    add: async ({ request, params, locals: { safeQuery, permCheck } }) => {
        const formData = await request.formData();
        const statement_name = formData.get("statement_name") as string;
        const statement_type = formData.get("statement_type") as string;
        const statement_description = formData.get("statement_description") as string;
        const statement_category = formData.get("statement_category") as string;
        const statement_file = formData.get("statement_file") as string;

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
        if (!statement_file) {
            return fail(400, { error: "Error: No statement file typed out!" });
        }

        const {data: statement_id, error: insertErr} = await safeQuery(
            "INSERT INTO statements (statement_name, statement_type, statement_description, statement_category) VALUES ($1, $2, $3, $4) RETURNING statement_id",
            [statement_name, statement_type, statement_description, statement_category] 
        );

        if (insertErr) {
            console.error("ERROR: Database failed to add course statement:", insertErr);
            return fail(500, { message: "Database failed to course statement" });
        }
        
        const statement_file_path = path.join(BASE_STATEMENT_DIR, statement_id![0].statement_id);
        writeFile(statement_file_path, statement_file, function (err) {
            if (err) {
                console.error("ERROR: Failed to upload file:", err);
                return fail(500, { message: "Failed to upload file" });
            }
        });

        return { success: true, message: "Successfully added statement!" }; 
    },

    /**
     * Removes a statement from the database and deletes the associated file.
     * 
     * Validates the provided statement ID, deletes the associated record from the database, and removes the file from the server.
     * 
     * @param statement_id {string} - The ID of the statement to be removed.
     * 
     * @returns A success message if the statement is removed and the file is deleted successfully, or a fail response with an error message.
     * 
     * @throws 400 - If the statement ID is missing.
     * @throws 500 - If there is a database deletion error or file removal error.
     */
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

        const statement_file_path = path.join(BASE_STATEMENT_DIR, statement_id);
        unlink(statement_file_path, function (err) {
            if (err) {
                console.error("ERROR: Failed to remove file:", err);
                return fail(500, { message: "Failed to remove file" });
            }
        });

        return { success: true, message: "Successfully removed statement!" }; 
    }
}
