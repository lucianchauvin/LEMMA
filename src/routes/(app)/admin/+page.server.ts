import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({locals: { getSession }}) => {
    const {user} = await getSession();

    if(!user || !user.isAdmin)
        throw error(403, {message: 'Forbidden'});
}
