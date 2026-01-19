
import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function listRecent() {
    try {
        const res = await pool.query('SELECT title, slug, published_at FROM articles ORDER BY published_at DESC LIMIT 10');
        console.log("--- RECENT ARTICLES ---");
        res.rows.forEach(r => {
            console.log(`[${r.published_at}] ${r.title}`);
        });
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

listRecent();
