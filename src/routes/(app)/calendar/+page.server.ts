import type { PageServerLoad } from './$types';
import type { Course, Assignment } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({parent, locals: { safeQuery }}) => {
    const {user} = await parent();

    const {data: result, error: err} = await safeQuery<Course & {assignments: Assignment[]}>(`
        SELECT
            c.*,
            COALESCE(
                (
                  SELECT json_agg(DISTINCT jsonb_build_object(
                    'assignment_id', a.assignment_id,
                    'student_assignment_id', sa.student_assignment_id,
                    'assignment_name', a.assignment_name,
                    'assignment_description', a.assignment_description,
                    'active', a.active,
                    'due_date', a.due_date
                  ))
                  FROM assignments a
                  LEFT JOIN student_assignments sa 
                    ON sa.assignment_id = a.assignment_id 
                    AND sa.student_id = $2
                  WHERE a.course_id = c.course_id
                ), '[]'
            ) AS assignments
        FROM user_roles ur
        JOIN courses c ON ur.course_id = c.course_id
        LEFT JOIN assignments a ON c.course_id = a.course_id
        WHERE $1 OR ur.user_id=$2
        GROUP BY c.course_id, a.due_date
        ORDER BY c.course_id, a.due_date`,
    [user?.isAdmin, user!.id]);

    if(err) {
        console.error('ERROR: Database failed to query for courses for calendar:', err);
        error(500, {message: 'Database failed to query for courses for calendar'})
    }

    return {
        courses: result
    };
}
