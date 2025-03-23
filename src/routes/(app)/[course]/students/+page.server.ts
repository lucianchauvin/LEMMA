import type { PageServerLoad } from "../$types";
import type { User, UserRole} from "$lib/types";
import { error } from "@sveltejs/kit";

export const load = (async ({ parent, params, locals: { safeQuery } }) => {
    const { course } = await parent();
    const { data: userResult, error: userErr } 
    = await safeQuery<User>("SELECT u.* FROM users u JOIN user_roles ur ON u.user_id = ur.user_id WHERE ur.course_id = $1", [params.course]);
    const {data: userRoleResult, error: userRoleErr} 
    = await safeQuery<UserRole>("SELECT ur.*, r.display_name FROM user_roles ur JOIN roles r ON ur.role_name = r.role_name WHERE ur.course_id = $1", [params.course]); 

    if (userErr) {
        console.error("ERROR: Database failed to query users for course:", userErr);
        error(500, { message: "Database failed to query users for course" });
    }

    if (userRoleErr) {
        console.error("ERROR: Database failed to query user roles for course:", userRoleErr);
        error(500, { message: "Database failed to query for user roles for course" });  
    }

    return {
        title: `${course.number}: ${course.name}`,
        course: {
            id: course.id, 
            name: course.name,
            number: course.number,
            description: course.description,
        },
        users: userResult,
        user_roles: userRoleResult,
    };
}) satisfies PageServerLoad;