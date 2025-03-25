import type { QueryResult, QueryResultRow } from 'pg';
import type { SafeQueryResult } from '$lib/types';
import { type Handle } from '@sveltejs/kit';
import { pool } from "$lib/server/db";
import { lucia } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
    /**
    * Queries and returns errors without separate try-catch
    */
    event.locals.safeQuery = async <T extends QueryResultRow>(
        query: string, 
        params: any[] = []
    ): Promise<SafeQueryResult<T>> => {
      return pool.query<T>(query, params)
        .then((res: QueryResult<T>) => {
            if(res)
                return {data: res.rows, error: null}
            return {data: null, error: "No result to query"}; // shouldn't happen
        }) 
        .catch((err: Error) => {
          return {data: null, error: err.message}; 
        });
    }

    /**
    * Get session from lucia
    */
    event.locals.getSession = async () => {
        const sessionId = event.cookies.get(lucia.sessionCookieName);
        if (!sessionId) return { user: null, session: null }

        const { session, user } = await lucia.validateSession(sessionId);
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            // sveltekit types deviates from the de-facto standard
            // you can use 'as any' too
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        }

        return { user, session };
    }

    return resolve(event);
}
