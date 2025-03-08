INSERT INTO user_roles (user_id, course_id, role_name)
VALUES
    (
        (SELECT user_id FROM users WHERE username='thedoctor'),
        (SELECT course_id FROM courses WHERE course_number='CSCE222'),
        'instructor'
    ),
    (
        (SELECT user_id FROM users WHERE username='marfung'),
        (SELECT course_id FROM courses WHERE course_number='CSCE222'),
        'student'
    ),
    (
        (SELECT user_id FROM users WHERE username='lucian'),
        (SELECT course_id FROM courses WHERE course_number='CSCE222'),
        'student'
    );
