import { lucia } from "$lib/server/auth";
import { error, fail, redirect } from "@sveltejs/kit";
import { verify } from "@node-rs/argon2";

import type { User } from "$lib/types"
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const {session} = await getSession();

	/* User is already logged in. */
	if (session) redirect(303, '/');
};

export const actions: Actions = {
    /**
     * Handles the user login process.
     * 
     * Validates the username and password, checks for the existence of the user in the database,
     * and compares the provided password with the stored password hash. If the credentials are correct,
     * it creates a new session and sets a session cookie.
     * 
     * @param request - The request containing form data: username, password.
     * @param cookies - The cookies object for setting the session cookie.
     * 
     * @returns A fail response with an error message if the credentials are invalid or if there are any errors during the process.
     * 
     * @throws 400 - If the username or password is invalid.
     * @throws 500 - If there is an error querying the user in the database or during password verification.
     */
    default: async ({ request, cookies, locals: { safeQuery } }) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");

        if (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 31 ||
            !/^[a-z0-9_-]+$/.test(username)
        ) {
            return fail(400, {
                message: "Invalid Username: Username must be between 3 and 31 characters long and contain only lowercase letters, numbers, underscores, and dashes."
            });
        }
        if (typeof password !== "string") {
            return fail(400, {
                message: "Invalid Password: Password must be a string"
            });
        }
        
        if (password.length < 6) {
            return fail(400, {
                message: "Invalid Password: Password must be at least 6 characters long"
            });
        }
        
        if (password.length > 255) {
            return fail(400, {
                message: "Invalid Password: Password must not exceed 255 characters"
            });
        }

        const {data: userData, error: userErr} = await safeQuery<User>(`SELECT * FROM users WHERE username=$1`, [username]);
        let existingUser = userData ? userData[0]: null;

        if (userErr) {
            console.error("ERROR: Database failed to query user:", userErr);
            error(500, {message: "Database failed to query user"});
        }

        if (!existingUser) {
            // NOTE:
            // Returning immediately allows malicious actors to figure out valid usernames from response times,
            // allowing them to only focus on guessing passwords in brute-force attacks.
            // As a preventive measure, you may want to hash passwords even for invalid usernames.
            // However, valid usernames can be already be revealed with the signup page among other methods.
            // It will also be much more resource intensive.
            // Since protecting against this is non-trivial,
            // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
            // If usernames are public, you may outright tell the user that the username is invalid.
            return fail(400, {
                message: "Incorrect username or password"
            });
        }

        const validPassword = await verify(existingUser.password, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        if (!validPassword) {
            return fail(400, {
                message: "Incorrect username or password"
            });
        }

        const session = await lucia.createSession(existingUser.user_id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        redirect(302, "/");
    }
};
