import type { PageServerLoad } from './$types';
import type { Course, Assignment, StudentAssignment, StudentProof } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery }}) => {
    const {course, assignment} = await parent();
    const {data: [studentAssignment], error: studentErr} = await safeQuery<StudentAssignment>("SELECT * FROM student_assignments WHERE student_assignment_id=$1", [params.student_assignment]);
    if(studentErr){
        console.error('ERROR: Database failed to query student assignments for assignment:', studentErr);
        error(500, {message: 'Database failed to query student assignments for assignment'})
    }
    const {data: proofs, error: proofErr} = await safeQuery<StudentProof>("SELECT * FROM student_proofs WHERE student_assignment_id=$1", [studentAssignment.student_assignment_id]);
    if(proofErr){
        console.error('ERROR: Database failed to query student proofs:', proofErr);
        error(500, {message: 'Database failed to query student proofs'})
    }

    return {
        course,
        assignment,
        studentAssignment,
        proofs
    };
        
}) satisfies PageServerLoad;
