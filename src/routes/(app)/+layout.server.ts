import type { LayoutServerLoad } from './$types';

/**
 * Global server-side hook to get session
 */
export const load: LayoutServerLoad = async ({ parent }) => {
    return await parent();
};

