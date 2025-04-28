import type { PageServerLoad, Actions } from './$types'; //data fetching from server side
import type { Assignment, User, UserRole, StudentAssignment } from '$lib/types'; 
import { error, fail } from '@sveltejs/kit'; 

export const load = (async ({parent, params, locals: { safeQuery, permCheck }}) => {
    const {permissions} = await parent();

    if(!permissions.view_course_grades.access)
        throw error(403, { message: "Forbidden" })

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
    /**
     * Edits grades for assignments in a course.
     * 
     * Only users with permission to change course grades can perform this action.
     * Validates the provided student IDs, assignment IDs, and grades before updating the grades in the database.
     * 
     * @param course {UUID} - The course id for the grades that are being changed.
     * @param student_id {UUID[]} - The array of student IDs whose grades need to be updated.
     * @param assignment_id {UUID[]} - The array of assignment IDs for which grades need to be updated.
     * @param grade {number[]} - The array of grades to be assigned to the students for the respective assignments.
     * 
     * @returns A success message if the grades are updated successfully, or a fail response with an error message.
     * 
     * @throws 400 - If the input data is mismatched or invalid (e.g., mismatched lengths of student IDs, assignment IDs, and grades).
     * @throws 403 - If the user does not have permission to edit the grades.
     * @throws 500 - If there is a database update error.
     */
    edit_grades: async ({ request, params, locals: { safeQuery, permCheck } }) => {
        const {data: permData, error: permErr} = await permCheck('change_course_grades', params.course);
        if(permErr) {
            console.error("ERROR: Failed to determine permission for changing course grades:", permErr);
            throw error(500, { message: "Failed to determine permission for changing course grades" })
        }

        if(!permData.access) {
            return fail(403, { message: "Forbidden"})
        }

        const formData = await request.formData();
        const studentIds = formData.getAll('student_id');
        const assignmentIds = formData.getAll('assignment_id');
        const grades = formData.getAll('grade');

        if (studentIds.length !== assignmentIds.length || assignmentIds.length !== grades.length) {
            return { error: 'Mismatched input lengths' };
        }

        for (let i = 0; i < studentIds.length; i++) {
            const studentId = studentIds[i];
            const assignmentId = assignmentIds[i];
            const grade = grades[i];            

            if (!studentId || !assignmentId || grade === null) {
                continue;
            }

            const numericGrade = parseFloat(grade as string);
            if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > 100) {
                console.error('ERROR:', grade, 'is an invalid grade. Grade must be a number in between 0 and 100 inclusive');
                continue; 
            }

            const { error: updateError } = await safeQuery(
                "UPDATE student_assignments SET grade = $1 WHERE student_id = $2 AND assignment_id = $3",
                [numericGrade, studentId, assignmentId]
            );
    
            if (updateError) {
                console.error('ERROR: Failed to update grade:', updateError);
                return { error: 'Failed to update grade for one or more students' };
            }

        }
    }
};
