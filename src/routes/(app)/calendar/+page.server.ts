import type { PageServerLoad } from './$types';
import type { Course, Assignment } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({locals: { safeQuery }}) => {
    const {data: result, error: err} = await safeQuery<Course & {assignments: Assignment[]}>(`
        SELECT
            c.*,
            COALESCE(jsonb_agg(to_jsonb(a)) FILTER (WHERE a.assignment_id IS NOT NULL), '[]'::jsonb) AS assignments
        FROM courses c
        LEFT JOIN assignments a ON c.course_id = a.course_id
        GROUP BY c.course_id, a.due_date
        ORDER BY c.course_id, a.due_date;
    `);

    if(err) {
        console.error('ERROR: Database failed to query for courses for calendar:', err);
        error(500, {message: 'Database failed to query for courses for calendar'})
    }

    return {
        courses: result
    };
}
