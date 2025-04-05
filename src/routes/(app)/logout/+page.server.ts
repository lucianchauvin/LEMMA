import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, locals: { getSession } }) => {
    const { session } = await getSession();

    if (!session) {
        throw redirect(303, "/login");
    }
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
    });
    throw redirect(303, "/login");
};
