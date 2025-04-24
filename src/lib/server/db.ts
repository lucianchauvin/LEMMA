/**
 * @fileoverview Database Connection Module
 * 
 * This module sets up a connection to the PostgreSQL database using the `pg` library
 * and initializes a connection pool for managing database connections.
 * 
 * @module db-connection
 */
import pg from 'pg';
import { PGUSER, PGDATABASE, PGPASSWORD, PGPORT } from '$env/static/private';

/**
 * @fileoverview Database Connection Module
 * 
 * This module sets up the connection to the PostgreSQL database using the `pg` library 
 * and creates a pool for managing multiple database connections.
 * 
 * @module db-connection
 */

// const PGHOST = fs.readFileSync('/data/IP', 'utf-8').trim();
const PGHOST = "18.225.72.236";

/**
 * Creates a Postgres client pool for managing connections to the PostgreSQL database.
 * The pool manages multiple client connections and reuses them to optimize database access.
 *
 * @constant
 * @type {pg.Pool}
 * @property {string} host - The IP address or hostname of the PostgreSQL server.
 * @property {string} user - The username for authentication to the database.
 * @property {string} password - The password used for authentication, decoded from base64.
 * @property {number} port - The port on which the PostgreSQL server is listening.
 * @property {number} connectionTimeoutMillis - The timeout duration (in milliseconds) for establishing a connection to the server.
 * 
 */
export const pool = new pg.Pool({
    host: PGHOST,
    user: PGUSER,
    password: Buffer.from(PGPASSWORD, 'base64').toString('utf-8').trim().replace(/(\r\n|\n|\r)/gm, ""),
    port: parseInt(PGPORT),
    connectionTimeoutMillis: 5000, // 5 sec timeout
})
