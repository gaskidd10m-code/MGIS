import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seedSettings() {
    try {
        console.log('Seeding settings...');
        const defaultTicker = '🔴 LIVE: Global markets rally as tech sector booms • Historic climate treaty signed in Geneva • Local cat stuck in tree actually fine, just wanted a view •';

        await pool.query(`
            INSERT INTO settings (key, value) 
            VALUES ('ticker_text', $1) 
            ON CONFLICT (key) DO UPDATE SET value = $1
        `, [defaultTicker]);

        console.log('Settings seeded successfully!');
    } catch (error) {
        console.error('Failed to seed settings:', error);
    } finally {
        await pool.end();
    }
}

seedSettings();
