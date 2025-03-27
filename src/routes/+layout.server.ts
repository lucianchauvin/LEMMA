import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const excludeChecks = ['/login', '/logout', '/signup'];

export const load: LayoutServerLoad = async ({ url, locals: { getSession }}) => {
    const {user, session} = await getSession();

    if(!excludeChecks.includes(url.pathname) && !session)
        throw redirect(302, '/login');

    return {user, session};
}
