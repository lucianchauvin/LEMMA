// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
        safeQuery: <T extends QueryResultRow>(
            query: string, 
            params?: any[]
        ) => Promise<SafeQueryResult<T>>;
        getSession: () => Promise<{
            user: import("lucia").User | null; 
            session: import("lucia").Session | null
        }>
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
