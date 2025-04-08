import type { PageServerLoad } from './$types';
import type { Course } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({locals: { safeQuery }}) => {
    const {data: result, error: err} = await safeQuery<Course>(`
        SELECT
            courses.course_id,
            courses.course_name,
            courses.course_number,
            courses.status,
            courses.course_description,
            courses.start_date,
            courses.end_date,
            assignments.assignment_id,
            assignments.assignment_name,
            assignments.assignment_description,
            assignments.active,
            assignments.due_date
        FROM courses
        LEFT JOIN assignments ON courses.course_id = assignments.course_id
        ORDER BY courses.course_id, assignments.due_date;
    `);

    if(err) {
        console.error('ERROR: Database failed to query for courses');
        error(500, {message: 'Database failed to query for courses'})
    }

    const courseMap = new Map();
    const colors = ["darkgreen", "maroon", "navy", "teal", "purple"];
    let colorIndex = 0;

    for (const row of result) {
        if (!row.course_id) continue;

        if (!courseMap.has(row.course_id)) {
            courseMap.set(row.course_id, {
                course_id: row.course_id,
                course_name: row.course_name,
                course_number: row.course_number,
                status: row.status,
                course_desciption: row.course_description,
                start_date: row.start_date,
                end_date: row.end_date,
                color: colors[colorIndex++ % colors.length],
                assignments: []
            });
        }

        if (row.assignment_id) {
            courseMap.get(row.course_id).assignments.push({
                assignment_id: row.assignment_id,
                assignment_name: row.assignment_name,
                assignment_description: row.assignment_description,
                active: row.active,
                due_date: row.due_date
            });
        }
    }

    const structuredCourses = Array.from(courseMap.values());

    return {
        title: "Home Page",
        courses: structuredCourses
    };
}
