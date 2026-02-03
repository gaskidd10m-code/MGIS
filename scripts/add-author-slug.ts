import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function addAuthorSlug() {
    try {
        console.log('🔄 Adding author_slug column to articles table...');

        await pool.query(`
            ALTER TABLE articles 
            ADD COLUMN IF NOT EXISTS author_slug TEXT;
        `);

        console.log('✅ Column author_slug added successfully (or already exists).');

        // Verify column exists
        const result = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'articles' AND column_name = 'author_slug';
        `);

        if (result.rows.length > 0) {
            console.log('✅ Verification confirmed: author_slug column is present.');
        } else {
            console.error('❌ Verification failed: author_slug column NOT found.');
        }

    } catch (error) {
        console.error('❌ Error adding column:', error);
    } finally {
        await pool.end();
    }
}

addAuthorSlug();
