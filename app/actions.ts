"use server";
import { Pool } from "@neondatabase/serverless";

// Ensure DATABASE_URL is available.
if (!process.env.DATABASE_URL) {
    console.error("CRITICAL ERROR: DATABASE_URL is missing in process.env!");
}
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function getExecuteSql(query: string, params: any[] = []) {
    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

export async function getData() {
    const result = await pool.query('SELECT version()');
    return result.rows;
}
