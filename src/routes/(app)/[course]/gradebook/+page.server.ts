import type { PageServerLoad, Actions } from './$types'; //data fetching from server side
import type { Assignment, User, UserRole, StudentAssignment } from '$lib/types'; 
import { error } from '@sveltejs/kit'; 

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const {data: assignmentResult, error: assignmentErr} 
    = await safeQuery<Assignment>("SELECT * FROM assignments WHERE assignments.course_id=$1", [params.course]);
    const {data: userResult, error: userErr } 
    = await safeQuery<User>("SELECT u.* FROM users u JOIN user_roles ur ON u.user_id = ur.user_id WHERE ur.course_id = $1 AND ur.role_name='student'", [params.course ]);
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
    
    if (studentAssignmentErr)
    {
        console.error('ERROR: Database failed to query student assignments for course:', studentAssignmentErr);
        error(500, {message: 'Database failed to query for student assignments for course'})        
    }

    return {
        assignments: assignmentResult,
        students: userResult,
        student_assignments: studentAssignmentResult,
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
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
