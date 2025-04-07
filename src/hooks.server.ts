import type { QueryResult, QueryResultRow } from 'pg';
import type { Permission, UUID, SafeQueryResult, PermCheckResult } from '$lib/types';
import { type Handle } from '@sveltejs/kit';
import { pool } from "$lib/server/db";
import { lucia } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
    /**
    * Queries and returns errors without separate try-catch
    */
    const safeQuery = async <T extends QueryResultRow>(
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
    event.locals.safeQuery = safeQuery;

    /**
    * Get session from lucia
    */
    const getSession = async () => {
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

        // populate user with whether it's an admin user
        if(user) {
            const {data: isAdmin, error: isAdminErr} = await safeQuery<{is_super_admin: boolean}>('SELECT is_super_admin FROM users WHERE user_id=$1', [user.id]);
            if(isAdminErr) {
                console.error(`ERROR: Failed to query users for whether ${user.id} is admin:`, isAdminErr);
                return { user: null, session: null };
            }

            return {
                user: {...user, isAdmin: isAdmin![0].is_super_admin},
                session
            }
        }

        return { user, session };
    }
    event.locals.getSession = getSession;

    event.locals.permCheck = async (
        permission: Permission,
        courseId?: UUID,
    ): Promise<PermCheckResult> =>  {
        const {user} = await getSession()
        
        if(!user) return {data: {access: false}, error: null};

        const {data: permData, error: permErr} = await safeQuery<{has_permission: boolean}>(
            `SELECT * FROM has_permission($1, $2, $3)`, 
        [user.id, permission, courseId]);

        if(permErr) {
            console.error(`ERROR: Failed to get permission ${permission} from database:`, permErr);
            return {data: {access: false}, error: `Failed to get permission ${permission} from database`};
        }
        if(permData!.length == 0) {
            console.error(`ERROR: Checked permission return nothing`);
            return {data: {access: false}, error: `Checked permission return nothing`};
        }

        if(permData![0].has_permission) {
            const {data: roleData, error: roleErr} = await safeQuery<{target_role: string}>(
                `SELECT * FROM get_target_roles_for_permission($1, $2, $3)`, 
            [user.id, permission, courseId]);
            
            if(roleErr) {
                console.error(`ERROR: Failed to get target roles for permission ${permission} from database:`, roleErr);
                return {data: {access: false}, error: `Failed to get target roles for permission ${permission} from database`};
            }

            return {data: {
                access: true, 
                target_roles: roleData!.map(r => r.target_role)
            }, error: null}
        }

        return {data: {access: false}, error: null};
    }

    return resolve(event);
}
