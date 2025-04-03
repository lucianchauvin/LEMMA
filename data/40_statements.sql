INSERT INTO statements (statement_name, statement_type, statement_description, statement_category)
VALUES
    (
        'rw',
        'tactic',
        'If h is a proof of an equality X = Y, then rw [h] will change all Xs in the goal to Ys. It''s the way to "substitute in".',
        'logic'
    ),
    (
        'dist_and_or',
        'theorem',
        'Distributing and over or',
        'logic'
    ),
    (
        'dist_or_and',
        'theorem',
        'Distributing or over and',
        'logic'
    ),
    (
        'de_morgan',
        'theorem',
        'De Morgan''s Law',
        'logic'
    ),
    (
        'Prop',
        'definition',
        'Proposition that can either true or false',
        'logic'
    );


