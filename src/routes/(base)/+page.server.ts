import type { PageServerLoad } from './$types';
import type { Course, Assignment } from '$lib/types';
import { error } from '@sveltejs/kit';

const colors = ["darkgreen", "maroon"];

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isWithinThisWeek(date: Date): boolean {
  const now = new Date();

  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay(); 
  const diffToMonday = (day + 6) % 7; 
  startOfWeek.setDate(now.getDate() - diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return date >= startOfWeek && date < endOfWeek;
}

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
        console.error("ERROR: Failed to determine permission of user to view inactive courses:", viewInactiveCoursesErr);
        throw error(500, { message: "Failed to determine permission of user to view inactive courses" })
    }
    const {data: viewArchivedCourses, error: viewArchivedCoursesErr} = await permCheck('view_inactive_assigned_courses');
    if(viewArchivedCoursesErr) {
        console.error("ERROR: Failed to determine permission of user to view archived courses:", viewArchivedCoursesErr);
        throw error(500, { message: "Failed to determine permission of user to view archived courses" })
    }

    let courseQuery = 'SELECT * FROM courses ORDER BY course_name';
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
    const {data: result_assignments, error: err_assignments} = await safeQuery<Assignment>('SELECT a.*, c.course_number FROM assignments a JOIN courses c ON a.course_id = c.course_id JOIN user_roles ur ON a.course_id = ur.course_id WHERE $1 OR ur.user_id = $2', [user?.isAdmin, user?.id]);
    if (err_assignments) {
        console.error('ERROR: Database failed to query for assignments:', err_assignments);
        error(500, {message: 'Database failed to query for assignments'})
    }
    i = 0;
    for (let assignment of result_assignments!) {
        assignment.color = colors[i % colors.length];
        const current_date = new Date();
        if (assignment.due_date < current_date) {
            assignment.date_color = 'crimson';
        }
        else if (isSameDate(assignment.due_date, current_date)) {
            assignment.date_color = 'darkorange';
        }
        else if (isWithinThisWeek(assignment.due_date as Date)) {
            assignment.date_color = 'black';
        }
        else {
            assignment.date_color = 'white';
        }
        const temp_date = new Date(assignment.due_date);
        assignment.due_date = months[temp_date.getMonth()] + ' ' + temp_date.getDate();

        i++;
    }

    return {
        courses: result_courses,
        assignments: result_assignments
    };
}


