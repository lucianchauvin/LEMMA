DROP SCHEMA lemma CASCADE;
CREATE SCHEMA lemma;

\i 00_schema.sql
\i 01_role_targets.sql
\i 01_roles.sql
\i 02_role_permissions.sql
\i 50_courses.sql

