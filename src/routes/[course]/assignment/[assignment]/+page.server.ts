import type { PageServerLoad } from './$types';
import type { Course, Assignment, StudentAssignment } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const {course, assignment} = await parent();
    const {data: studentAssignments, error: err} = await safeQuery<StudentAssignment>("SELECT * FROM student_assignments WHERE assignment_id=$1", [params.assignment]);
    if(err){
        console.error('ERROR: Database failed to query student assignments for assignment:', err);
        error(500, {message: 'Database failed to query student assignments for assignment'})
    }

    // find edit assignment
    const editAssignment = studentAssignments.find((item: StudentAssignment) => item.edit);

    return {
        title: "Assignment Page",
        course,
        assignment,
        studentAssignments,
        edit: {
            editAssignment
        }
    };
        
}) satisfies PageServerLoad;
