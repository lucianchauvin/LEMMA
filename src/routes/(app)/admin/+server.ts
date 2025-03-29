import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({request, locals: { safeQuery } }) => {
    console.log('[API] received GET request at /components/data');
        console.log('[API] running database query...');

    const { data, error } = await safeQuery(`
    SELECT
        users.first_name,
        users.last_name,
        users.user_id,
        users.email,
        user_roles.role_name
    FROM users
    LEFT JOIN user_roles ON users.user_id = user_roles.user_id;
    `);

    if(error) {
        console.error('[API] Databse query failed:', error);
        error(500, {message: '[API] Databse query failed'})

    }

    console.log('Fetched users:', data);
    return json(data);
}

import type { PageServerLoad, Actions } from "../$types";

export const actions: Actions = {
    add: async ({ request, params, locals: { safeQuery } }) => {
        const formData = await request.formData();
        const firstName = formData.get("first_name") as string;
        const lastName = formData.get("last_name") as string;

        const {data: user, error: userErr} = await safeQuery("SELECT * FROM users WHERE LOWER(first_name) = LOWER($1) AND LOWER(last_name) = LOWER($2)", [firstName, lastName]);

        if (userErr || !user || user.length === 0)
        {
            console.error("ERROR: Student not found or database failed to query:", userErr);
            return fail(500, { message: "Student not found or database failed to query" });
        }

        //Check if user is already in course
        const {data: userRole, error: roleErr} = await safeQuery(
            "SELECT * FROM user_roles WHERE user_id = $1 AND course_id = $2", 
            [user.user_id, params.course]
        );

        if (roleErr) {
            console.error("ERROR: Unable to check whether a student is added:", roleErr);
            fail(500, { message: "Unable to check if student is added" });
        }

        if (userRole.length > 0) {
            fail(400, { message: "Student is already in the course" });
        }

        const {error: insertErr} = await safeQuery(
            "INSERT INTO user_roles (user_id, course_id, role_name) VALUES ($1, $2, 'student')",
            [user[0].user_id, params.course] 

        );

        if (insertErr) {
            console.error("ERROR: Database failed to add student:", insertErr);
            fail(500, { message: "Database failed to add student" });
        }

        return { success: true }; 
    },

    remove: async ({ request, params, locals: { safeQuery } }) => {
        const formData = await request.formData();
        const user_id = formData.get("user_id") as string;

        if(!user_id) {
            fail(400, { message: "User ID is required" });
        }

        const {error: deleteErr} = await safeQuery(
            "DELETE FROM user_roles WHERE user_id = $1 AND course_id = $2",
            [user_id, params.course]
        );

        if (deleteErr) {
            console.error("ERROR: Failed to remove student:", deleteErr);
            fail(500, { message: "Failed to remove student" });
        }

        return { success: true }; 
    }
};