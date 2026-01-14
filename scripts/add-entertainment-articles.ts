import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function addEntertainmentArticles() {
    try {
        console.log('Adding Entertainment articles...');

        const categories = await neonService.getCategories();
        const entertainmentCategory = categories.find(c => c.name === 'Entertainment');

        if (!entertainmentCategory) {
            console.error('Entertainment category not found!');
            return;
        }

        const articles = [
            {
                title: 'Award Season Heats Up: Predictions for This Year\'s Biggest Winners',
                slug: 'award-season-predictions-2026',
                excerpt: 'As award season approaches, industry insiders weigh in on the frontrunners for major categories across film, television, and music.',
                content: `
<h2>Film Categories Lead the Conversation</h2>
<p>This year's award season is shaping up to be one of the most competitive in recent memory, with several critically acclaimed films vying for top honors across multiple categories.</p>

<p>Industry analysts predict tight races in major categories, with no clear frontrunner emerging in the Best Picture category. The diversity of nominees reflects a broader shift in the entertainment industry toward more inclusive storytelling.</p>

<h2>Television's Golden Age Continues</h2>
<p>The television categories are equally competitive, with streaming platforms and traditional networks both fielding strong contenders. Limited series and drama categories are particularly crowded with quality programming.</p>

<p>Breakthrough performances from newcomers are challenging established stars, making predictions especially difficult this year.</p>

<h2>Music Industry Surprises</h2>
<p>The music categories feature unexpected nominees alongside established artists, reflecting the industry's evolving landscape. Genre-blending albums are receiving recognition across multiple categories.</p>

<p>Experts predict several upsets in major music categories, with younger artists challenging industry veterans for top honors.</p>
                `,
                coverImage: '/entertainment-awards-season.jpg',
                authorId: 'gg-entertainment-desk',
                authorName: 'Gossip Gazette Entertainment Desk',
                categoryId: entertainmentCategory.id,
                categoryName: entertainmentCategory.name,
                tags: ['Awards', 'Film', 'Television', 'Music', 'Entertainment'],
                status: 'published' as const,
                publishedAt: new Date().toISOString(),
                views: 0,
                source: 'Gossip Gazette Entertainment'
            },
            {
                title: 'Streaming Wars Intensify as Platforms Announce Major Content Deals',
                slug: 'streaming-wars-content-deals-2026',
                excerpt: 'Major streaming platforms unveil billion-dollar content investments, signaling continued competition for subscriber attention in the crowded marketplace.',
                content: `
<h2>Content is King</h2>
<p>The battle for streaming supremacy has entered a new phase, with major platforms announcing unprecedented investments in original content and exclusive licensing deals.</p>

<p>These moves come as subscriber growth slows across the industry, forcing platforms to compete more aggressively for viewer attention and loyalty.</p>

<h2>Exclusive Partnerships</h2>
<p>Several platforms have secured exclusive partnerships with major production studios and acclaimed creators, betting that premium content will differentiate them in an increasingly crowded market.</p>

<p>The deals include multi-year commitments for original series, films, and documentaries, with budgets rivaling traditional Hollywood productions.</p>

<h2>Impact on Traditional Media</h2>
<p>The streaming wars are reshaping the entire entertainment landscape, with traditional cable and broadcast networks adapting their strategies to compete with digital-first platforms.</p>

<p>Industry observers predict further consolidation as smaller players struggle to match the content spending of major platforms.</p>
                `,
                coverImage: '/entertainment-streaming-wars.jpg',
                authorId: 'gg-entertainment-desk',
                authorName: 'Gossip Gazette Entertainment Desk',
                categoryId: entertainmentCategory.id,
                categoryName: entertainmentCategory.name,
                tags: ['Streaming', 'Television', 'Content', 'Entertainment Industry'],
                status: 'published' as const,
                publishedAt: new Date(Date.now() - 86400000).toISOString(),
                views: 0,
                source: 'Gossip Gazette Entertainment'
            }
        ];

        for (const article of articles) {
            const created = await neonService.createArticle(article);
            console.log(`✅ Created: ${created.title}`);
        }

        console.log('\n✅ All Entertainment articles added successfully!');

    } catch (error) {
        console.error('❌ Error adding articles:', error);
    }
}

addEntertainmentArticles();
