import type { PageServerLoad, Actions } from "../$types";
import type { User } from "$lib/types";
import { error, fail } from "@sveltejs/kit";

export const load = (async ({parent, params, locals: { safeQuery, permCheck } }) => {
    const {user, permissions} = await parent();

    if(!permissions.view_course_users.access) {
        throw error(403, { message: "Forbidden" } )
    }

    const {data: update_course_users, error: updateCourseUserErr} = await permCheck('update_course_users', params.course);
    if(updateCourseUserErr) {
        console.error("ERROR: Failed to determine permission to update course users:", updateCourseUserErr);
        throw error(500, { message: "Failed to determine permission to update course users" })
    }

    let nonAssignedUsers;
    if(update_course_users.access) {
        // only get admin users if current user is an admin
        const { data: tmpVal, error: allUsersErr } = await safeQuery<User>(
            `SELECT u.*
            FROM users u
            WHERE NOT EXISTS (
              SELECT 1
              FROM user_roles ur
              WHERE ur.user_id = u.user_id AND ur.course_id = $1
            )
            AND u.is_super_admin = ANY($2)`,
        [params.course, [false, user.isAdmin]]);
        
        if(allUsersErr) {
            console.error("ERROR: Database failed to query all users:", allUsersErr);
            throw error(500, { message: "Database failed to query all users" });
        }
        nonAssignedUsers = tmpVal;
    }

    // get all course users the current user should see and always include self
    const {data: courseUsers, error: courseUsersErr} = await safeQuery(
        `SELECT 
          u.user_id,
          CONCAT(first_name, ' ', last_name) AS name,
          u.email,
          ur.role_name
        FROM users u
        JOIN user_roles ur ON ur.user_id = u.user_id
        WHERE 
            u.is_super_admin=ANY($1) AND 
            ur.course_id=$2 AND 
            ($3 OR ur.role_name=ANY($4) OR ur.user_id=$5)`,
    [[false, user.isAdmin], params.course, user.isAdmin, permissions.view_course_users.target_roles, user.id]);

    if (courseUsersErr) {
        console.error("ERROR: Database failed to query users for course:", courseUsersErr);
        throw error(500, { message: "Database failed to query users for course" });
    }

	// Check for presence of any students in already-fetched courseUsers list
	const noStudents =  !Array.isArray(courseUsers) || !courseUsers.some((u: any) => u.role_name === "student");

    return {
        ...(nonAssignedUsers ? {new_users: nonAssignedUsers}: {}),
        users: courseUsers,
        noStudents,
        permissions: {
            ...permissions,
            update_course_users
        }
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    add: async ({ request, params, locals: { safeQuery, permCheck } }) => {
        const {data: permData, error: permErr} = await permCheck('update_course_users', params.course);
        if(permErr) {
            console.error("ERROR: Failed to determine permission for updating course users:", permErr);
            throw error(500, { message: "Failed to determine permission for updating course users" })
        }

        if(!permData.access) {
            throw error(403, { message: "Forbidden"})
        }

        const formData = await request.formData();
        const selectedUserId = formData.get("user_id") as string;
        const role = formData.get("role") as string;

        if (!selectedUserId) {
            return fail(400, { error: "No student selected" });
        }

        if (!role) {
            return fail(400, { error: "No role selected" });
        }

        if(!permData.target_roles!.includes(role)) {
            throw error(403, { message: "Forbidden"});
        }

        // Check if user is already in course
        const {data: userRole, error: roleErr} = await safeQuery(
            "SELECT * FROM user_roles WHERE user_id = $1 AND course_id = $2", 
            [selectedUserId, params.course]
        );

        if (roleErr) {
            console.error("ERROR: Unable to check whether a user is added:", roleErr);
            return fail(500, { message: "Unable to check if user is added" });
        }

        if (userRole!.length > 0) {
            console.error("ERROR: User is already assigned a role");
            return fail(400, { error: "User is already assigned a role" });
        }

        const {error: insertErr} = await safeQuery(
            "INSERT INTO user_roles (user_id, course_id, role_name) VALUES ($1, $2, $3)",
            [selectedUserId, params.course, role] 
        );

        if (insertErr) {
            console.error("ERROR: Database failed to add role:", insertErr);
            return fail(500, { message: "Database failed to add role" });
        }

        if(role === 'student') {
            // add student assignments for student
            const {error: insertStudentAssignmentErr} = await safeQuery(
                `INSERT INTO student_assignments (assignment_id, student_id)
                SELECT a.assignment_id, $1
                FROM assignments a
                WHERE a.course_id=$2`,
            [selectedUserId, params.course]);

            if(insertStudentAssignmentErr) {
                console.error("ERROR: Database failed to add student assignments for student:", insertStudentAssignmentErr);
                return fail(500, { message: "Database failed to add student assignments for student" });
            }
        }

        return { success: true, message: `User successfully added` }; 
    },

    remove: async ({ request, params, locals: { safeQuery, permCheck } }) => {
        const {data: permData, error: permErr} = await permCheck('update_course_users', params.course);
        if(permErr) {
            console.error("ERROR: Failed to determine permission for updating course users:", permErr);
            throw error(500, { message: "Failed to determine permission for updating course users" })
        }

        if(!permData.access) {
            throw error(403, { message: "Forbidden"})
        }

        const formData = await request.formData();
        const user_id = formData.get("user_id") as string;
        const role = formData.get("role") as string;

        if(!user_id) {
            fail(400, { message: "User ID is required" });
        }
        if (!role) {
            return fail(400, { error: "No role selected" });
        }
        if(!permData.target_roles!.includes(role)) {
            throw error(403, { message: "Forbidden"});
        }

        const {error: deleteErr} = await safeQuery(
            "DELETE FROM user_roles WHERE user_id = $1 AND course_id = $2",
            [user_id, params.course]
        );

        if (deleteErr) {
            console.error("ERROR: Failed to remove student:", deleteErr);
            fail(500, { message: "Failed to remove student" });
        }

        if(role === 'student') {
            // remove student assignments for student
            const {error: deleteStudentAssignmentErr} = await safeQuery(
                `DELETE FROM student_assignments sa
                WHERE sa.student_id=$1
                AND assignment_id IN (
                    SELECT a.assignment_id 
                    FROM assignments a 
                    WHERE a.course_id=$2
                )`,
            [user_id, params.course]);

            if(deleteStudentAssignmentErr) {
                console.error("ERROR: Database failed to delete student assignments for student:", deleteStudentAssignmentErr);
                return fail(500, { message: "Database failed to delete student assignments for student" });
            }
        }

        return { success: true, message: `User successfully removed` }; 
    }
};
