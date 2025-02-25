import pg from 'pg';
import fs from 'fs';
import { type Handle } from '@sveltejs/kit';
import { PGUSER, PGDATABASE, PGPASSWORD, PGPORT } from '$env/static/private';

const PGHOST = fs.readFileSync('IP', 'utf-8').trim();

export const handle: Handle = async ({ event, resolve }) => {
    /**
    * Creates a Postgres client specific to this server request.
    */
    event.locals.database = new pg.Pool({
        host: PGHOST,
        user: PGUSER,
        password: Buffer.from(PGPASSWORD, 'base64').toString('utf-8').trim().replace(/(\r\n|\n|\r)/gm, ""),
        port: parseInt(PGPORT)
    })

    const response = await resolve(event);
    return response;
}
