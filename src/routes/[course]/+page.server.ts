import type { PageServerLoad } from './$types';
import type { Course } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({params, locals: { safeQuery }}) => {
    const {data: result, error: err} = await safeQuery<Course>("SELECT * FROM courses WHERE course_id=$1", [params.course]);
    if(err) {
        console.error('ERROR: Database failed to query courses for specific course:', err);
        error(500, {message: 'Database failed to query courses for specific course'})
    }

    if (!result) 
        throw error(404, {message: 'No course found'}); // no course found like this
    if (result.length > 1) {
        // should never happen
        console.error(`Found multiple courses with id ${params.course}`);
        throw error(500, {message: 'Multiple courses found with this id'});
    }

    const course: Course = result[0];

    return {
        title: `${course.course_number}: ${course.course_name}`,
        course: {
            name: course.course_name,
            number: course.course_number,
            description: course.course_description,
    }};
        
}) satisfies PageServerLoad;

