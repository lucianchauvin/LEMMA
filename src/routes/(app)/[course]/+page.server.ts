import type { PageServerLoad, Actions } from './$types';
import { isUUID } from '$lib/util';
import type { UUID, Assignment, StudentAssignment } from '$lib/types';
import { error, fail } from '@sveltejs/kit';

export const load = (async ({parent, params, locals: { safeQuery, permCheck }}) => {
    const {user, course, permissions} = await parent();
    const {data: viewInactiveAssignments, error: viewInactiveAssignmentsErr} = await permCheck('view_inactive_assigned_course_assignments', course.course_id);
    const {data: createAssignments, error: createAssignmentErr} = await permCheck('create_assignments', course.course_id);
    const {data: updateAssignments, error: updateAssignmentErr} = await permCheck('update_assignments', course.course_id);
    const {data: deleteAssignments, error: deleteAssignmentErr} = await permCheck('delete_assignments', course.course_id);

    if(viewInactiveAssignmentsErr) {
        console.error('ERROR: Failed to determine permission for view inactive assignments:', viewInactiveAssignmentsErr);
        throw error(500, {message: 'Failed to determine permission for view inactive assignments'})
    }
    if(createAssignmentErr) {
        console.error('ERROR: Failed to determine permission for creating assignments:', createAssignmentErr);
        throw error(500, {message: 'Failed to determine permission for creating assignments'})
    }
    if(updateAssignmentErr) {
        console.error('ERROR: Failed to determine permission for updating assignments:', updateAssignmentErr);
        throw error(500, {message: 'Failed to determine permission for updating assignments'})
    }
    if(createAssignmentErr) {
        console.error('ERROR: Failed to determine permission for deleting assignments:', deleteAssignmentErr);
        throw error(500, {message: 'Failed to determine permission for deleting assignments'})
    }

    const actives = ['true'];
    if(viewInactiveAssignments!.access)
        actives.push('false');

    const {data: assignmentResult, error: assignmentErr} = await safeQuery<Assignment>("SELECT * FROM assignments WHERE assignments.course_id=$1 AND assignments.active=ANY($2)", [params.course, actives]);

    if(assignmentErr) {
        console.error('ERROR: Database failed to query assignments for course:', assignmentErr);
        throw error(500, {message: 'Database failed to query assignments for course'})
    }

    let studentAssignments: StudentAssignment[] = [];
    if(user.student) {
        const {data: tmpData, error: studentAssignmentErr} = await safeQuery<StudentAssignment>(
            `SELECT 
                sa.*
            FROM student_assignments sa
            JOIN assignments a ON sa.assignment_id = a.assignment_id
            WHERE a.course_id = $1 AND sa.student_id = $2`,
        [params.course, user.id]);
        
        if(studentAssignmentErr) {
            console.error('ERROR: Database failed to query student assignments for course:', studentAssignmentErr);
            throw error(500, {message: 'Database failed to query student assignments for course'})
        }
        studentAssignments = tmpData!;
    }

    return {
        course: {
            id: course.course_id,
            name: course.course_name,
            number: course.course_number,
            description: course.course_description,
        },
        assignments: assignmentResult,
        studentAssignments,
        permissions: {
            ...permissions,
            create_assignments: createAssignments,
            update_assignments: updateAssignments,
            delete_assignments: deleteAssignments,
            view_inactive_assigned_course_assignments: viewInactiveAssignments
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
            console.error('ERROR: Failed to check permission of user for creating assignments:', assignmentErr)
            throw error(500, {message: "Failed to check permission of user for creating assignments"})
        }
        if(!assignmentData.access) {
            return fail(403, {message: "Do not have permission to create an assignment"});
        }

        const name = formData.get("name");
        const description = formData.get("description");
        const active = formData.get("active") == "yes";
        const dueDate = formData.get("dueDate");

        if(typeof name !== 'string' || !name) return fail(400, {error: "Invalid assignment name"});
        if(typeof description !== 'string' || !description) return fail(400, {error: "Invalid assignment description"});
        if(typeof dueDate !== 'string' || !dueDate) return fail(400, {error: "Invalid due date"});

        const date = new Date(dueDate);
        if(isNaN(date.getTime())) {
            return fail(400, {message: "Invalid due date"});
        }


        const {data: assignmentRet, error: insertErr} = await safeQuery<{assignment_id: UUID}>(
            `INSERT INTO assignments (course_id, assignment_name, assignment_description, active, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING assignment_id`, 
        [courseId, name, description, active, new Date(dueDate)]);

        if(insertErr) {
            console.error('ERROR: Failed to insert assignment:', insertErr)
            throw error(500, {message: "Failed to insert assignment"})
        }
        if(assignmentRet!.length == 0) {
            console.error('ERROR: Failed to get an assignment id from inserting an assignment');
            throw error(500, {message: "Failed to get an assignment id from inserting an assignment"})
        }
        const assignmentId = assignmentRet![0].assignment_id;

        // insert edit assignment
        const {error: insertEditStudentErr} = await safeQuery(
            `INSERT INTO student_assignments (assignment_id, edit)
            VALUES ($1, true)`,
        [assignmentId]);

        if(insertEditStudentErr) {
            console.error('ERROR: Failed to insert edit student assignment to newly created course:', insertEditStudentErr);

            const {error: deleteErr} = await safeQuery(
                `DELETE FROM assignments WHERE assignment_id=$1`, 
            [assignmentId]);
            
            if(deleteErr) {
                console.error('ERROR: Failed to delete newly created assignment:', deleteErr);
            }

            throw error(500, {message: "Failed to insert edit student assignment to newly created course"})
        }

        // add student assignments 
        // add student assignments for student
        const {error: insertStudentErr} = await safeQuery(
            `INSERT INTO student_assignments (assignment_id, student_id)
            SELECT $1, user_roles.user_id
            FROM user_roles
            WHERE user_roles.course_id=$2 AND user_roles.role_name='student'`,
        [assignmentId, courseId]);

        if(insertStudentErr) {
            console.error('ERROR: Failed to insert student assignments to newly created course:', insertStudentErr);

            const {error: deleteErr} = await safeQuery(
                `DELETE FROM assignments WHERE assignment_id=$1`, 
            [assignmentId]);

            const {error: deleteEditErr} = await safeQuery<{assignment_id: UUID}>(
                `DELETE FROM student_assignments WHERE assignment_id=$1`, 
            [assignmentId]);
            
            if(deleteErr) {
                console.error('ERROR: Failed to delete newly created assignment:', deleteErr);
            }
            if(deleteEditErr) {
                console.error('ERROR: Failed to delete newly created assignment edit page:', deleteEditErr);
            }

            throw error(500, {message: "Failed to insert student assignments to newly created course"});
        }
    },
    delete: async ({ request, locals: { safeQuery, permCheck } }) => {
        const formData = await request.formData();
        const courseId = formData.get('courseId');
        const assignmentId = formData.get('assignmentId');

        if(!courseId || typeof courseId !== 'string' || !isUUID(courseId)){
            return fail(400, {message: "Course id is incorrect"});
        }
        if(!assignmentId || typeof assignmentId !== 'string' || !isUUID(assignmentId)){
            return fail(400, {message: "Assignment id is incorrect"});
        }

        const {data: assignmentData, error: assignmentErr} = await permCheck('delete_assignments', courseId as UUID);
        if(assignmentErr) {
            console.error('ERROR: Failed to check permission of user for deleting assignments:', assignmentErr)
            throw error(500, {message: "Failed to check permission of user for deleting assignments"})
        }
        if(!assignmentData.access) {
            return fail(403, {message: "Do not have permission to delete an assignment"});
        }

        const {error: deleteErr} = await safeQuery(
            `DELETE FROM assignments WHERE assignment_id=$1`, 
        [assignmentId]);

        if(deleteErr) {
            console.error('ERROR: Failed to delete assignment:', deleteErr)
            throw error(500, {message: "Failed to delete assignment"})
        }
    },
    update: async ({ request, params, locals: { safeQuery, permCheck } }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const description = formData.get('description');
        const dueDate = formData.get('dueDate');
        const active = formData.get('active') === 'true' ? true : formData.get('_active') === 'false' ? false : null;
        const assignmentId = formData.get('assignmentId') as string;

        if(!assignmentId || typeof assignmentId !== 'string' || !isUUID(assignmentId)){
            return fail(400, {message: "Assignment id is incorrect"});
        }
        // check if there any fields set
        if((typeof name === 'string' || typeof description === 'string' || typeof dueDate === 'string' || active) && !(name || description || dueDate || active)) {
            // no field set to something truthy
            return fail(400, {error: "No fields set to something valid"})
        }

        const {data: assignmentData, error: assignmentErr} = await permCheck('update_assignments', params.course);
        if(assignmentErr) {
            console.error('ERROR: Failed to check permission of user for updating assignments:', assignmentErr)
            throw error(500, {message: "Failed to check permission of user for updating assignments"})
        }
        if(!assignmentData.access) {
            return fail(403, {message: "Do not have permission to update an assignment"});
        }

        let date: Date | null = null;
        if(dueDate !== null) {
            date = new Date(dueDate as string);
            if(isNaN(date.getTime())) {
                return fail(400, {message: "Invalid due date"});
            }
        }

        // key value pairs
        const data = {
            ...((name !== null) ? {assignment_name: name}: {}),
            ...((description !== null) ? {assignment_description: description}: {}),
            ...((date) ? {due_date: date}: {}),
            ...((active !== null) ? {active: active}: {}),
        }

        for(let [key, value] of Object.entries(data)) {
            const {error: updateErr} = await safeQuery(
                `UPDATE assignments SET ${key}=$1 WHERE assignment_id=$2`, 
            [value, assignmentId]);

            if(updateErr) {
                console.error('ERROR: Failed to update assignment:', updateErr)
                throw error(500, {message: "Failed to update assignment"})
            }
        }

    }
}
