INSERT INTO reading_statements (reading_id, statement_id)
VALUES
    (
        (SELECT reading_id FROM readings LIMIT readings.name='Propositional Rules'),
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
