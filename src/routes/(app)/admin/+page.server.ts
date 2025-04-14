import type { PageServerLoad, Actions } from "./$types";
import { isUUID } from '$lib/util';
import { fail, error } from "@sveltejs/kit";
import { hash } from "@node-rs/argon2";

export const load: PageServerLoad = async ({locals: { getSession, safeQuery }}) => {
    const {user} = await getSession();

    if(!user || !user.isAdmin)
        throw error(403, {message: 'Forbidden'});

    const { data: userData, error: userErr } = await safeQuery(`
    SELECT
        users.first_name,
        users.last_name,
        users.user_id,
        users.email,
        STRING_AGG(user_roles.role_name, ', ') AS roles
    FROM users
    LEFT JOIN user_roles ON users.user_id = user_roles.user_id
    WHERE is_super_admin = 'f'
    GROUP BY users.first_name, users.last_name, users.user_id, users.email;
    `);

    if(userErr) {
        console.error('Database failed to get users data for admin page:', userErr);
        error(500, {message: 'Database failed to get users data for admin page'})
    }

    const { data: courseData, error: courseErr } = await safeQuery(`SELECT * FROM courses`);

    if (courseErr) {
        console.error('Database failed to get courses data for admin page:', courseErr);
        error(500, {message: 'Database failed to get courses data for admin page'})
    }

    return {
        userData,
        courseData
    }
}

export const actions: Actions = {
    add: async ({ request, locals: { safeQuery } }) => {
        const formData = await request.formData();
        
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const first_name = formData.get("first_name") as string;
        const last_name = formData.get("last_name") as string;
        const email = formData.get("email") as string;

        if (!username || !password || !first_name || !last_name) {
            return fail(400, { user_message: "All fields except email are required"});
        }

        const {data: existingUser, error: checkError } = await safeQuery(
            "SELECT * FROM users WHERE username = $1", [username]
        );

        if (checkError) {
            console.error("Database failed to determine if username already exists on admin page:", checkError);
            return fail(500, { user_message: "Database failed to determine if username already exists on admin page" });
        }

        // Don't allow duplicate user
        if (existingUser!.length > 0) {
            return fail(400, { user_message: "Username already exists"});
        }

        // Make sure usernames and passwords are appropriate length
        if (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 31 ||
            !/^[a-z0-9_-]+$/.test(username)
        ) {
            return fail(400, {
                user_message: "Invalid username"
            });
        }
        if (typeof password !== "string" || password.length < 6 || password.length > 255) {
            return fail(400, {
                user_message: "Invalid password"
            });
        }

        // Hash passwords
        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        const { error: insertError } = await safeQuery(
            "INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)",
            [username, passwordHash, first_name, last_name, email]
        );

        if (insertError) {
            console.error("ERROR: Database failed to insert user on admin page:", insertError);
            return fail(500, { user_message: "Database failed to insert user" });
        }

        return { success: true, user_message: "User added successfully!" };
    },

    remove: async ({ request, locals: { safeQuery } }) => {

        const formData = await request.formData();
        const user_id = formData.get("user_id") as string;

        if(!user_id || !isUUID(user_id)) {
            fail(400, { user_message: "User ID is required" });
        }

        const {error: deleteErr} = await safeQuery(
            "DELETE FROM users WHERE user_id = $1",
            [user_id]
        );

        if (deleteErr) {
            console.error("ERROR: Failed to remove user:", deleteErr);
            fail(500, { user_message: "Failed to remove user" });
        }

        return { success: true, user_message: "User removed successfully!"}; 
    },

    add_course: async ({ request, locals: { safeQuery } }) => {
        const formData = await request.formData();
        
        const course_number = formData.get("course_number") as string;
        const course_name = formData.get("course_name") as string;
        const status = formData.get("status") as string;
        const start_date = formData.get("start_date") as string;
        const end_date = formData.get("end_date") as string;

        if (!course_number || !course_name || !status || !start_date || !end_date) {
            return fail(400, { course_message: "All fields are required"});
        }
        const { error: insertError } = await safeQuery(
            "INSERT INTO courses (course_number, course_name, status, start_date, end_date) VALUES ($1, $2, $3, $4, $5)",
            [course_number, course_name, status, start_date, end_date]
        );

        if (insertError) {
            console.error("ERROR: Database failed to insert course:", insertError);
            return fail(500, { course_message: "Database failed to insert course" });
        }

        return { success: true, course_message: "Course added successfully!" };
    },

    remove_course: async ({ request, locals: { safeQuery } }) => {

        const formData = await request.formData();
        const course_id = formData.get("course_id") as string;

        if(!course_id || !isUUID(course_id)) {
            fail(400, { course_message: "Course ID is required" });
        }

        const {error: deleteErr} = await safeQuery(
            "DELETE FROM courses WHERE course_id = $1",
            [course_id]
        );

        if (deleteErr) {
            console.error("ERROR: Failed to remove course:", deleteErr);
            fail(500, { course_message: "Failed to remove course" });
        }

        return { success: true, course_message: "Course removed successfully!"}; 
    }
};
