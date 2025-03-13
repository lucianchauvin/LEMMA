import type { PageServerLoad } from "./$types";
import type { User } from '$lib/types';
import {error} from '@sveltejs/kit';

export const load = (async ({locals: { safeQuery }}) => {
    const {data: userResult, error: userErr}
    = await safeQuery<User> ("SELECT username, password FROM users");

    if (userErr)
    {
        console.error('ERROR: Database failed to query for users');
        error(500, {message: 'Database failed to query for users'});
    }

    return {
        users: userResult,
    };
}) satisfies PageServerLoad;