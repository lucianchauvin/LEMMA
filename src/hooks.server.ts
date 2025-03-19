import pg from 'pg';
import fs from 'fs';
import type { QueryResult, QueryResultRow } from 'pg';
import type { SafeQueryResult } from '$lib/types';
import { type Handle } from '@sveltejs/kit';
import { PGUSER, PGDATABASE, PGPASSWORD, PGPORT } from '$env/static/private';

// const PGHOST = fs.readFileSync('/data/IP', 'utf-8').trim();
const PGHOST = "18.225.72.236";

export const handle: Handle = async ({ event, resolve }) => {
    /**
    * Creates a Postgres client specific to this server request.
    */
    event.locals.database = new pg.Pool({
        host: PGHOST,
        user: PGUSER,
        password: Buffer.from(PGPASSWORD, 'base64').toString('utf-8').trim().replace(/(\r\n|\n|\r)/gm, ""),
        port: parseInt(PGPORT),
        connectionTimeoutMillis: 5000, // 5 sec timeout
    })

    /**
    * Queries and returns errors without separate try-catch
    */
    event.locals.safeQuery = async <T extends QueryResultRow>(
        query: string, 
        params: any[] = []
    ): Promise<SafeQueryResult<T>> => {
      return event.locals.database.query<T>(query, params)
        .then((res: QueryResult<T>) => {
            if(res)
                return {data: res.rows, error: null}
            return {data: null, error: "No result to query"}; // shouldn't happen
        }) 
        .catch((err: Error) => {
          return {data: null, error: err.message}; 
        });
    }

    const response = await resolve(event);
    return response;
}
