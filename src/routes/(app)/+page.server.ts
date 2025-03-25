import type { PageServerLoad } from './$types';
import type { Course, Assignment } from '$lib/types';
import { error } from '@sveltejs/kit';

const colors = ["darkgreen", "maroon"];

export const load: PageServerLoad = async ({locals: { safeQuery }}) => {
    // get courses
    const {data: result_courses, error: err_courses} = await safeQuery<Course>('SELECT * FROM courses');
    if (err_courses) {
        console.error('ERROR: Database failed to query for courses:', err_courses);
        error(500, {message: 'Database failed to query for courses'})
    }
    let i = 0;
    for (let course of result_courses) {
        course.color = colors[i];
        i++;
    }

    // get assignments
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const {data: result_assignments, error: err_assignments} = await safeQuery<Assignment>('SELECT * FROM assignments');
    if (err_assignments) {
        console.error('ERROR: Database failed to query for assignments:', err_assignments);
        error(500, {message: 'Database failed to query for assignments'})
    }
    i = 0;
    for (let assignment of result_assignments) {
        if (assignment.course_id === '6baedc0e-72e5-4674-9ab8-e96db38446eb') {
            assignment.course_number = 'CSCE222';
            assignment.color = 'darkgreen';
        }
        else {
            assignment.course_number = 'MATH415';
            assignment.color = 'maroon';
        }
        const current_date = new Date();
        if (assignment.due_date < current_date) {
            assignment.date_color = 'crimson';
        }
        else if (assignment.due_date === current_date) {
            assignment.date_color = 'darkorange';
        }
        else if (assignment.due_date < current_date.getDate() + 7) {
            assignment.date_color = 'black';
        }
        else {
            assignment.date_color = 'white';
        }
        const temp_date = new Date(assignment.due_date);
        assignment.due_date = months[temp_date.getMonth()] + ' ' + temp_date.getDate();
    }

    return {
        title: "Home Page",
        courses: result_courses,
        assignments: result_assignments
    };
}


