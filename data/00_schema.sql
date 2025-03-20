CREATE TYPE "course_status" AS ENUM (
  'active',
  'inactive',
  'archived'
);

CREATE TYPE "statement" AS ENUM (
  'tactic',
  'definition',
  'theorem'
);

CREATE TYPE "permission" AS ENUM (
  'view_users',
  'create_users',
  'delete_users',
  'update_users',
  'view_courses',
  'view_inactive_assigned_courses',
  'view_archived_assigned_courses',
  'view_course_users',
  'update_course_users',
  'create_courses',
  'delete_courses',
  'update_assigned_courses',
  'create_readings',
  'update_readings',
  'delete_readings',
  'view_inactive_assigned_course_readings',
  'create_statements',
  'update_statements',
  'delete_statements',
  'view_assigned_course_statements',
  'create_assignments',
  'update_assignments',
  'delete_assignments',
  'view_inactive_assigned_course_assignments',
  'view_course_student_assignments',
  'update_course_student_assignments',
  'view_course_grades',
  'change_course_grades'
);

CREATE TABLE "sessions" (
  "session_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid UNIQUE NOT NULL,
  "expires_at" timestamptz NOT NULL DEFAULT (now() + interval '7 days')
);

CREATE TABLE "users" (
  "user_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "first_name" varchar(50),
  "last_name" varchar(50),
  "username" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "is_super_admin" bool NOT NULL DEFAULT false,
  "active" bool NOT NULL DEFAULT false
);

CREATE TABLE "courses" (
  "course_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "course_number" varchar(10) NOT NULL,
  "course_name" varchar(100) NOT NULL,
  "status" course_status NOT NULL DEFAULT 'active',
  "course_description" text,
  "start_date" timestamptz NOT NULL,
  "end_date" timestamptz NOT NULL
);

CREATE TABLE "assignments" (
  "assignment_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "course_id" uuid NOT NULL,
  "assignment_name" varchar(100) NOT NULL,
  "assignment_description" varchar(1000),
  "active" boolean NOT NULL DEFAULT false,
  "due_date" timestamptz
);

CREATE TABLE "readings" (
  "reading_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "course_id" uuid NOT NULL,
  "reading_name" varchar(100) NOT NULL,
  "reading_description" text,
  "active" boolean NOT NULL
);

CREATE TABLE "reading_statements" (
  "reading_id" uuid NOT NULL,
  "statement_id" uuid NOT NULL
);

CREATE TABLE "problems" (
  "problem_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "assignment_id" uuid NOT NULL,
  "problem_name" varchar(100) NOT NULL,
  "problem_description" text,
  "problem_filepath" text NOT NULL,
  "problem_number" smallint NOT NULL DEFAULT 0
);

CREATE TABLE "problem_statements" (
  "problem_id" uuid NOT NULL,
  "statement_id" uuid NOT NULL
);

CREATE TABLE "statements" (
  "statement_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "statement_name" varchar(100) NOT NULL,
  "statement_type" statement NOT NULL,
  "statement_description" text,
  "statement_filepath" text NOT NULL,
  "statement_category" varchar(100)
);

CREATE TABLE "student_assignments" (
  "student_assignment_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "assignment_id" uuid NOT NULL,
  "student_id" uuid,
  "edit" boolean NOT NULL DEFAULT false,
  "grade" float NOT NULL DEFAULT 0
);

CREATE TABLE "student_proofs" (
  "proof_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "problem_id" uuid NOT NULL,
  "student_assignment_id" uuid NOT NULL,
  "complete" bool NOT NULL DEFAULT false,
  "proof_filepath" text NOT NULL
);

CREATE TABLE "roles" (
  "role_name" varchar(100) PRIMARY KEY,
  "display_name" varchar(100) NOT NULL
);

CREATE TABLE "permission_flags" (
  "permission_name" permission PRIMARY KEY,
  "targets_role" boolean NOT NULL
);

CREATE TABLE "role_permissions" (
  "role_name" varchar(100) NOT NULL,
  "permission_name" permission NOT NULL,
  "target_role" varchar(100),
  PRIMARY KEY ("role_name", "permission_name", "target_role")
);

CREATE TABLE "user_roles" (
  "user_role_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "course_id" uuid NOT NULL,
  "role_name" varchar(100) NOT NULL
);

CREATE UNIQUE INDEX ON "reading_statements" ("reading_id", "statement_id");

CREATE UNIQUE INDEX ON "problems" ("assignment_id", "problem_number");

CREATE UNIQUE INDEX ON "problem_statements" ("problem_id", "statement_id");

CREATE UNIQUE INDEX ON "user_roles" ("user_id", "course_id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE;

ALTER TABLE "user_roles" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("course_id") ON DELETE CASCADE;

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role_name") REFERENCES "roles" ("role_name") ON DELETE CASCADE;

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("permission_name") REFERENCES "permission_flags" ("permission_name") ON DELETE RESTRICT;

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("role_name") REFERENCES "roles" ("role_name") ON DELETE CASCADE;

ALTER TABLE "assignments" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("course_id") ON DELETE CASCADE;

ALTER TABLE "readings" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("course_id") ON DELETE CASCADE;

ALTER TABLE "reading_statements" ADD FOREIGN KEY ("statement_id") REFERENCES "statements" ("statement_id");

ALTER TABLE "reading_statements" ADD FOREIGN KEY ("reading_id") REFERENCES "readings" ("reading_id") ON DELETE CASCADE;

ALTER TABLE "student_assignments" ADD FOREIGN KEY ("assignment_id") REFERENCES "assignments" ("assignment_id") ON DELETE CASCADE;

ALTER TABLE "student_assignments" ADD FOREIGN KEY ("student_id") REFERENCES "users" ("user_id");

ALTER TABLE "problems" ADD FOREIGN KEY ("assignment_id") REFERENCES "assignments" ("assignment_id") ON DELETE CASCADE;

ALTER TABLE "student_proofs" ADD FOREIGN KEY ("problem_id") REFERENCES "problems" ("problem_id") ON DELETE CASCADE;

ALTER TABLE "student_proofs" ADD FOREIGN KEY ("student_assignment_id") REFERENCES "student_assignments" ("student_assignment_id") ON DELETE CASCADE;

ALTER TABLE "problem_statements" ADD FOREIGN KEY ("statement_id") REFERENCES "statements" ("statement_id");

ALTER TABLE "problem_statements" ADD FOREIGN KEY ("problem_id") REFERENCES "problems" ("problem_id") ON DELETE CASCADE;

ALTER TABLE "sessions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
