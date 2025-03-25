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
                message: "Invalid username"
            });
        }
        if (typeof password !== "string" || password.length < 6 || password.length > 255) {
            return fail(400, {
                message: "Invalid password"
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
