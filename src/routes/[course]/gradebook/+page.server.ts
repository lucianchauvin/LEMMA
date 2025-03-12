import type { PageServerLoad } from './$types'; //data fetching from server side
import type { Assignment, User, UserRole } from '$lib/types'; 
import { error } from '@sveltejs/kit'; 

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const { course } = await parent();
    const {data: assignmentResult, error: assignmentErr} = await safeQuery<Assignment>("SELECT * FROM assignments WHERE assignments.course_id=$1", [params.course]);
    const {data: userResult, error: userErr } = await safeQuery<User>("SELECT * FROM users WHERE users.user_id=$1", [params.course ]);
    const {data: userRoleResult, error: userRoleErr} = await safeQuery<UserRole>("SELECT * FROM user_roles WHERE users_role.user_id=$1", [params.course]); 

    if (assignmentErr)
    {
        console.error('ERROR: Database failed to query assignments for course:', assignmentErr);
        error(500, {message: 'Database failed to query assignments for course'})
    }

    if (userErr)
    {
        console.error('ERROR: Database failed to query users for course:', userErr);
        error(500, {message: 'Database failed to query users for course'})
    }
    
    // if (userRoleErr)
    // {
    //     console.error('ERROR: Database failed to query user roles for course:', userRoleErr);
    //     error(500, {message: 'Database failed to query for user roles for course'})
    // }

    return {
        title: `${course.course_number}: ${course.course_name}`,
        course: {
            id: course.course_id,
            name: course.course_name,
            number: course.course_number,
            description: course.course_description,
        },
        assignments: assignmentResult,
        users: userResult,
        user_roles: userRoleResult,
    };
}) satisfies PageServerLoad;