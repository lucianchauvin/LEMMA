INSERT INTO problems (assignment_id)
VALUES
    (
        (SELECT assignment_id FROM assignments WHERE assignments.assignment_name='Basic Propositions')
    );
