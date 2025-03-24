

// import type { PageServerLoad } from './$types';
// import type { Course } from '$lib/types';
// import { error } from '@sveltejs/kit';

// // const colors = ["darkgreen", "maroon"];

// export const load: PageServerLoad = async ({locals: { safeQuery }}) => {
//     const {data: result, error: err} = await safeQuery<User>(`
//     SELECT
//         users.first_name,
//         users.last_name,
//         users.user_id,
//         users.email,
//         user_roles.role_name
//     FROM users
//     LEFT JOIN user_roles ON users.user_id = user_roles.user_id;
//     `);
//     if(err) {
//         console.error('ERROR: Database failed to query for users');
//         error(500, {message: 'Database failed to query for users'})
//     }
//     console.log(result);

//     // let i = 0;
//     // for(let course of result){
//     //     course.color = colors[i];
//     //     i++;
//     // }

//     return {
//         title: "Admin Panel Page",
//         users: result
//     };
// }

import { json} from '@sveltejs/kit';
export async function GET() {
    try {
        const result = await safeQuery<User>(`
        SELECT
            users.first_name,
            users.last_name,
            users.user_id,
            users.email,
            user_roles.role_name
        FROM users
        LEFT JOIN user_roles ON users.user_id = user_roles.user_id;
        `);
        console.log('Fetched users:', result.rows);
        return json(result.rows);
    } catch (error) {
        return json({ error: 'Database query failed'}, {status: 500});
    }
}