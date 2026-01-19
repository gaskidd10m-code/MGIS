
import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function verify() {
    try {
        const titles = [
            "The 10 Richest People in Tech: 2026 Edition",
            "Why Everyone is Moving to Nebraska (And It's Not For the Corn)",
            "New Diet Trend: Eating Air? The Dangerous Rise of 'Breatharianism' 2.0",
            "Global Election Results 2026: A Shift Toward Hyper-Localization",
            "Your Smart Toaster is Unionizing: The Absurd Reality of AI Appliances"
        ];

        console.log("Checking for articles...");

        for (const title of titles) {
            const res = await pool.query('SELECT id, title, category_name FROM articles WHERE title = $1', [title]);
            if (res.rows.length > 0) {
                console.log(`[FOUND] ${title} (Category: ${res.rows[0].category_name})`);
            } else {
                console.log(`[MISSING] ${title}`);
            }
        }

        // Check total count
        const count = await pool.query('SELECT COUNT(*) FROM articles');
        console.log(`Total articles in DB: ${count.rows[0].count}`);

    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

verify();
