import type { PageServerLoad } from './$types';
import type { Assignment } from '$lib/types';
import { error } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';
import { PROJPATH } from '$env/static/private';

export const load = (async ({params, locals: { database }}) => {
    const courseResult = await database.query("SELECT * FROM course WHERE course_id=$1", [params.course]);
    const assignmentResult = await database.query("SELECT * FROM assignments WHERE assignment_id=$1", [params.assignment]);
    const studentProofs = await database.query("SELECT * FROM student_proofs WHERE assignment_id=$1", [params.assignment]);

    if (assignmentResult.rows.length === 0) throw error(404); // no assignment found like this
    if (assignmentResult.rows.length > 1) {
        console.error(`Found multiple assignments with id ${params.assignment}`);
        throw error(500);
    }

    if (courseResult.rows.length === 0) throw error(404); // no course found like this
    if (courseResult.rows.length > 1) {
        console.error(`Found multiple courses with id ${params.course}`);
        throw error(500);
    }


    const course: Course = courseResult.rows[0];
    const assignment: Assignment = assignmentResult.rows[0];

    return {
        title: "Assignment Page",
        course: course,
        assignment: {
            name: assignment.assignment_name,
        },
        proofs: studentProofs.rows
    };
        
}) satisfies PageServerLoad;

export const actions = {
	upload: async ({ params, request, locals: { database } }) => {
		const formData = await request.formData();
    const file = formData.file;

    database.query("INSERT INTO student_proofs ")
    
    await writeFile(`${PROJPATH}/savedwork/${params.course}/${params.assignment}/${file.name}`, await file.text());
	},
}

