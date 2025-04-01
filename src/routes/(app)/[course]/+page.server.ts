import type { PageServerLoad } from './$types';
import type { Assignment, Reading } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const {course} = await parent();
    const {data: assignmentResult, error: assignmentErr} = await safeQuery<Assignment>("SELECT * FROM assignments WHERE assignments.course_id=$1", [params.course]);
    const {data: readingResult, error: readingErr} = await safeQuery<Reading>("SELECT * FROM readings WHERE readings.course_id=$1", [params.course]);

    if(assignmentErr) {
        console.error('ERROR: Database failed to query assignments for course:', assignmentErr);
        error(500, {message: 'Database failed to query assignments for course'})
    }
    if(readingErr) {
        console.error('ERROR: Database failed to query readings for course:', readingErr);
        error(500, {message: 'Database failed to query readings for course'})
    }

    return {
        course: {
            id: course.course_id,
            name: course.course_name,
            number: course.course_number,
            description: course.course_description,
        },
        assignments: assignmentResult,
        readings: readingResult,
    };
}) satisfies PageServerLoad;

