import type { PageServerLoad } from './$types';
import type { Course, Reading } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const {course} = await parent();
    const {data: readingResult, error: readingErr} = await safeQuery<Reading>("SELECT * FROM readings WHERE reading_id=$1", [params.reading]);
    if(readingErr) {
        console.error('ERROR: Database failed to query readings for specific reading:', readingErr);
        error(500, {message: 'Database failed to query readings for specific reading'});
    }

    if (readingResult.length === 0) throw error(404); // no assignment found like this
    if (readingResult.length > 1) {
        // should never happen
        console.error(`Found multiple assignments with id ${params.reading}`);
        throw error(500);
    }

    const reading: Reading = readingResult[0];

    return {
        title: "Reading Page",
        course: course,
        reading: {
            name: reading.reading_name,
        },
    };
        
}) satisfies PageServerLoad;
