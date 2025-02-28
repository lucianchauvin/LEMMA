INSERT INTO readings (course_id, reading_name, reading_description, active)
VALUES
    (
        (SELECT course_id FROM courses WHERE course_number='CSCE222'),
        'Propositional Rules',
        'Proofs of the basic propositional rules such as commutativity, De Morgan''s Law',
        true
    ),
    (
        (SELECT course_id FROM courses WHERE course_number='CSCE222'),
        'Induction',
        'Description of induction and Well-Ordering Principle and example of induction proofs',
        false -- not active
    );

