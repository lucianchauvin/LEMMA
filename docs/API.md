# API Documentation

## /[course]/create

**Type:** form-action

**Method:** POST

**Description:**
Creates a new assignment for a course.
Only users with permission to create assignments for the course can perform this action.
Validates the provided course ID and ensures all necessary assignment fields are included.

### Parameters
- **request**: The request containing form data: courseId, name, description, active, dueDate.

### Returns
- A success message if the assignment is created successfully, or a fail response with an error message.

### Throws
- 400 - If the course ID or assignment fields are invalid.
- 403 - If the user does not have permission to create an assignment.
- 500 - If there is a database insertion error.

## /[course]/delete

**Type:** form-action

**Method:** POST

**Description:**
Deletes an assignment from a course.
Only users with permission to delete assignments for the course can perform this action.
Validates the provided course ID and assignment ID before deletion.

### Parameters
- **request**: The request containing form data: courseId, assignmentId.

### Returns
- A success message if the assignment is deleted successfully, or a fail response with an error message.

### Throws
- 400 - If the course ID or assignment ID is invalid.
- 403 - If the user does not have permission to delete the assignment.
- 500 - If there is a database deletion error.

## /[course]/update

**Type:** form-action

**Method:** POST

**Description:**
Updates fields for an existing assignment.
Only users with permission to update assignments for the course can perform this action.
Validates the provided assignment ID and ensures that at least one field is being updated.

### Parameters
- **request**: The request containing form data: assignmentId, name, description, dueDate, active.

### Returns
- A success message if the assignment is updated successfully, or a fail response with an error message.

### Throws
- 400 - If the assignment ID is invalid or no fields to update are provided.
- 403 - If the user does not have permission to update the assignment.
- 500 - If there is a database update error.

## /[course]/assignment/[assignment]/[student_assignment]/problem_description

**Type:** form-action

**Method:** POST

**Description:**
Updates the problem description.
Only users with permission to update assignments for the course can perform this action.
Validates the provided problem ID and description before updating the problem description in the database.

### Parameters
- **request**: The request containing form data: problemId, description.

### Returns
- A success message if the problem description is updated successfully, or a fail response with an error message.

### Throws
- 400 - If the problem ID is invalid or the description is missing.
- 403 - If the user does not have permission to update the problem description.
- 500 - If there is a database update error.

## /[course]/assignment/[assignment]/[student_assignment]/problem_name

**Type:** form-action

**Method:** POST

**Description:**
Creates a new problem.
Only users with permission to update assignments for the course can perform this action.
Validates the provided problem name before inserting a new problem into the database.

### Parameters
- **request**: The request containing form data: problemName.

### Returns
- A success message if the new problem is created successfully, or a fail response with an error message.

### Throws
- 400 - If the problem name is missing.
- 403 - If the user does not have permission to create a problem.
- 500 - If there is a database insertion error.

## /[course]/assignment/[assignment]/[student_assignment]/delete_problem

**Type:** form-action

**Method:** POST

**Description:**
Deletes a problem.
Only users with permission to update assignments for the course can perform this action.
Validates the provided problem ID before deleting the problem from the database.

### Parameters
- **request**: The request containing form data: problemId.

### Returns
- A success message if the problem is deleted successfully, or a fail response with an error message.

### Throws
- 400 - If the problem ID is invalid or missing.
- 403 - If the user does not have permission to delete the problem.
- 500 - If there is a database deletion error.

## /[course]/assignment/[assignment]/[student_assignment]/save_problem

**Type:** form-action

**Method:** POST

**Description:**
Saves a problem's content to a file.
Only users with permission to update assignments for the course can perform this action.
Validates the provided problem ID and content before saving the content to a file.

### Parameters
- **request**: The request containing form data: problemId, content.

### Returns
- A success message if the problem content is saved to a file successfully, or a fail response with an error message.

### Throws
- 400 - If the problem ID or content is missing or invalid.
- 403 - If the user does not have permission to save the problem.
- 500 - If there is an error while saving the content to a file.

