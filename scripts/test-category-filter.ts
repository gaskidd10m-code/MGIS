import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function testCategoryFilter() {
    try {
        // Get first category
        const cats = await pool.query('SELECT id, name FROM categories LIMIT 1');
        const testCat = cats.rows[0];

        console.log(`Testing category: ${testCat.name} (${testCat.id})\n`);

        // Get articles for this category
        const articles = await pool.query(
            'SELECT id, title, category_id, category_name FROM articles WHERE category_id = $1',
            [testCat.id]
        );

        console.log(`Found ${articles.rows.length} articles:`);
        articles.rows.forEach(a => {
            console.log(`  - ${a.title}`);
            console.log(`    category_id: ${a.category_id}`);
            console.log(`    category_name: ${a.category_name}`);
        });

        await pool.end();
    } catch (error) {
        console.error('Error:', error);
        await pool.end();
    }
}

testCategoryFilter();
