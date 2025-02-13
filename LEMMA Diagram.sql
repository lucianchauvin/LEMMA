CREATE TYPE "course_status" AS ENUM (
  'active',
  'inactive',
  'archived'
);

CREATE TYPE "assignment_status" AS ENUM (
  'active',
  'inactive'
);

CREATE TYPE "statement" AS ENUM (
  'tactic',
  'definition',
  'theorem',
  'problem'
);

CREATE TYPE "permission" AS ENUM (
  'view_admin_dashboard',
  'view_users',
  'create_users',
  'delete_users',
  'update_users',
  'view_active_courses',
  'view_inactive_courses',
  'view_archived_courses',
  'view_course_instructors',
  'view_course_users',
  'create_courses',
  'delete_courses',
  'update_course_users',
  'update_courses',
  'view_grade',
  'change_grade'
);

CREATE TABLE "users" (
  "user_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "first_name" varchar(50),
  "last_name" varchar(50),
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "is_super_admin" bool NOT NULL DEFAULT true,
  "active" bool NOT NULL DEFAULT false
);

CREATE TABLE "courses" (
  "course_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "course_number" varchar(10) NOT NULL,
  "course_name" varchar(100) NOT NULL,
  "status" course_status NOT NULL DEFAULT 'active',
  "description" varchar(1000),
  "start_date" timestamptz NOT NULL,
  "end_date" timestamptz NOT NULL
);

CREATE TABLE "assignments" (
  "assignment_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "course_id" uuid NOT NULL,
  "assignment_name" varchar(100) NOT NULL,
  "assignment_description" varchar(1000),
  "status" assignment_status NOT NULL,
  "due_date" timestamptz
);

CREATE TABLE "problems" (
  "problem_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "assignment_id" uuid NOT NULL
);

CREATE TABLE "statements" (
  "statement_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "statement_type" statement NOT NULL,
  "statement_description" varchar(1000),
  "statement_filepath" varchar(100) NOT NULL,
  "statement_category" varchar(100)
);

CREATE TABLE "student_assignments" (
  "student_assignment_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "assignment_id" uuid NOT NULL,
  "student_id" uuid NOT NULL,
  "grade" float
);

CREATE TABLE "student_problems" (
  "problem_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "student_assignment_id" uuid NOT NULL,
  "complete" bool NOT NULL DEFAULT false,
  "student_problem_filepath" varchar(1000)
);

CREATE TABLE "roles" (
  "name" varchar(100) PRIMARY KEY,
  "display_name" varchar(100) NOT NULL
);

CREATE TABLE "role_permissions" (
  "name" varchar(100) NOT NULL,
  "permission" permission NOT NULL,
  PRIMARY KEY ("name", "permission")
);

CREATE TABLE "user_roles" (
  "user_role_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "course_id" uuid,
  "role" varchar(100) NOT NULL
);

CREATE UNIQUE INDEX ON "user_roles" ("user_id", "course_id");

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("name") REFERENCES "roles" ("name");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE;

ALTER TABLE "user_roles" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("course_id") ON DELETE CASCADE;

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role") REFERENCES "roles" ("name") ON DELETE CASCADE;

ALTER TABLE "assignments" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("course_id") ON DELETE CASCADE;

ALTER TABLE "student_assignments" ADD FOREIGN KEY ("assignment_id") REFERENCES "assignments" ("assignment_id");

ALTER TABLE "student_assignments" ADD FOREIGN KEY ("student_id") REFERENCES "users" ("user_id") ON DELETE NONE;

ALTER TABLE "problems" ADD FOREIGN KEY ("problem_id") REFERENCES "assignments" ("assignment_id");

ALTER TABLE "student_problems" ADD FOREIGN KEY ("problem_id") REFERENCES "problems" ("problem_id");

ALTER TABLE "student_problems" ADD FOREIGN KEY ("student_assignment_id") REFERENCES "student_assignments" ("student_assignment_id");

ALTER TABLE "statements" ADD FOREIGN KEY ("statement_id") REFERENCES "problems" ("problem_id");
