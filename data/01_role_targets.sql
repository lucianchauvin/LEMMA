INSERT INTO permission_flags (permission_name, targets_role)
VALUES 
    ('view_users', FALSE),
    ('create_users', FALSE),
    ('delete_users', FALSE),
    ('update_users', FALSE),

    ('view_courses', FALSE),
    ('view_inactive_assigned_courses', FALSE),
    ('view_archived_assigned_courses', FALSE),

    ('view_course_users', TRUE),
    ('update_course_users', TRUE),

    ('create_courses', FALSE),
    ('delete_courses', FALSE),
    ('update_assigned_courses', FALSE),

    ('create_readings', FALSE),
    ('delete_readings', FALSE),
    ('update_readings', FALSE),
    ('view_inactive_assigned_course_readings', FALSE),

    ('create_statements', FALSE),
    ('update_statements', FALSE),
    ('delete_statements', FALSE),
    ('view_assigned_course_statements', FALSE),

    ('create_assignments', FALSE),
    ('delete_assignments', FALSE),
    ('update_assignments', FALSE),
    ('view_inactive_assigned_course_assignments', FALSE),

    ('view_course_student_assignments', FALSE),
    ('update_course_student_assignments', FALSE),

    ('view_course_grades', FALSE),
    ('change_course_grades', FALSE)
ON CONFLICT (permission_name) DO UPDATE 
SET targets_role = EXCLUDED.targets_role;
