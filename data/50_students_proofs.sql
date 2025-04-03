INSERT INTO student_proofs (problem_id, student_assignment_id, complete)
VALUES
    (
        (SELECT problem_id FROM problems WHERE problems.problem_name='Simplify 1'),
        (SELECT student_assignment_id FROM student_assignments WHERE student_assignments.assignment_id=(
            SELECT assignment_id FROM assignments WHERE assignments.assignment_name='Basic Propositions'
        ) AND student_assignments.student_id=(
            SELECT user_id FROM users WHERE users.username='marfung'
        )),
        true
    ),
    (
        (SELECT problem_id FROM problems WHERE problems.problem_name='Simplify 2'),
        (SELECT student_assignment_id FROM student_assignments WHERE student_assignments.assignment_id=(
            SELECT assignment_id FROM assignments WHERE assignments.assignment_name='Basic Propositions'
        ) AND student_assignments.student_id=(
            SELECT user_id FROM users WHERE users.username='marfung'
        )),
        false
    ),
    (
        (SELECT problem_id FROM problems WHERE problems.problem_name='Simplify 1'),
        (SELECT student_assignment_id FROM student_assignments WHERE student_assignments.assignment_id=(
            SELECT assignment_id FROM assignments WHERE assignments.assignment_name='Basic Propositions'
        ) AND student_assignments.student_id=(
            SELECT user_id FROM users WHERE users.username='lucian'
        )),
        false
    );
