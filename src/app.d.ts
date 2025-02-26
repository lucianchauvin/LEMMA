// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
        database: Pool;
        safeQuery: <T extends QueryResultRow>(
            query: string, 
            params?: any[]
        ) => Promise<SafeQueryResult<T>>;
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
