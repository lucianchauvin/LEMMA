import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

const colors = ["darkgreen", "maroon"];

export const load: PageServerLoad = async ({locals: { database }}) => {
    let result;
    try {
        result = await database.query("SELECT * FROM courses")
    } catch (err) {
        console.error('Database failed to query for courses:', err);
        error(500, {message: 'Database failed to query for courses'})
    }

    if(!result) {
        console.error('Database failed to query for courses')
        error(500, {message: 'Database failed to query for courses'})
    }

    let i = 0;
    for(let course of result.rows){
        course.color = colors[i];
        i++;
    }

    return {
        title: "Home Page",
        courses: result.rows
    };
}
