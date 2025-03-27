import type { QueryResult, QueryResultRow } from 'pg';
import type { User, Permission, RolePermission, PermissionFlag, UserRole, UUID, SafeQueryResult, PermCheckResult } from '$lib/types';
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
        if(user.isAdmin) return {data: {access: true}, error: null};

        const {data: userRoleData, error: userRoleErr} = await safeQuery<{role_name: string}>(
            `SELECT DISTINCT role_name FROM user_roles WHERE user_id=$1` + ((courseId) ? ` AND course_id=$2`: ''), 
        [user.id, ...((courseId) ? [courseId]: [])]);

        if(userRoleErr) {
            return {data: {access: false}, error: `Failed to query for user roles of ${user.id}: ${userRoleErr}`}
        }
        const roles = userRoleData!.map((role) => role.role_name);

        const {data: targetsRoleData, error: flagErr} = await safeQuery<PermissionFlag>(
            `SELECT * FROM permission_flags WHERE permission_name=$1`,
        [permission]);

        if(flagErr) return {data: {access: false}, error: `Failed to query for permission flags of ${permission}: ${flagErr}`}
        if(targetsRoleData!.length == 0) return {data: {access: false}, error: `Permission ${permission} not found`}
        const targetsRole = targetsRoleData![0].targets_role;

        const {data: permFound, error: permErr} = await safeQuery<RolePermission>(
            `SELECT *
            FROM role_permissions
            WHERE role_name=ANY($1) AND permission_name=$2`,
        [roles, permission])

        if(permErr) return {data: {access: false}, error: `Failed to query for permission of the user`}
        return {data: {
            access: permFound!.length > 0, 
            ...((targetsRole) ? {target_roles: permFound!.map((perm) => perm.target_role as string)}: {})
        }, error: null};
    }

    return resolve(event);
}
