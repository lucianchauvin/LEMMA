INSERT INTO problems (assignment_id, problem_name, problem_description, problem_filepath)
VALUES
    (
        (SELECT assignment_id FROM assignments WHERE assignments.assignment_name='Basic Propositions'),
        'Simplify 1',
        'Simplifying a propositional statement',
        '/path/to/example/problem'
    );
