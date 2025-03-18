
import type { PageServerLoad } from './$types';
import type { Course } from '$lib/types';
import { error } from '@sveltejs/kit';

// const colors = ["darkgreen", "maroon"];

export const load: PageServerLoad = async ({locals: { safeQuery }}) => {
    const {data: result, error: err} = await safeQuery<Assignment>(`
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
    WHERE student_assignments.edit=false AND users.username=$1
    ORDER BY assignments.course_id, assignments.assignment_id;
    `, ['marfung']);
    if(err) {
        console.error('ERROR: Database failed to query for assignments');
        error(500, {message: 'Database failed to query for assignments'})
    }
    console.log(result);

    // let i = 0;
    // for(let course of result){
    //     course.color = colors[i];
    //     i++;
    // }

    return {
        title: "Grades Page",
        assignments: result
    };
}
