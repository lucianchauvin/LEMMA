INSERT INTO problems (assignment_id, problem_name, problem_description)
VALUES
    (
        (SELECT assignment_id FROM assignments WHERE assignments.assignment_name='Basic Propositions'),
        'Simplify 1',
        'Simplifying a propositional statement'
    ),
    (
        (SELECT assignment_id FROM assignments WHERE assignments.assignment_name='Basic Propositions'),
        'Simplify 2',
        'Simplifying a propositional statement'
    ),
    (
        (SELECT assignment_id FROM assignments WHERE assignments.assignment_name='Induction'),
        'Triangle Formula',
        'Formula for determine the sum of consecutive numbers'
    );
