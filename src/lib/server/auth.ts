/**
 * @fileoverview Authentication Module
 * 
 * This module handles user authentication using Lucia and Drizzle ORM. It configures
 * the session management and user tables for the authentication process and sets
 * up cookies for session persistence.
 * 
 * @module authentication
 */
import { Lucia } from "lucia";
import { dev } from "$app/environment";

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { pool } from "./db";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";

/** Database connection instance */
const db = drizzle(pool);

/**
 * Defines the users table schema.
 * @constant {object}
 */
const userTable = pgTable("users", {
    id: text("user_id").primaryKey(),
});

/**
 * Defines the sessions table schema.
 * @constant {object}
 */
const sessionTable = pgTable("sessions", {
    /** Unique session ID */
    id: text("session_id").primaryKey(),

    /**
     * Foreign key referencing user ID
     * @property {string}
     */
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    /**
     * Expiration timestamp for session
     * @property {Date}
     */
    expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date"
    }).notNull()
});

/**
 * Adapter instance for Lucia authentication using Drizzle ORM.
 * @constant {DrizzlePostgreSQLAdapter}
 */
const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

/**
 * Lucia authentication instance.
 * @constant {Lucia}
 */
export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            /**
             * Sets secure cookies based on environment (HTTPS in production).
             * @property {boolean}
             */
            secure: !dev
        }
    },
    /**
     * Retrieves user attributes from the database.
     * @param {DatabaseUserAttributes} attributes - The user attributes from the database.
     * @returns {{username: string}} - The extracted username.
     */
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username
        };
    }
});


/**
 * Module augmentation for Lucia.
 * Declares additional types for Lucia authentication.
 */
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

/**
 * Interface defining user attributes stored in the database.
 * @interface DatabaseUserAttributes
 */
interface DatabaseUserAttributes {
    /** @property {string} username - The username of the user. */
    username: string;
}
