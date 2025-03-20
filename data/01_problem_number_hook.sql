CREATE OR REPLACE FUNCTION update_problem_number()
RETURNS TRIGGER AS $$
DECLARE
    count INT;
BEGIN
    SELECT COALESCE(MAX(problem_number),-1) + 1 INTO count
    FROM problems
    WHERE assignment_id = NEW.assignment_id;

    NEW.problem_number := count;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_problem_number
BEFORE INSERT ON problems
FOR EACH ROW
EXECUTE FUNCTION update_problem_number();
