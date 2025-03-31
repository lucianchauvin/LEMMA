/**
 * @fileoverview Database Type Definitions
 * 
 * This file defines TypeScript types used for database entities and permissions.
 * It includes user roles, courses, assignments, statements, and access control.
 * 
 * @module db-types
 */
export type UUID = string;

/** Status of a course in the system. */
export type CourseStatus = "active" | "inactive" | "archived";

/** Types of statements that can exist in the system. */
export type Statement = "tactic" | "definition" | "theorem" | "problem";

/** Permissions assigned to roles for controlling access within the system. */
export type Permission = 
  | "view_users" // targets role
  | "create_users"
  | "delete_users" // targets role
  | "update_users" // targets role

  | "view_courses" // all courses
  | "view_inactive_assigned_courses" // assigned
  | "view_archived_assigned_courses" // assigned
  
  | "view_course_users" // targets role
  | "update_course_users" // targets role (update who is assigned to course)

  | "create_courses"
  | "delete_courses"
  | "update_assigned_courses" // update in courses assigned to user

  // can always view
  | "create_readings"
  | "delete_readings"
  | "update_readings"
  | "view_inactive_assigned_course_readings"

  // can view active statements if active assignment or reading contains it
  // can view inactive statements if can view inactive assignment or reading containing it
  | "create_statements"
  | "update_statements"
  | "delete_statements"
  | "view_assigned_course_statements" // all statements in course including inactive

  | "create_assignments"
  | "delete_assignments"
  | "update_assignments" // update what is on the assignment and hide/unhide
  | "view_inactive_assigned_course_assignments"

  // can always view and update own student assignments 
  | "view_course_student_assignments"
  | "update_course_student_assignments" // instructors don't do this

  // can always view own grade and never update own grade
  | "view_course_grades"
  | "change_course_grades"

/** Represents a user in the system. */
export type User = {
    user_id: UUID,
    first_name?: string,
    last_name?: string,
    username: string,
    password: string,
    email: string,
    is_super_admin: boolean, // default true
    active: boolean // default false
}

/** Represents an active session for a user. */
export type Session = {
    session_id: string,
    user_id: UUID,
    expires_at: Date
}

/** Defines a permission flag, determining if a role can target another role. */
export type PermissionFlag = {
    name: Permission,
    targets_role: boolean
}

/** Defines which permissions a role has and, optionally, which role it can target. */
export type RolePermission = {
    role_name: string,
    permission_name: Permission
    target_role?: string
}

/** Defines the association of a user with a specific role in a course. */
export type UserRole = {
    user_role_id: UUID,
    user_id: UUID
    course_id: UUID,
    role_name: string
}

/** Represents a role in the system. */
export type Role = {
    role_name: string,
    display_name: string
}

/** Represents a course with associated metadata. */
export type Course = {
    course_id: UUID,
    course_number: string,
    course_name: string,
    status: CourseStatus,
    course_description?: string,
    start_date: Date,
    end_date: Date
}

/** Represents an assignment within a course. */
export type Assignment = {
    assignment_id: UUID,
    course_id: UUID,
    assignment_name: string,
    assignment_description?: string,
    active: boolean,
    due_date?: Date
}


/** Represents a reading assigned to a course. */
export type Reading = {
    reading_id: UUID,
    course_id: UUID,
    reading_name: string,
    reading_description?: string,
    active: boolean
}

/** Represents a problem linked to an assignment. */
export type Problem = {
    problem_id: UUID,
    assignment_id: UUID
}

/** Tracks student progress on an assignment. */
export type StudentAssignment = {
    student_assignment_id: UUID,
    assignment_id: UUID,
    student_id: UUID,
    edit: boolean,
    grade: number
}

/** Tracks student solutions to problems in assignments. */
export type StudentProof = {
    problem_id: UUID,
    student_assignment_id: UUID,
    complete: boolean,
    student_problem_filepath: string,
}

/** Represents a logical statement used in readings or problems. */
export type Statements = {
    statement_id: UUID,
    statement_name: string,
    statement_type: Statement,
    statement_description?: string,
    statement_filepath: string,
    statement_category?: string
}

/** Links a statement to a reading. */
export type ReadingStatement = {
    reading_id: UUID,
    statement_id: UUID
}


/** Links a statement to a problem. */
export type ProblemStatement = {
    problem_id: UUID,
    statement_id: UUID
}

/**
 * Represents a query result that ensures safety by either returning data or an error.
 * @template T The type of data expected in the query result.
 */
export type SafeQueryResult<T> = 
    | { data: T[]; error: null }
    | { data: null; error: string }
