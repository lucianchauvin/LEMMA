import type { LayoutServerLoad } from './$types';
import type { Course } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({params, locals: { safeQuery }}) => {
    const {data: courseResult, error: courseErr} = await safeQuery<Course>("SELECT * FROM courses WHERE course_id=$1", [params.course]);

    if(courseErr) {
        console.error('ERROR: Database failed to query courses for specific course:', courseErr);
        error(500, {message: 'Database failed to query courses for specific course'})
    }

    if (!courseResult) 
        throw error(404, {message: 'No course found'}); // no course found like this
    if (courseResult.length > 1) {
        // should never happen
        console.error(`Found multiple courses with id ${params.course}`);
        throw error(500, {message: 'Multiple courses found with this id'});
    }

    return {
        course: courseResult[0],
    };
}) satisfies LayoutServerLoad;
