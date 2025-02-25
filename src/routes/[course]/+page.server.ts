import type { PageServerLoad } from './$types';
import type { Course } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({params, locals: { database }}) => {

    let result;
    try {
        result = await database.query("SELECT * FROM courses WHERE course_id=$1", [params.course]);
    } catch (err) {
        console.error('Database failed to query for courses for specific course:', err);
        error(500, {message: 'Database failed to query for courses for specific course'})
    }

    if(!result) {
        console.error('Database failed to query for courses for specific course');
        error(500, {message: 'Database failed to query for courses for specific course'})
    }

    if (!result.rows) 
        throw error(404, {message: 'No course found'}); // no course found like this
    if (result.rows.length > 1) {
        // should never happen
        console.error(`Found multiple courses with id ${params.course}`);
        throw error(500, {message: 'Multiple courses found with this id'});
    }

    const course: Course = result.rows[0];

    return {
        title: `${course.course_number}: ${course.course_name}`,
        course: {
            name: course.course_name,
            number: course.course_number,
            description: course.course_description,
    }};
        
}) satisfies PageServerLoad;

