import type { PageServerLoad } from './$types';
import type { Course } from '$lib/types';
import { error } from '@sveltejs/kit';

const colors = ["darkgreen", "maroon"];

export const load: PageServerLoad = async ({locals: { safeQuery }}) => {
    const {data: result, error: err} = await safeQuery<Course>(`
        SELECT
            courses.course_id,
            courses.course_name,
            courses.*,
            assignments.assignment_id,
            assignments.assignment_name,
            assignments.*,
            assignments.due_date
        FROM courses
        LEFT JOIN assignments ON courses.course_id = assignments.course_id
        ORDER BY courses.course_id, assignments.due_date;
    `);
    if(err) {
        console.error('ERROR: Database failed to query for courses');
        error(500, {message: 'Database failed to query for courses'})
    }

    let i = 0;
    for(let course of result){
        course.color = colors[i];
        i++;
    }

    return {
        title: "Home Page",
        courses: result
    };
}
