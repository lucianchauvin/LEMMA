import type { PageServerLoad, Actions } from './$types';
import { isUUID } from '$lib/util';
import type { UUID, Assignment, Reading } from '$lib/types';
import { error, fail } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery, permCheck }}) => {
    const {course, permissions} = await parent();
    const {data: assignmentResult, error: assignmentErr} = await safeQuery<Assignment>("SELECT * FROM assignments WHERE assignments.course_id=$1", [params.course]);
    const {data: createAssignments, error: createAssignmentErr} = await permCheck('create_assignments', course.course_id);

    if(assignmentErr) {
        console.error('ERROR: Database failed to query assignments for course:', assignmentErr);
        error(500, {message: 'Database failed to query assignments for course'})
    }
    if(createAssignmentErr) {
        console.error('ERROR: Failed to determine permission for creating assignments:', createAssignmentErr);
        error(500, {message: 'Failed to determine permission for creating assignments'})
    }

    return {
        course: {
            id: course.course_id,
            name: course.course_name,
            number: course.course_number,
            description: course.course_description,
        },
        assignments: assignmentResult,
        permissions: {
            ...permissions,
            create_assignments: createAssignments
        }
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    create: async ({ request, locals: { safeQuery, permCheck } }) => {
        const formData = await request.formData();
        const courseId = formData.get("courseId");

        if(!courseId || typeof courseId !== 'string' || !isUUID(courseId)){
            return fail(400, {message: "Course id is incorrect"});
        }

        const {data: assignmentData, error: assignmentErr} = await permCheck('create_assignments', courseId as UUID);
        if(assignmentErr) {
            console.error('Failed to check permission of user for creating assignments:', assignmentErr)
            throw error(500, {message: "Failed to check permission of user for creating assignments"})
        }
        if(!assignmentData.access) {
            return fail(403, {message: "Do not have permission to create an assignment"});
        }

        const name = formData.get("name");
        const description = formData.get("description");
        const active = formData.get("active") == "yes";
        const dueDate = formData.get("dueDate");

        console.log(name, description, active, dueDate);

        if(typeof name !== 'string') return fail(400, {message: "Assignment name isn't a string"});
        if(typeof description !== 'string') return fail(400, {message: "Assignment description isn't a string"});
        if(typeof active !== 'boolean') return fail(400, {message: "Active isn't a boolean"});
        if(typeof dueDate !== 'string') return fail(400, {message: "Date isn't a string"});

        const {error: insertErr} = await safeQuery(
            `INSERT INTO assignments (course_id, assignment_name, assignment_description, active, due_date) VALUES ($1, $2, $3, $4, $5)`, 
        [courseId, name, description, active, new Date(dueDate)]);

        if(insertErr) {
            console.error('Failed to insert assignment:', assignmentErr)
            throw error(500, {message: "Failed to insert assignment"})
        }
    },
    delete: async ({ request, locals: { safeQuery } }) => {
    }
}
