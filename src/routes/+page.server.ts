import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals: { database }}) => {
    const result = await database.query("SELECT * FROM courses");

    return {courses: result.rows};
}
