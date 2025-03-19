INSERT INTO roles (role_name, display_name)
VALUES
    ('instructor', 'Instructor'),
    ('student', 'Student')
ON CONFLICT (role_name) DO NOTHING;
