INSERT INTO problem_statements (problem_id, statement_id)
VALUES
    (
        (SELECT problem_id FROM problems LIMIT 1),
        (SELECT statement_id FROM statements WHERE statements.name='dist_and_or')
    ),
    (
        (SELECT problem_id FROM problems LIMIT 1),
        (SELECT statement_id FROM statements WHERE statements.name='dist_or_and')
    ),
    (
        (SELECT problem_id FROM problems LIMIT 1),
        (SELECT statement_id FROM statements WHERE statements.name='de_morgan')
    );
