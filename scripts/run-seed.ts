import 'dotenv/config';
import { seedNeonDatabase } from '../services/seed-neon';

async function run() {
    await seedNeonDatabase();
}

run();
