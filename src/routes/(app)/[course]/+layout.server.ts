import type { LayoutServerLoad } from './$types';
import type { Course } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery, permCheck }}) => {
    const {user, session} = await parent();

    const {data: courseResult, error: courseErr} = await safeQuery<Course>("SELECT * FROM courses WHERE course_id=$1", [params.course]);
    if(courseErr) {
        console.error('ERROR: Database failed to query courses for specific course:', courseErr);
        throw error(500, {message: 'Database failed to query courses for specific course'})
    }

    if (!courseResult) 
        throw error(404, {message: 'No course found'}); // no course found like this
    if (courseResult.length > 1) {
        // should never happen
        console.error(`Found multiple courses with id ${params.course}`);
        throw error(500, {message: 'Multiple courses found with this id'});
    }

    const course = courseResult[0];

    let student = false;
    if(user) {
        const {data: courseRole, error: roleErr} = await safeQuery(`SELECT * FROM user_roles WHERE user_id=$1 AND course_id=$2`, [user.id, course.course_id]);

        if(roleErr) {
            console.log(`ERROR: Database failed to query user roles for ${user.id} and ${course.course_id} pair:`, roleErr);
            throw error(500, {message: 'Database failed to query user roles'});
        }

        student = courseRole![0].role_name === 'student';
    }

    const {data: viewCourseGrades, error: viewCourseGradesErr} = await permCheck('view_course_grades', course.course_id);
    const {data: viewCourseUsers, error: viewCourseUsersErr} = await permCheck('view_course_users', course.course_id);
    const {data: viewCourseStatements, error: viewCourseStatementsErr} = await permCheck('view_assigned_course_statements', course.course_id);

    if(viewCourseGradesErr) {
        console.error('ERROR: Failed to determine permission for viewing course grades:', viewCourseGradesErr);
        error(500, {message: 'Failed to determine permission for viewing course grades'})
    }
    if(viewCourseUsersErr) {
        console.error('ERROR: Failed to determine permission for viewing course users:', viewCourseUsersErr);
        error(500, {message: 'Failed to determine permission for viewing course users'})
    }
    if(viewCourseStatementsErr) {
        console.error('ERROR: Failed to determine permission for viewing course statements:', viewCourseStatementsErr);
        error(500, {message: 'Failed to determine permission for viewing course statements'})
    }


    return {
        course,
        permissions: {
            view_course_grades: viewCourseGrades,
            view_course_users: viewCourseUsers,
            view_course_statements: viewCourseStatements,
        },
        user: {
            student,
            ...user
        },
        session
    };
}) satisfies LayoutServerLoad;
