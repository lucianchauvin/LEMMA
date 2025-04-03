import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { hash } from "@node-rs/argon2";

export const load: PageServerLoad = async ({locals: { safeQuery }}) => {
    const { data: userData, error: userErr } = await safeQuery(`
    SELECT
        users.first_name,
        users.last_name,
        users.user_id,
        users.email,
        user_roles.role_name
    FROM users
    LEFT JOIN user_roles ON users.user_id = user_roles.user_id;
    `);

    if(userErr) {
        console.error('[API] Databse query failed:', userErr);
        error(500, {message: '[API] Databse query failed'})
    }

    return {
        userData
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
            return fail(400, { message: "All fields except email are required"});
        }

        const {data: existingUser, error: checkError } = await safeQuery(
            "SELECT * FROM users WHERE username = $1", [username]
        );

        if (checkError) {
            console.error("Database query failed:", checkError);
            return fail(500, { message: "Database query failed" });
        }

        // Don't allow duplicate user
        if (existingUser.length > 0) {
            return fail(400, { message: "Username already exists"});
        }

        // Make sure usernames and passwords are appropriate length
        if (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 31 ||
            !/^[a-z0-9_-]+$/.test(username)
        ) {
            return fail(400, {
                message: "Invalid username"
            });
        }
        if (typeof password !== "string" || password.length < 6 || password.length > 255) {
            return fail(400, {
                message: "Invalid password"
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
            console.error("Database insert failed:", insertError);
            return fail(500, { message: "Failed to add user" });
        }

        return { success: true, message: "User added successfully!" };
    }
};