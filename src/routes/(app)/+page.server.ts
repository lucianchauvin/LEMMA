import type { PageServerLoad } from './$types';
import type { Course } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';

const colors = ["darkgreen", "maroon"];

export const load: PageServerLoad = async ({locals: { safeQuery, getSession }}) => {
    const {user} = await getSession();

    // if not logged in redirect to login page
    if (!user) redirect(302, "/login");

    // get courses
    const {data: result, error: err} = await safeQuery<Course>('SELECT * FROM courses');
    if(err) {
        console.error('ERROR: Database failed to query for courses:', err);
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
