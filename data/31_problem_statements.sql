INSERT INTO problem_statements (problem_id, statement_id)
VALUES
    (
        (SELECT problem_id FROM problems WHERE problems.problem_name='Simplify 1'),
        (SELECT statement_id FROM statements WHERE statements.statement_name='dist_and_or')
    ),
    (
        (SELECT problem_id FROM problems WHERE problems.problem_name='Simplify 1'),
        (SELECT statement_id FROM statements WHERE statements.statement_name='dist_or_and')
    ),
    (
        (SELECT problem_id FROM problems WHERE problems.problem_name='Simplify 1'),
        (SELECT statement_id FROM statements WHERE statements.statement_name='de_morgan')
    );
