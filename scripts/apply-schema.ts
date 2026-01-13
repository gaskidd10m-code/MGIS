import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function applySchema() {
    try {
        const schemaPath = path.join(process.cwd(), 'sql', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Applying schema...');
        await pool.query(schemaSql);
        console.log('Schema applied successfully!');
    } catch (error) {
        console.error('Failed to apply schema:', error);
    } finally {
        await pool.end();
    }
}

applySchema();
