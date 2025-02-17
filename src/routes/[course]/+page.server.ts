import type { PageServerLoad } from './$types';
import type { Course } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({params, locals: { database }}) => {
    const result = await database.query("SELECT * FROM courses WHERE course_id=$1", [params.course]);

    if (!result.rows) throw error(404); // no course found like this
    if (result.rows.length > 1) {
        console.error(`Found multiple courses with id ${params.course}`);
        throw error(500);
    }

    const course: Course = result.rows[0];

    return {course: {
        name: course.course_name,
        number: course.course_number,
        description: course.course_description,
    }};
        
}) satisfies PageServerLoad;

