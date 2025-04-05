import type { PageServerLoad } from './$types';
import type { Course, Assignment } from '$lib/types';
import { error } from '@sveltejs/kit';

const colors = ["darkgreen", "maroon"];

export const load: PageServerLoad = async ({parent, locals: { safeQuery, permCheck }}) => {
    const {user} = await parent();
    if(!user) {
        console.error("ERROR: No user found");
    }

    const {data: viewAllCourses, error: viewAllCoursesErr} = await permCheck('view_courses');
    if(viewAllCoursesErr) {
        console.error("ERROR: Failed to determine permission of user to view courses:", viewAllCoursesErr);
        throw error(500, { message: "Failed to determine permission of user to view courses" })
    }
    const {data: viewInactiveCourses, error: viewInactiveCoursesErr} = await permCheck('view_inactive_assigned_courses');
    if(viewInactiveCoursesErr) {
        console.error("ERROR: Failed to determine permission of user to view inactive courses:", viewAllCoursesErr);
        throw error(500, { message: "Failed to determine permission of user to view inactive courses" })
    }
    const {data: viewArchivedCourses, error: viewArchivedCoursesErr} = await permCheck('view_inactive_assigned_courses');
    if(viewInactiveCoursesErr) {
        console.error("ERROR: Failed to determine permission of user to view archived courses:", viewAllCoursesErr);
        throw error(500, { message: "Failed to determine permission of user to view archived courses" })
    }

    let courseQuery = 'SELECT * FROM courses';
    let courseQueryParams: any[] = [];
    if(!viewAllCourses.access) {
        courseQuery = 'SELECT * FROM courses JOIN user_roles ur ON ur.course_id = courses.course_id WHERE ur.user_id=$1 AND courses.status=ANY($2)';
        courseQueryParams.push(user!.id);
        courseQueryParams.push(['active']);

        if(viewInactiveCourses.access) {
            courseQueryParams[1].push('inactive');
        }
        if(viewArchivedCourses.access) {
            courseQueryParams[1].push('archived');
        }
    }

    // get courses
    const {data: result_courses, error: err_courses} = await safeQuery<Course>(courseQuery, courseQueryParams);
    if (err_courses) {
        console.error('ERROR: Database failed to query for courses:', err_courses);
        error(500, {message: 'Database failed to query for courses'})
    }

    let i = 0;
    for (let course of result_courses!) {
        course.color = colors[i % colors.length];
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
    for (let assignment of result_assignments!) {
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
        courses: result_courses,
        assignments: result_assignments
    };
}


