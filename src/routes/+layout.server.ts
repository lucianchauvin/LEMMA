import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const excludeChecks = ['/login', '/signup'];

/**
 * Global server-side hook to check if have session, if not redirect to login
 */
export const load: LayoutServerLoad = async ({ url, locals: { getSession } }) => {
    // Allow login and signup pages to be accessed without session
    if (excludeChecks.includes(url.pathname)) {
        return {};
    }

    const {user} = await getSession();

    // if not logged in redirect to login page
    if (!user) redirect(302, "/login");
};

