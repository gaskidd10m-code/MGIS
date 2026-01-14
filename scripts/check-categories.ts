import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function checkCategories() {
    try {
        console.log('Checking categories and articles...\n');

        // Get all categories
        const categories = await neonService.getCategories();
        console.log('Categories in database:');
        categories.forEach(cat => {
            console.log(`  - ${cat.name} (ID: ${cat.id})`);
        });

        console.log('\nArticles by category:');
        for (const cat of categories) {
            const articles = await neonService.getArticlesByCategory(cat.id);
            console.log(`  ${cat.name}: ${articles.length} articles`);
            if (articles.length > 0) {
                articles.forEach(a => console.log(`    - ${a.title}`));
            }
        }

        // Get all articles
        const allArticles = await neonService.getArticles();
        console.log(`\nTotal articles: ${allArticles.length}`);

    } catch (error) {
        console.error('Error:', error);
    }
}

checkCategories();
