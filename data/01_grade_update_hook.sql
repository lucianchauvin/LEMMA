CREATE OR REPLACE FUNCTION update_student_assignment_grade() 
RETURNS TRIGGER AS $$
DECLARE
  completed_proofs INT;
  total_problems INT;
  associated_assignment_id UUID;
BEGIN
  -- Get the assignment_id associated with the student_assignment
  SELECT pa.assignment_id INTO associated_assignment_id
  FROM problems pa
  JOIN student_assignments sa
    ON sa.assignment_id = pa.assignment_id
  WHERE sa.student_assignment_id = NEW.student_assignment_id;

  -- Count the number of completed proofs for the student in the given assignment
  SELECT COUNT(*) INTO completed_proofs
  FROM student_proofs sp
  JOIN student_assignments sa 
    ON sp.student_assignment_id = sa.student_assignment_id
  WHERE sa.student_assignment_id = NEW.student_assignment_id
  AND sp.complete = TRUE;

  -- Count the total number of problems for the assignment
  SELECT COUNT(*) INTO total_problems
  FROM problems pa
  WHERE pa.assignment_id = associated_assignment_id;

  -- Calculate and update the grade as (completed_proofs / total_problems) * 100
  IF total_problems > 0 THEN
    UPDATE student_assignments
    SET grade = (completed_proofs * 100.0 / total_problems)
    WHERE student_assignment_id = NEW.student_assignment_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on update of complete in student proofs
CREATE TRIGGER student_assignment_grade_update
AFTER UPDATE OF complete ON student_proofs
FOR EACH ROW
EXECUTE FUNCTION update_student_assignment_grade();
