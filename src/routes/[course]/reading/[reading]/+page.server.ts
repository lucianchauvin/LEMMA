import type { PageServerLoad } from './$types';
import type { Course, Assignment, StudentAssignment } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const {course, reading} = await parent();

    return {
        title: "Reading Page",
        course: course,
        assignment: {
            name: reading.reading_name,
        },
    };
        
}) satisfies PageServerLoad;