## /[course]/gradebook/edit_grades

**Type:** form-action

**Method:** POST

**Description:**
Edits grades for assignments in a course.
Only users with permission to change course grades can perform this action.
Validates the provided student IDs, assignment IDs, and grades before updating the grades in the database.

### Parameters
- **request**: The request containing form data: student_id, assignment_id, and grade.

### Returns
- A success message if the grades are updated successfully, or a fail response with an error message.

### Throws
- 400 - If the input data is mismatched or invalid.
- 403 - If the user does not have permission to edit the grades.
- 500 - If there is a database update error.

## /[course]/statements/add

**Type:** form-action

**Method:** POST

**Description:**
Adds a new statement and uploads a file to the server.
Validates the provided statement data and uploads the associated file to the server. A new record is added to the database for the statement.

### Parameters
- **request**: The request containing form data: statement_name, statement_type, statement_description, statement_category, and statement_file.

### Returns
- A success message if the statement is added and file is uploaded successfully, or a fail response with an error message.

### Throws
- 400 - If any required fields (statement_name, statement_type, statement_description, statement_category, or statement_file) are missing.
- 500 - If there is a database insertion error or file upload error.

## /[course]/statements/remove

**Type:** form-action

**Method:** POST

**Description:**
Removes a statement from the database and deletes the associated file.
Validates the provided statement ID, deletes the associated record from the database, and removes the file from the server.

### Parameters
- **request**: The request containing form data: statement_id.

### Returns
- A success message if the statement is removed and the file is deleted successfully, or a fail response with an error message.

### Throws
- 400 - If the statement ID is missing.
- 500 - If there is a database deletion error or file removal error.

## /[course]/users/add

**Type:** form-action

**Method:** POST

**Description:**
Adds a user to the course and assigns a role.
Validates the provided user ID and role, and adds the user to the course with the specified role. If the user is assigned the "student" role, their assignments for the course are also created.

### Parameters
- **request**: The request containing form data: user_id and role.

### Returns
- A success message if the user is successfully added to the course and assigned a role, or a fail response with an error message.

### Throws
- 400 - If the user ID or role is missing or if the user is already assigned a role.
- 403 - If the user does not have permission to update course users or the role is not valid for the user.
- 500 - If there is a database insertion error or error adding student assignments.

## /[course]/users/remove

**Type:** form-action

**Method:** POST

**Description:**
Removes a user from the course and deletes their assignments.
Validates the provided user ID and role, and removes the user from the course, deleting their assignments for the course if they are a student.

### Parameters
- **request**: The request containing form data: user_id and role.

### Returns
- A success message if the user is successfully removed from the course and their assignments are deleted, or a fail response with an error message.

### Throws
- 400 - If the user ID or role is missing.
- 403 - If the user does not have permission to update course users or the role is not valid for the user.
- 500 - If there is a database deletion error or error deleting student assignments.

## /login/default

**Type:** form-action

**Method:** POST

**Description:**
Handles the user login process.
Validates the username and password, checks for the existence of the user in the database,
and compares the provided password with the stored password hash. If the credentials are correct,
it creates a new session and sets a session cookie.

### Parameters
- **request**: The request containing form data: username, password.
- **cookies**: The cookies object for setting the session cookie.

### Returns
- A fail response with an error message if the credentials are invalid or if there are any errors during the process.

### Throws
- 400 - If the username or password is invalid.
- 500 - If there is an error querying the user in the database or during password verification.

## /admin/add

**Type:** form-action

**Method:** POST

**Description:**
Adds a new user to the system.
Only admin users can add new users. Validates username and password,
ensures required fields are present, and handles unique constraint violations.

### Parameters
- **request**: The request containing form data: username, password, first_name, last_name, email, is_admin.

### Returns
- A success message if the user is added, or a fail response with an error message.

### Throws
- 500 - If there is a database insertion error.

## /admin/remove

**Type:** form-action

**Method:** POST

