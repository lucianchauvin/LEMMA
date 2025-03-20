import fs from 'fs';
import pg from 'pg';
import { PGUSER, PGDATABASE, PGPASSWORD, PGPORT } from '$env/static/private';

// const PGHOST = fs.readFileSync('/data/IP', 'utf-8').trim();
const PGHOST = "18.225.72.236";

/**
* Creates a Postgres client specific to this server request.
*/
export const pool = new pg.Pool({
    host: PGHOST,
    user: PGUSER,
    password: Buffer.from(PGPASSWORD, 'base64').toString('utf-8').trim().replace(/(\r\n|\n|\r)/gm, ""),
    port: parseInt(PGPORT),
    connectionTimeoutMillis: 5000, // 5 sec timeout
})
