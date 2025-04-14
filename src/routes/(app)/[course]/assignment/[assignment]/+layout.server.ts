import type { LayoutServerLoad } from './$types';
import type { Course, Assignment } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const {data: assignmentResult, error: assignmentErr} = await safeQuery<Assignment>("SELECT * FROM assignments WHERE assignment_id=$1", [params.assignment]);

    if(assignmentErr) {
        console.error('ERROR: Database failed to query assignments for specific assignment:', assignmentErr);
        error(500, {message: 'Database failed to query assignments for specific assignment'});
    }

    if (assignmentResult.length === 0) 
        throw error(404, {message: 'No assignment found'}); 
    if (assignmentResult.length > 1) {
        // should never happen
        console.error(`Found multiple assignments with id ${params.assignment}`);
        throw error(500);
    }

    return {
        assignment: assignmentResult[0],
        ...(await parent())
    }
        
}) satisfies LayoutServerLoad;
