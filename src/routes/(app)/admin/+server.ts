import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({request, locals: { safeQuery } }) => {
    console.log('[API] received GET request at /components/data');
        console.log('[API] running database query...');

    const { data, error } = await safeQuery(`
    SELECT
        users.first_name,
        users.last_name,
        users.user_id,
        users.email,
        user_roles.role_name
    FROM users
    LEFT JOIN user_roles ON users.user_id = user_roles.user_id;
    `);

    if(error) {
        console.error('[API] Databse query failed:', error);
        error(500, {message: '[API] Databse query failed'})

    }

    console.log('Fetched users:', data);
    return json(data);
}
