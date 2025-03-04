INSERT INTO student_proofs (problem_id, student_assignment_id, student_problem_filepath)
VALUES
    (
        (SELECT problem_id FROM readings LIMIT readings.name='Propositional Rules'),
        (SELECT statement_id FROM statements WHERE statements.name='dist_and_or')
    ),
    (
        (SELECT reading_id FROM readings LIMIT readings.name='Propositional Rules'),
        (SELECT statement_id FROM statements WHERE statements.name='dist_or_and')
    ),
    (
        (SELECT reading_id FROM readings LIMIT readings.name='Propositional Rules'),
        (SELECT statement_id FROM statements WHERE statements.name='de_morgan')
    );
