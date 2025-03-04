INSERT INTO reading_statements (reading_id, statement_id)
VALUES
    (
        (SELECT reading_id FROM readings WHERE readings.reading_name='Propositional Rules'),
        (SELECT statement_id FROM statements WHERE statements.statement_name='dist_and_or')
    ),
    (
        (SELECT reading_id FROM readings WHERE readings.reading_name='Propositional Rules'),
        (SELECT statement_id FROM statements WHERE statements.statement_name='dist_or_and')
    ),
    (
        (SELECT reading_id FROM readings WHERE readings.reading_name='Propositional Rules'),
        (SELECT statement_id FROM statements WHERE statements.statement_name='de_morgan')
    );
