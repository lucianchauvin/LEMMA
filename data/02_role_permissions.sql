INSERT INTO role_permissions (role_name, permission_name, target_role)
VALUES
    ('instructor', 'view_users', 'NULL'), -- need to see all users to be able to add them to the course

    ('instructor', 'view_course_users', 'instructor'), 
    ('instructor', 'view_course_users', 'student'), 
    ('instructor', 'update_course_users', 'student'), -- set users to be student of the course instructor is assigned to

    ('instructor', 'update_assigned_courses', 'NULL'), -- can edit the course instructor is assigned to

    ('instructor', 'create_readings', 'NULL'), 
    ('instructor', 'update_readings', 'NULL'), 
    ('instructor', 'delete_readings', 'NULL'), 
    ('instructor', 'view_inactive_assigned_course_readings', 'NULL'), 

    ('instructor', 'create_statements', 'NULL'), 
    ('instructor', 'update_statements', 'NULL'), 
    ('instructor', 'delete_statements', 'NULL'), 
    ('instructor', 'view_assigned_course_statements', 'NULL'), 

    ('instructor', 'create_assignments', 'NULL'), 
    ('instructor', 'update_assignments', 'NULL'), 
    ('instructor', 'delete_assignments', 'NULL'), 
    ('instructor', 'view_inactive_assigned_course_assignments', 'NULL'), 

    ('instructor', 'view_course_student_assignments', 'NULL'), -- instructor can see all student assignments
    ('instructor', 'update_course_student_assignments', 'NULL'), -- instructor can edit the code written by student

    ('instructor', 'view_course_grades', 'NULL'), -- can view all grades for course
    ('instructor', 'change_course_grades', 'NULL'), -- can change the grade for students

    ('student', 'view_course_users', 'instructor'); -- can see the instructor of the course
