import type { LayoutServerLoad } from './$types';

/**
 * Global server-side hook to get session
 */
export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
    return await getSession();
};

