INSERT INTO statements (statement_name, statement_type, statement_description, statement_filepath, statement_category)
VALUES
    (
        'rw',
        'tactic',
        'If h is a proof of an equality X = Y, then rw [h] will change all Xs in the goal to Ys. It''s the way to "substitute in".',
        '/path/to/example/statement',
        'logic'
    ),
    (
        'dist_and_or',
        'theorem',
        'Distributing and over or',
        '/path/to/example/statement',
        'logic'
    ),
    (
        'dist_or_and',
        'theorem',
        'Distributing or over and',
        '/path/to/example/statement',
        'logic'
    ),
    (
        'de_morgan',
        'theorem',
        'De Morgan''s Law',
        '/path/to/example/statement',
        'logic'
    ),
    (
        'Prop',
        'definition',
        'Proposition that can either true or false',
        '/path/to/example/statement',
        'logic'
    );


