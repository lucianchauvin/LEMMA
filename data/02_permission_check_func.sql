CREATE OR REPLACE FUNCTION has_permission(
    user_uuid UUID,
    permission permission,
    course_uuid UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Super admins bypass all permission checks
    IF EXISTS (SELECT 1 FROM users WHERE user_id = user_uuid AND is_super_admin = TRUE) THEN
        RETURN TRUE;
    END IF;

    RETURN EXISTS (
        SELECT 1
        FROM user_roles ur
        JOIN role_permissions rp ON ur.role_name = rp.role_name
        WHERE ur.user_id = user_uuid
          AND ur.course_id = course_uuid
          AND rp.permission_name = permission
    );
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION get_target_roles_for_permission(
    user_uuid UUID,
    perm_name permission,
    course_uuid UUID
)
RETURNS TABLE(target_role VARCHAR) AS $$
BEGIN
    -- Super admin has access to all roles
    IF EXISTS (
        SELECT 1 FROM users
        WHERE user_id = user_uuid AND is_super_admin = TRUE
    ) THEN
        RETURN QUERY
        SELECT role_name FROM roles;
        RETURN;
    END IF;

    -- If the permission does not target roles, return nothing
    IF NOT EXISTS (
        SELECT 1 FROM permission_flags
        WHERE permission_name = perm_name AND targets_role = TRUE
    ) THEN
        RETURN;
    END IF;

    -- Return target roles the user has access to for the permission
    RETURN QUERY
    SELECT DISTINCT rp.target_role
    FROM user_roles ur
    JOIN role_permissions rp
      ON ur.role_name = rp.role_name
    WHERE ur.user_id = user_uuid
      AND ur.course_id = course_uuid
      AND rp.permission_name = perm_name
      AND rp.target_role IS NOT NULL;
END;
$$ LANGUAGE plpgsql STABLE;
