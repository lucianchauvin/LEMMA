INSERT INTO assignments (course_id, assignment_name, assignment_description, active, due_date)
VALUES
    (
        (SELECT course_id FROM courses WHERE course_number='CSCE222'),
        'Basic Propositions',
        'Proving simple propositional statements are equal or not equal using basic propositional rules',
        true,
        '2025-12-31 12:00:00-06' -- not due
    ),
    (
        (SELECT course_id FROM courses WHERE course_number='CSCE222'),
        'Induction',
        'Proving simple statements are true through induction',
        false, -- not active
        '2025-12-31 12:00:00-06' -- not due
    ),
    (
        (SELECT course_id FROM courses WHERE course_number='CSCE222'),
        'Basics of LEAN',
        'Learning the basics of lean with Paino Axioms to prove 2 + 2 = 4',
        true, 
        '2024-12-31 12:00:00-06' -- past due date
    );

