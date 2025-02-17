import pg from 'pg';
import { type Handle } from '@sveltejs/kit';
import { PGHOST, PGUSER, PGPASSWORD, PGPORT } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
    /**
    * Creates a Postgres client specific to this server request.
    */
    event.locals.database = new pg.Pool({
        host: PGHOST,
        user: PGUSER,
        password: PGPASSWORD,
        port: parseInt(PGPORT)
    })

    const response = await resolve(event);
    return response;
}



