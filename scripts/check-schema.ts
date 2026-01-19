
import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkSchema() {
    try {
        const res = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'articles'
    `);
        console.log("COLUMNS:");
        res.rows.forEach(r => console.log(r.column_name));
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

checkSchema();
