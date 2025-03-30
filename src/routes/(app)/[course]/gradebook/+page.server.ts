import type { PageServerLoad, Actions } from './$types'; //data fetching from server side
import type { Assignment, User, UserRole, StudentAssignment } from '$lib/types'; 
import { error } from '@sveltejs/kit'; 

/**
 * Loads data required for the gradebook page.
 * Queries assignments, users, user roles, and student assignments for a given course.
 * 
 * @param {Object} context - The SvelteKit server load context.
 * @param {Function} context.parent - Fetches parent data.
 * @param {Object} context.params - Route parameters.
 * @param {Object} context.locals.safeQuery - Function for safely querying the database.
 * @returns {Promise<Object>} The course details and related data.
 * @throws {Error} Throws an error if any database query fails.
 */
export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const { course } = await parent();
    
    // Query assignments related to the course
    const {data: assignmentResult, error: assignmentErr} 
    = await safeQuery<Assignment>("SELECT * FROM assignments WHERE assignments.course_id=$1", [params.course]);
    
    // Query users associated with the course
    const {data: userResult, error: userErr } 
    = await safeQuery<User>("SELECT u.* FROM users u JOIN user_roles ur ON u.user_id = ur.user_id WHERE ur.course_id = $1", [params.course ]);
    
    // Query user roles within the course
    const {data: userRoleResult, error: userRoleErr} 
    = await safeQuery<UserRole>("SELECT ur.*, r.display_name FROM user_roles ur JOIN roles r ON ur.role_name = r.role_name WHERE ur.course_id = $1", [params.course]); 
    
    // Query student assignments linked to the course
    const {data: studentAssignmentResult, error: studentAssignmentErr} 
    = await safeQuery<StudentAssignment>("SELECT sa.*  FROM student_assignments sa JOIN assignments a ON sa.assignment_id = a.assignment_id WHERE a.course_id = $1", [params.course]);
    
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
    
    if (userRoleErr)
    {
        console.error('ERROR: Database failed to query user roles for course:', userRoleErr);
        error(500, {message: 'Database failed to query for user roles for course'})
    }

    if (studentAssignmentErr)
    {
        console.error('ERROR: Database failed to query student assignments for course:', userRoleErr);
        error(500, {message: 'Database failed to query for student assignments for course'})        
    }

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
        student_assignments: studentAssignmentResult,
    };
}) satisfies PageServerLoad;

/**
 * Handles actions related to grade editing.
 */
export const actions: Actions = {
    /**
     * Updates a student's grade for a specific assignment.
     * 
     * @param {Object} context - The SvelteKit action context.
     * @param {Request} context.request - The request object containing form data.
     * @param {Object} context.locals.safeQuery - Function for safely querying the database.
     * @returns {Promise<Object>} An object indicating success or failure.
     */
    editGrades: async ({ request, locals: { safeQuery } }) => {
        const formData = await request.formData();
        const studentId = formData.get('student_id');
        const assignmentId = formData.get('assignment_id');
        const grade = formData.get('grade');
        
        if (!studentId || !assignmentId || grade === null) {
            return { error: 'Missing required fields' };
        }

        const numericGrade = parseFloat(grade as string);
        if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > 100) {
            console.error('ERROR:', grade, 'is an invalid grade. Grade must be a number in between 0 and 100 inclusive');
            return { error: 'Invalid grade. Grade must be a number in between between 0 and 100 inclusive' };
        }

        // Update the grade in the database
        const { error: updateError } = await safeQuery(
            "UPDATE student_assignments SET grade = $1 WHERE student_id = $2 AND assignment_id = $3",
            [numericGrade, studentId, assignmentId]
        );

        if (updateError) {
            console.error('ERROR: Failed to update grade:', updateError);
            return { error: 'Failed to update grade' };
        }

        return { success: true };
    }
};