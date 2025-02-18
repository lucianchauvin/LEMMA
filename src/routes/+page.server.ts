import type { PageServerLoad } from './$types';

const colors = ["darkgreen", "maroon"];

export const load: PageServerLoad = async ({locals: { database }}) => {
    const result = await database.query("SELECT * FROM courses");

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