**Description:**
Removes a user from the system.
Only admin users can remove users. Validates the provided user ID.

### Parameters
- **request**: The request containing form data: user_id.

### Returns
- A success message if the user is removed, or a fail response with an error message.

### Throws
- 500 - If there is a database deletion error.

## /admin/update_user

**Type:** form-action

**Method:** POST

**Description:**
Updates fields for an existing user.
Only admin users can update user fields. Validates the provided user ID and updates specified fields.
Prevents users from demoting themselves from admin status.

### Parameters
- **request**: The request containing form data: username, password, firstName, lastName, email, admin, userId.

### Returns
- Nothing if successful, or a fail response with an error message.

### Throws
- 500 - If there is a database update error.

## /admin/add_course

**Type:** form-action

**Method:** POST

**Description:**
Adds a new course to the system.
Only admin users can add courses. Ensures all fields are provided before insertion.

### Parameters
- **request**: The request containing form data: course_number, course_name, status, start_date, end_date.

### Returns
- A success message if the course is added, or a fail response with an error message.

### Throws
- 500 - If there is a database insertion error.

## /admin/remove_course

**Type:** form-action

**Method:** POST

**Description:**
Removes a course from the system.
Only admin users can remove courses. Validates the provided course ID.

### Parameters
- **request**: The request containing form data: course_id.

### Returns
- A success message if the course is removed, or a fail response with an error message.

### Throws
- 500 - If there is a database deletion error.

## /admin/update_course

**Type:** form-action

**Method:** POST

**Description:**
Updates fields for an existing course.
Only admin users can update course fields. Validates the provided course ID and ensures that at least one field is being updated.

### Parameters
- **request**: The request containing form data: courseNumber, courseName, status, startDate, endDate, courseId.

### Returns
- Nothing if successful, or a fail response with an error message.

### Throws
- 500 - If there is a database update error.

## /apiv2/complete_proof

**Type:** api

**Method:** undefined

**Description:**
Marks a student's proof as complete.
Updates the `complete` status for a specific proof in the database.
This also causes the trigger in database to update grade for the assignment.

### Parameters
- **request**: The request containing JSON body with `proofId` and `val` (completion status).

### Returns
- A JSON response confirming the update.

### Throws
- 500 - If the database update operation fails.

## /apiv2/load_proof

**Type:** api

**Method:** undefined

**Description:**
Loads or creates a student's proof file for a given problem.
- If `orig` is `true`, returns the original problem file content.
- If no `proofId` is provided, creates a new student proof entry.
- Attempts to load the student's proof file; if missing and editable, creates a blank file.

### Parameters
- **request**: The request containing JSON body with `proofId`, `problemId`, `studentAssignmentId`, and optional `orig`.

### Returns
- A JSON response containing the file content and `proofId`.

### Throws
- 400 - If proof creation fails due to a bad request.
- 500 - If reading or writing files fails, or if database queries fail.

## /apiv2/save_problem

**Type:** api

**Method:** undefined

**Description:**
Updates the content of a problem file.
Checks user permission to update assignments for the given course, verifies the problem exists,
and saves the new content to the problem's file.

### Parameters
- **request**: The request containing a JSON body with `courseId`, `problemId`, and `content`.

### Returns
- A JSON response confirming the proof was saved successfully.

### Throws
- 400 - If the problem ID is missing, invalid, or the problem does not exist.
- 403 - If the user does not have permission to update assignments.
- 500 - If there is a failure checking permissions or saving the file.

## /apiv2/save_proof

**Type:** api

**Method:** undefined

**Description:**
Saves a student's proof content.
Validates the provided proof ID, checks that the proof exists in the database,
and writes the provided content to the corresponding proof file.

### Parameters
- **request**: The request containing a JSON body with `proofId` and `content`.

### Returns
- A JSON response confirming that the proof was saved successfully.

### Throws
- 400 - If the proof ID is missing or invalid.
- 500 - If the proof does not exist in the database, or if writing to the file fails.

