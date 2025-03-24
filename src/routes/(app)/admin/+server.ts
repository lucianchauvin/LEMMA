

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

import dotenv from 'dotenv';
dotenv.config();
import { json} from '@sveltejs/kit';
import pg from 'pg';

const { Pool } = pg;

const encodedPassword = process.env.PGPASSWORD;
const decodedPassword = encodedPassword ? Buffer.from(encodedPassword, 'base64').toString('utf-8').trim() : '';
const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: decodedPassword,
    port: parseInt(process.env.PGPORT!),
});

console.log('Database connection settings:', {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: decodedPassword,
    port: process.env.PGPORT
});

export async function GET() {
    console.log('[API] received GET request at /components/data');
    try {
        console.log('[API] running database query...');

        const { rows } = await pool.query(`
        SELECT
            users.first_name,
            users.last_name,
            users.user_id,
            users.email,
            user_roles.role_name
        FROM users
        LEFT JOIN user_roles ON users.user_id = user_roles.user_id;
        `);
        console.log('Fetched users:', rows);
        return json(rows);
    } catch (error) {
        console.error('[API] Databse query failed:', error);
        return json({ error: 'Database query failed'}, {status: 500});
    }
}