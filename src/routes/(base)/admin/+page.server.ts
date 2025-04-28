import type { PageServerLoad, Actions } from "./$types";
import { isUUID, isUniqueViolation, handleUsername, handlePassword, capitalize } from '$lib/util';
import { fail, error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({locals: { getSession, safeQuery }}) => {
    const {user} = await getSession();

    if(!user || !user.isAdmin)
        throw error(403, {message: 'Forbidden'});

    const { data: userData, error: userErr } = await safeQuery(`SELECT * FROM users`);

    if(userErr) {
        console.error('Database failed to get users data for admin page:', userErr);
        error(500, {message: 'Database failed to get users data for admin page'})
    }

    const { data: courseData, error: courseErr } = await safeQuery(`SELECT * FROM courses`);

    if (courseErr) {
        console.error('Database failed to get courses data for admin page:', courseErr);
        error(500, {message: 'Database failed to get courses data for admin page'})
    }

    return {
        userData,
        courseData
    }
}

export const actions: Actions = {
    /**
     * Adds a new user to the system.
     * 
     * Only admin users can add new users. Validates username and password,
     * ensures required fields are present, and handles unique constraint violations.
     * 
     * @param username {string} - The username of the new user.
     * @param password {string} - The password for the new user.
     * @param first_name {string} - The first name of the new user.
     * @param last_name {string} - The last name of the new user.
     * @param email {string} - The email address of the new user (optional).
     * @param is_admin {string} - Whether the user should have admin privileges (optional, default: 'no').
     * 
     * @returns A success message if the user is added, or a fail response with an error message.
     * 
     * @throws 500 - If there is a database insertion error.
     */
    add: async ({ request, locals: { getSession, safeQuery } }) => {
        const { user } = await getSession();

        if(!user?.isAdmin) {
            return fail(403, { error: "Forbidden" })
        }

        const formData = await request.formData();
        
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const first_name = formData.get("first_name") as string;
        const last_name = formData.get("last_name") as string;
        const email = formData.get("email") as string;
        const is_admin = formData.get("is_admin") as string;

        if (!username || !password || !first_name || !last_name) {
            return fail(400, { user_message: "All fields except email are required"});
        }

        const {error: usernameErr} = await handleUsername(username)
        if(usernameErr) {
            return fail(400, {user_message: usernameErr});
        }

        const {data: passwordHash, error: passwordErr} = await handlePassword(password)
        if(passwordErr) {
            return fail(400, {user_message: passwordErr});
        }

        const { error: insertError } = await safeQuery(
            "INSERT INTO users (username, password, first_name, last_name, email, is_super_admin) VALUES ($1, $2, $3, $4, $5, $6)",
            [username, passwordHash, first_name, last_name, email, is_admin === 'yes']
        );

        if (insertError) {
            const uniqueCol = isUniqueViolation(insertError);
            if(uniqueCol) {
                return fail(400, {user_message: `${capitalize(uniqueCol).split('_').join(' ')} already used`})
            }

            console.error("ERROR: Database failed to insert user on admin page:", insertError);
            throw error(500, { message: "Database failed to insert user" });
        }

        return { success: true, user_message: "User added successfully!" };
    },

    /**
     * Removes a user from the system.
     * 
     * Only admin users can remove users. Validates the provided user ID.
     * 
     * @param user_id {string} - The unique identifier (UUID) of the user to be removed.
     * 
     * @returns A success message if the user is removed, or a fail response with an error message.
     * 
     * @throws 500 - If there is a database deletion error.
     */
    remove: async ({ request, locals: { getSession, safeQuery } }) => {
        const { user } = await getSession();

        if(!user?.isAdmin) {
            return fail(403, { error: "Forbidden" })
        }

        const formData = await request.formData();
        const user_id = formData.get("user_id") as string;

        if(!user_id || !isUUID(user_id)) {
            fail(400, { user_message: "User ID is required" });
        }

        const {error: deleteErr} = await safeQuery(
            "DELETE FROM users WHERE user_id = $1",
            [user_id]
        );

        if (deleteErr) {
            console.error("ERROR: Failed to remove user:", deleteErr);
            throw error(500, { message: "Failed to remove user" });
        }

        return { success: true, user_message: "User removed successfully!"}; 
    },

    /**
     * Updates fields for an existing user.
     * 
     * Only admin users can update user fields. Validates the provided user ID and ensures that at least one field is being updated.
     * Prevents users from demoting themselves from admin status.
     * 
     * @param first_name {string} - The new first name of the user (optional).
     * @param last_name {string} - The new last name of the user (optional).
     * @param email {string} - The new email address of the user (optional).
     * @param username {string} - The new username for the user (optional).
     * @param password {string} - The new password for the user (optional).
     * @param admin {boolean} - Whether the user should be an admin (optional).
     * @param user_id {string} - The unique identifier (UUID) of the user to be updated.
     * 
     * @returns Nothing if successful, or a fail response with an error message.
     * 
     * @throws 500 - If there is a database update error.
     */
    update_user: async ({ request, locals: { getSession, safeQuery } }) => {
        const { user } = await getSession();

        if(!user?.isAdmin) {
            return fail(403, { error: "Forbidden" })
        }

        const formData = await request.formData();
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const admin = formData.get('admin') === 'true' ? true : formData.get('_admin') === 'false' ? false : null;
        const userId = formData.get('userId') as string;

        if(!userId || typeof userId !== 'string' || !isUUID(userId)){
            return fail(400, {user_message: "User id is not valid"});
        }

        // check if there any fields set
        if(!(firstName || lastName || email || username || password || admin !== null)) {
            // no field set to something truthy
            return fail(400, {user_message: "No fields set to something valid"})
        }

        let passwordHash: string;
        if(username) {
            const {error: usernameErr} = await handleUsername(username as string)
            if(usernameErr) {
                return fail(400, {user_message: usernameErr});
            }
        } 
        if(password) {
            const response = await handlePassword(password as string)
            if(response.error) {
                return fail(400, {user_message: response.error});
            }
            passwordHash = response.data!;
        }
        if(admin !== null) {
            // check if changing self
            if(user.id === userId && !admin) {
                return fail(403, {user_message: "Cannot change self from being admin user"})
            }
        }
        

        // key value pairs
        const data = {
            ...((firstName !== null) ? {first_name: firstName}: {}),
            ...((lastName !== null) ? {last_name: lastName}: {}),
            ...((email) ? {email: email}: {}),
            ...((username) ? {username: username}: {}),
            ...((password) ? {password: passwordHash!}: {}),
            ...((admin !== null) ? {is_super_admin: admin}: {}),
        }

        for(let [key, value] of Object.entries(data)) {
            const {error: updateErr} = await safeQuery(
                `UPDATE users SET ${key}=$1 WHERE user_id=$2`, 
            [value, userId]);

            if(updateErr) {
                const uniqueCol = isUniqueViolation(updateErr);
                if(uniqueCol) {
                    return fail(400, {user_message: `${capitalize(uniqueCol).split('_').join(' ')} already used`})
                }

                console.error('ERROR: Failed to update user:', updateErr)
                throw error(500, {message: "Failed to update user"})
            }
        }
    },

    /**
     * Adds a new course to the system.
     * 
     * Only admin users can add courses. Ensures all fields are provided before insertion.
     * 
     * @param course_number {string} - The unique course number.
     * @param course_name {string} - The name of the course.
     * @param status {string} - The current status of the course (e.g., 'active', 'inactive').
     * @param start_date {string} - The start date of the course in ISO format.
     * @param end_date {string} - The end date of the course in ISO format.
     * 
     * @returns A success message if the course is added, or a fail response with an error message.
     * 
     * @throws 500 - If there is a database insertion error.
     */
    add_course: async ({ request, locals: { getSession, safeQuery } }) => {
        const { user } = await getSession();

        if(!user?.isAdmin) {
            return fail(403, { error: "Forbidden" })
        }

        const formData = await request.formData();
        
        const course_number = formData.get("course_number") as string;
        const course_name = formData.get("course_name") as string;
        const status = formData.get("status") as string;
        const start_date = formData.get("start_date") as string;
        const end_date = formData.get("end_date") as string;

        if (!course_number || !course_name || !status || !start_date || !end_date) {
            return fail(400, { course_message: "All fields are required"});
        }
        const { error: insertError } = await safeQuery(
            "INSERT INTO courses (course_number, course_name, status, start_date, end_date) VALUES ($1, $2, $3, $4, $5)",
            [course_number, course_name, status, start_date, end_date]
        );

        if (insertError) {
            console.error("ERROR: Database failed to insert course:", insertError);
            throw error(500, { message: "Database failed to insert course" });
        }

        return { success: true, course_message: "Course added successfully!" };
    },

    /**
     * Removes a course from the system.
     * 
     * Only admin users can remove courses. Validates the provided course ID.
     * 
     * @param course_id {string} - The unique identifier (UUID) of the course to be removed.
     * 
     * @returns A success message if the course is removed, or a fail response with an error message.
     * 
     * @throws 500 - If there is a database deletion error.
     */
    remove_course: async ({ request, locals: { getSession, safeQuery } }) => {
        const { user } = await getSession();

        if(!user?.isAdmin) {
            return fail(403, { error: "Forbidden" })
        }

        const formData = await request.formData();
        const course_id = formData.get("course_id") as string;

        if(!course_id || !isUUID(course_id)) {
            fail(400, { course_message: "Course ID is required" });
        }

        const {error: deleteErr} = await safeQuery(
            "DELETE FROM courses WHERE course_id = $1",
            [course_id]
        );

        if (deleteErr) {
            console.error("ERROR: Failed to remove course:", deleteErr);
            throw error(500, { message: "Failed to remove course" });
        }

        return { success: true, course_message: "Course removed successfully!"}; 
    },

    /**
     * Updates fields for an existing course.
     * 
     * Only admin users can update course fields. Validates the provided course ID and ensures that at least one field is being updated.
     * 
     * @param course_number {string} - The new course number (optional).
     * @param course_name {string} - The new course name (optional).
     * @param status {string} - The new status of the course (optional).
     * @param start_date {string} - The new start date of the course in ISO format (optional).
     * @param end_date {string} - The new end date of the course in ISO format (optional).
     * @param course_id {string} - The unique identifier (UUID) of the course to be updated.
     * 
     * @returns Nothing if successful, or a fail response with an error message.
     * 
     * @throws 500 - If there is a database update error.
     */
    update_course: async ({ request, locals: { getSession, safeQuery } }) => {
        const { user } = await getSession();

        if(!user?.isAdmin) {
            return fail(403, { course_message: "Forbidden" })
        }

        const formData = await request.formData();
        const courseNumber = formData.get('courseNumber');
        const courseName = formData.get('courseName');
        const status = formData.get('status');
        const startDateStr = formData.get('startDate');
        const endDateStr = formData.get('endDate');
        const courseId = formData.get('courseId') as string;

        if(!courseId || typeof courseId !== 'string' || !isUUID(courseId)){
            return fail(400, {course_message: "Course id is not valid"});
        }

        // check if there any fields set
        if(!(courseNumber || courseName || status || startDateStr || endDateStr)) {
            // no field set to something truthy
            return fail(400, {course_message: "No fields set to something valid"})
        }

        let startDate: Date | null = null;
        let endDate: Date | null = null;
        if(startDateStr) {
            startDate = new Date(startDateStr as string);
            if(isNaN(startDate.getTime())) {
                return fail(400, {message: "Invalid start date"});
            }
        }
        if(endDateStr) {
            endDate = new Date(endDateStr as string);
            if(isNaN(endDate.getTime())) {
                return fail(400, {message: "Invalid end date"});
            }
        }

        // key value pairs
        const data = {
            ...((courseNumber !== null) ? {course_number: courseNumber}: {}),
            ...((courseName !== null) ? {course_name: courseName}: {}),
            ...((status) ? {status: status}: {}),
            ...((startDate) ? {start_date: startDate.toISOString()}: {}),
            ...((endDate) ? {end_date: endDate.toISOString()}: {}),
        }

        for(let [key, value] of Object.entries(data)) {
            const {error: updateErr} = await safeQuery(
                `UPDATE courses SET ${key}=$1 WHERE course_id=$2`, 
            [value, courseId]);

            if(updateErr) {
                const uniqueCol = isUniqueViolation(updateErr);
                if(uniqueCol) {
                    return fail(400, {course_message: `${capitalize(uniqueCol).split('_').join(' ')} already used`})
                }

                console.error('ERROR: Failed to update course:', updateErr)
                throw error(500, {message: "Failed to update course"})
            }
        }
    },
};
