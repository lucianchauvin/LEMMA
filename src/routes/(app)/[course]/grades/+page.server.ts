import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({parent, locals: { safeQuery }}) => {
    const {user} = await parent();
    const {data: result, error: err} = await safeQuery(`
    SELECT
        assignments.assignment_id,
        assignments.assignment_name,
        assignments.course_id,
        student_assignments.student_assignment_id,
        student_assignments.assignment_id,
        student_assignments.student_id,
        student_assignments.grade,
        users.username,
        courses.course_id,
        courses.course_name
    FROM assignments
    LEFT JOIN student_assignments ON assignments.assignment_id = student_assignments.assignment_id
    LEFT JOIN users on student_assignments.student_id = users.user_id
    LEFT JOIN courses on assignments.course_id = courses.course_id
    WHERE student_assignments.edit=false AND users.user_id=$1
    ORDER BY assignments.course_id, assignments.assignment_id;
    `, [user.id]);
    if(err) {
        console.error('ERROR: Database failed to query for student assignments for grades:', err);
        throw error(500, {message: 'Database failed to query for student assignments for grades'});
    }

    return {
        assignments: result
    };
}
