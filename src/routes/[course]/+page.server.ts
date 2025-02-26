import type { PageServerLoad } from './$types';
import type { Course, Assignment } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({params, locals: { safeQuery }}) => {
    const {data: courseResult, error: courseErr} = await safeQuery<Course>("SELECT * FROM courses WHERE course_id=$1", [params.course]);
    const {data: assignmentResult, error: assignmentErr} = await safeQuery<Assignment>("SELECT * FROM assignments WHERE assignments.course_id=$1", [params.course]);

    if(courseErr) {
        console.error('ERROR: Database failed to query courses for specific course:', courseErr);
        error(500, {message: 'Database failed to query courses for specific course'})
    }
    if(assignmentErr) {
        console.error('ERROR: Database failed to query assignments for course:', courseErr);
        error(500, {message: 'Database failed to query assignments for course'})
    }



    if (!courseResult) 
        throw error(404, {message: 'No course found'}); // no course found like this
    if (courseResult.length > 1) {
        // should never happen
        console.error(`Found multiple courses with id ${params.course}`);
        throw error(500, {message: 'Multiple courses found with this id'});
    }

    const course: Course = courseResult[0];

    return {
        title: `${course.course_number}: ${course.course_name}`,
        course: {
            id: course.course_id,
            name: course.course_name,
            number: course.course_number,
            description: course.course_description,
        },
        assignments: assignmentResult
    };
        
}) satisfies PageServerLoad;

