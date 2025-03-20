import { lucia } from "$lib/server/auth";
import { error, fail, redirect } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";

import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, cookies, locals: { safeQuery } }) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");
        const email = formData.get("email");

        // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
        // keep in mind some database (e.g. mysql) are case insensitive
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

        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        // Insert user to database
        const {data: userInsert, error: userErr} = await safeQuery(
            `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING user_id`, 
        [username, passwordHash, email]);

        console.log(userInsert, userErr);

        if(userErr === 'duplicate key value violates unique constraint "users_username_key"') {
            return fail(400, {
                message: "Username already used"
            })
        }

        // TODO: handle error when there's duplicate usernames
        if(userErr) {
            console.error("ERROR: Database failed to insert new user:", userErr)
            error(500, {message: 'Database failed to insert new user'})
        }

        try {
            const userId = userInsert[0]["user_id"];

            console.log(userId)

            const session = await lucia.createSession(userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        } catch (err) {
            const { error: userDeleteErr } = await safeQuery(
                `DELETE FROM users WHERE username=$1`, 
            [username]);

            if(userDeleteErr) {
                console.error("ERROR: Database failed to delete user in clean up:", userDeleteErr);
            }

            console.error(err as Error);
            error(500, {message: 'Failed to create a session'});
        }

        redirect(302, "/");
    }
};
