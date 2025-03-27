// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { QueryResultRow } from 'pg';
import type { Permission, UUID, SafeQueryResult, PermCheckResult } from '$lib/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
        safeQuery: <T extends QueryResultRow>(
            query: string, 
            params?: any[]
        ) => Promise<SafeQueryResult<T>>;
        getSession: () => Promise<{
            user: import("lucia").User & {isAdmin: boolean} | null; 
            session: import("lucia").Session | null
        }>;
        permCheck: (
            permission: Permission,
            courseId?: UUID,
        ) => Promise<PermCheckResult>

    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
