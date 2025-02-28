INSERT INTO student_assignments (assignment_id, student_id, edit)
VALUES
    (
        (SELECT assignment_id FROM assignments WHERE assignment_name='Basic Propositions'),
        NULL,
        true
    ),
    (
        (SELECT assignment_id FROM assignments WHERE assignment_name='Basic Propositions'),
        (SELECT user_id FROM users WHERE username='marfung'),
        false
    ),
    (
        (SELECT assignment_id FROM assignments WHERE assignment_name='Basic Propositions'),
        (SELECT user_id FROM users WHERE username='lucian'),
        false
    );
