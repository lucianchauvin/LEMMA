import type { PageServerLoad } from './$types';
import type { Course, Assignment, StudentAssignment } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const {course, assignment} = await parent();
    const {data: studentAssignments, error: err} = await safeQuery<StudentAssignment>("SELECT * FROM student_assignments WHERE student_assignment_id=$1", [params.proofs]);
    if(err){
        console.error('ERROR: Database failed to query student assignments for assignment:', err);
        error(500, {message: 'Database failed to query student assignments for assignment'})
    }

    return {
        course,
        assignment,
        studentAssignment: studentAssignments[0]
    };
        
}) satisfies PageServerLoad;
