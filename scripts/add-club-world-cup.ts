import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function addClubWorldCupArticle() {
    try {
        console.log('Adding Club World Cup article...');

        // Get Sports category
        const categories = await neonService.getCategories();
        const sportsCategory = categories.find(c => c.name === 'Sports');

        if (!sportsCategory) {
            console.error('Sports category not found!');
            return;
        }

        const article = {
            title: 'FIFA Club World Cup: Chelsea Crowned Champions, Qatar Eyes Women\'s Tournament',
            slug: 'fifa-club-world-cup-2026-updates',
            excerpt: 'Chelsea FC wins the inaugural expanded 32-team FIFA Club World Cup, while Qatar negotiates to host the first Women\'s Club World Cup in 2028. Morocco emerges as frontrunner for the 2029 men\'s edition.',
            content: `
<h2>Chelsea Crowned Inaugural Expanded Champions</h2>
<p>Chelsea FC emerged as the first winners of the revamped 32-team FIFA Club World Cup, defeating Paris Saint-Germain 3-0 in the final held in New York/New Jersey. The trophy has been added to the FIFA Museum's permanent exhibition, highlighting the tournament's new global format.</p>

<p>This victory has boosted prize money distributions, with Brazilian clubs reportedly using their shares to attract top European talent. The expanded format marks a significant shift in FIFA's approach to club competitions, bringing together the world's best teams in a comprehensive tournament.</p>

<h2>Qatar in Talks to Host First Women's Club World Cup</h2>
<p>FIFA is negotiating with Qatar to stage the debut Women's Club World Cup from January 5-30, 2028. This 16-team event could disrupt domestic leagues, including in Europe, due to its mid-season timing.</p>

<p>Qatar currently lacks a FIFA women's ranking after not playing official matches for over a decade, raising questions about the choice. The tournament aims to crown the world's top women's club side, building on FIFA's expansion of women's competitions.</p>

<h2>Morocco Eyed for 2029 Men's Edition</h2>
<p>Morocco is the frontrunner to host the next men's Club World Cup in 2029, serving as a test for the country's infrastructure ahead of co-hosting the 2030 FIFA World Cup. Other nations like the United States, Brazil, and Qatar have shown interest, with FIFA expected to confirm soon.</p>

<h2>Player and Scheduling Concerns</h2>
<p>Global players' union FIFPRO has raised issues with FIFA over extreme heat during the 2025 U.S.-hosted tournament, calling for better scheduling consultations ahead of future events like the 2026 World Cup and beyond.</p>

<p>Additionally, clubs like Inter Miami could qualify for future editions by winning the CONCACAF Champions Cup in 2026-2028.</p>

<h2>Other Developments</h2>
<p>In related club competitions, the 2026 FIFA Women's Champions Cup (a separate four-team event) will conclude in London from January 28 to February 1, featuring teams like Arsenal, Gotham FC, Corinthians, and ASFAR.</p>

<p>Real Madrid coach Xabi Alonso has referenced the Club World Cup's impact on tactics, noting adaptations during absences like Kylian Mbappé's. The tournament continues to shape how top clubs approach their global strategies and player management.</p>
            `,
            coverImage: '/club-world-cup-2026.jpg',
            authorId: 'gg-sports-desk',
            authorName: 'Gossip Gazette Sports Desk',
            categoryId: sportsCategory.id,
            categoryName: sportsCategory.name,
            tags: ['FIFA', 'Club World Cup', 'Chelsea', 'Qatar', 'Morocco', 'Women\'s Football'],
            status: 'published' as const,
            publishedAt: new Date().toISOString(),
            views: 0,
            source: 'Gossip Gazette Sports'
        };

        const created = await neonService.createArticle(article);
        console.log('✅ Article created successfully!');
        console.log('Title:', created.title);
        console.log('Slug:', created.slug);
        console.log('ID:', created.id);

    } catch (error) {
        console.error('❌ Error adding article:', error);
    }
}

addClubWorldCupArticle();
