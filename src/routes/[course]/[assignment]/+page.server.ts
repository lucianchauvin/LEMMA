import type { PageServerLoad } from './$types';
import type { Assignment } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({params, locals: { database }}) => {
    const result = await database.query("SELECT * FROM assignments WHERE assignment_id=$1", [params.assignment]);

    if (result.rows.length === 0) throw error(404); // no assignment found like this
    if (result.rows.length > 1) {
        console.error(`Found multiple assignments with id ${params.assignment}`);
        throw error(500);
    }

    const assignment: Assignment = result.rows[0];

    return {
        title: "Assignment Page",
        assignment: {
            name: assignment.assignment_name,
        },
    };
        
}) satisfies PageServerLoad;

