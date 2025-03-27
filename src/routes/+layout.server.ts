import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const excludeChecks = ['/login', '/logout', '/signup'];

export const load: LayoutServerLoad = async ({ url, locals: { getSession }}) => {
    const {session} = await getSession();

    if(excludeChecks.includes(url.pathname))
        return;

    if(!session)
        throw redirect(302, '/login');
}
