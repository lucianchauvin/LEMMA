import type { PageServerLoad, Actions } from "../$types";
import type { User, UserRole} from "$lib/types";
import { error, fail } from "@sveltejs/kit";

export const load = (async ({parent, params, locals: { safeQuery } }) => {
    const {permissions} = await parent();

    if(!permissions.view_course_users.access || !permissions.view_course_users.target_roles!.includes('student')) {
        throw error(403, { message: "Forbidden" } )
    }

    // Fetch all non admin users
    const { data: userResult, error: userErr } = await safeQuery<User>("SELECT u.* FROM users u WHERE u.is_super_admin=false");
    const {data: userRoleResult, error: userRoleErr} 
    = await safeQuery<UserRole>("SELECT ur.*, r.display_name FROM user_roles ur JOIN roles r ON ur.role_name = r.role_name WHERE ur.course_id = $1", [params.course]); 

    if (userErr) {
        console.error("ERROR: Database failed to query users for course:", userErr);
        throw error(500, { message: "Database failed to query users for course" });
    }

    if (userRoleErr) {
        console.error("ERROR: Database failed to query user roles for course:", userRoleErr);
        throw error(500, { message: "Database failed to query for user roles for course" });  
    }

    return {
        users: userResult,
        user_roles: userRoleResult,
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

        if (!selectedUserId) {
            console.error("ERROR: No user selected");
            return fail(400, { message: "No student selected" });
        }

        const {data: user, error: userErr} = await safeQuery("SELECT * FROM users WHERE user_id = $1", [selectedUserId]);

        if (userErr || !user || user.length === 0)
        {
            console.error("ERROR: Student not found or database failed to query:", userErr);
            return fail(500, { message: "Student not found or database failed to query" });
        }

        // Check if user is already in course
        const {data: userRole, error: roleErr} = await safeQuery(
            "SELECT * FROM user_roles WHERE user_id = $1 AND course_id = $2", 
            [selectedUserId, params.course]
        );

        if (roleErr) {
            console.error("ERROR: Unable to check whether a student is added:", roleErr);
            fail(500, { message: "Unable to check if student is added" });
        }

        if (userRole!.length > 0) {
            console.error("ERROR: Student is already in the course");
            fail(400, { message: "Student is already in the course" });
        }

        const {error: insertErr} = await safeQuery(
            "INSERT INTO user_roles (user_id, course_id, role_name) VALUES ($1, $2, 'student')",
            [user[0].user_id, params.course] 

        );

        if (insertErr) {
            console.error("ERROR: Database failed to add student:", insertErr);
            fail(500, { message: "Database failed to add student" });
        }

        return { success: true }; 
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

        if(!user_id) {
            fail(400, { message: "User ID is required" });
        }

        const {error: deleteErr} = await safeQuery(
            "DELETE FROM user_roles WHERE user_id = $1 AND course_id = $2",
            [user_id, params.course]
        );

        if (deleteErr) {
            console.error("ERROR: Failed to remove student:", deleteErr);
            fail(500, { message: "Failed to remove student" });
        }

        return { success: true }; 
    }
};
