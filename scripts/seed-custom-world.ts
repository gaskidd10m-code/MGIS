import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seedCustomWorldNews() {
    try {
        console.log('Clearing existing World news articles...');

        // Get World category ID
        const categoryResult = await pool.query("SELECT id FROM categories WHERE name = 'World'");
        if (categoryResult.rows.length === 0) {
            console.error('World category not found!');
            return;
        }
        const worldCategoryId = categoryResult.rows[0].id;

        // Delete existing World articles
        await pool.query("DELETE FROM articles WHERE category_id = $1", [worldCategoryId]);

        console.log('Seeding custom World news articles...');

        const articles = [
            {
                title: "Trump's Foreign Policy Overhaul Reshapes Global Order",
                slug: 'trump-foreign-policy-overhaul-reshapes-global-order',
                excerpt: "President Trump's administration swiftly withdrew from major international agreements, marking a shift away from U.S.-led multilateralism and prioritizing 'America First' policies.",
                content: `<p>Upon taking office in January 2025, President Trump's administration swiftly withdrew from the Paris Agreement on climate change and the World Health Organization (WHO), citing them as burdensome to U.S. interests. Broad tariffs were imposed on imports from China, Europe, and other regions, escalating trade wars and disrupting global supply chains.</p>
                
                <p>Trump claimed to end U.S. involvement in multiple foreign wars, including reduced commitments in Ukraine and the Middle East, though conflicts persisted with lingering U.S. support in some areas. This marked a shift away from U.S.-led multilateralism, prioritizing "America First" policies, which strained alliances like NATO—where Trump pushed for higher defense spending (up to 5% of GDP via the Hague Commitment)—and redefined relations with adversaries like Russia and China.</p>
                
                <p>Domestically, executive orders froze much foreign aid, impacting global humanitarian efforts, while internationally, it led to winners like Saudi Arabia (strengthened ties) and losers like China (heightened tensions). The overhaul, influenced by Project 2025, included embassy closures and a focus on domestic security over democracy promotion.</p>
                
                <p>By year-end, this approach was seen as ending an era of U.S.-led global stability, with mixed results: some de-escalations but increased unpredictability.</p>`,
                coverImage: '/trump-foreign-policy.png',
                authorName: 'Sarah Mitchell',
                categoryId: worldCategoryId,
                categoryName: 'World',
                tags: ['Politics', 'USA', 'Foreign Policy', 'Trump'],
                status: 'published',
                publishedAt: new Date('2025-01-15').toISOString(),
                views: 3420,
                source: 'International Affairs Desk'
            },
            {
                title: "China Halts Rare-Earth Exports in Trade Retaliation",
                slug: 'china-halts-rare-earth-exports-trade-retaliation',
                excerpt: "China enacted export controls on rare-earth elements in retaliation to U.S. tariffs, halting shipments of critical minerals essential for electronics, EVs, and defense technology.",
                content: `<p>In retaliation to U.S. tariffs and technology restrictions imposed early in 2025, China enacted export controls on rare-earth elements starting April 4, halting shipments of critical minerals like tungsten, molybdenum, and rare earths essential for electronics, EVs, and defense tech.</p>
                
                <p>This move, expanded in October to include production equipment and battery materials, imposed extraterritorial jurisdiction and a "50% rule" for compliance, affecting global supply chains. The ban forced Trump to negotiate a partial pause in November, suspending some curbs for a year while retaining licensing systems, as U.S. industries faced shortages.</p>
                
                <p>Impacts included skyrocketing prices for semiconductors and renewables, prompting diversification efforts in the West, but highlighting China's dominance (over 80% of global supply). The truce eased immediate tensions but left underlying trade frictions unresolved, exacerbating U.S.-China rivalry.</p>`,
                coverImage: '/china-rare-earth.png',
                authorName: 'David Chen',
                categoryId: worldCategoryId,
                categoryName: 'World',
                tags: ['China', 'Trade', 'Technology', 'Economy'],
                status: 'published',
                publishedAt: new Date('2025-04-05').toISOString(),
                views: 2890,
                source: 'Global Economics Bureau'
            },
            {
                title: "Israel-U.S. Strikes Target Iran's Nuclear Facilities",
                slug: 'israel-us-strikes-target-iran-nuclear-facilities',
                excerpt: "Coordinated airstrikes by Israel and the U.S. targeted Iran's nuclear sites in June 2025, destroying key infrastructure and escalating regional tensions.",
                content: `<p>Tensions boiled over in June 2025 when Israel launched airstrikes on June 13 against Iran's nuclear facilities, including Natanz and Fordow, followed by U.S. bombings on three sites on June 21, reportedly destroying key centrifuges and infrastructure.</p>
                
                <p>This escalation, amid Iran's missile sites and energy targets, killed over 1,000 and aimed to halt Iran's nuclear program, which U.S. intelligence assessed as not fully destroyed despite claims. A fragile ceasefire followed in July, brokered amid U.S. pressure, but unresolved disputes lingered, with Iran remaining undeterred and Netanyahu pushing for further action against Trump's de-escalation priorities.</p>
                
                <p>The strikes heightened regional instability, drew in proxies like Hezbollah, and marked a flashpoint in Israel-Iran hostilities, contributing to global oil price spikes and fears of broader war.</p>`,
                coverImage: '/iran-strikes.png',
                authorName: 'Rachel Goldman',
                categoryId: worldCategoryId,
                categoryName: 'World',
                tags: ['Middle East', 'Iran', 'Israel', 'Nuclear', 'Conflict'],
                status: 'published',
                publishedAt: new Date('2025-06-14').toISOString(),
                views: 4150,
                source: 'Middle East Correspondent'
            },
            {
                title: "Ukraine War Enters Fourth Year with Stalemate Persisting",
                slug: 'ukraine-war-enters-fourth-year-stalemate-persisting',
                excerpt: "Russia achieved minimal territorial gains in 2025 despite high casualties, while Ukraine countered with drone strikes and Europe ramped up aid amid waning U.S. support.",
                content: `<p>Entering its fourth year, Russia achieved minimal gains in 2025—about 4,700 square kilometers—despite high casualties (over 1,000 daily) and use of North Korean troops (deployed then withdrawn in February). Ukraine countered with drone strikes on Russian bases, including Moscow, while Europe ramped up aid (e.g., long-range missiles), but U.S. support waned under Trump, shifting focus to domestic issues.</p>
                
                <p>Ceasefire talks stalled, with Russia demanding full control of Donbas and Ukraine resisting; Zelensky planned meetings with Trump by year-end. Key moments included Russian offensives in Kharkiv and Donetsk, Ukrainian incursions into Kursk, and a December 22-23 missile barrage.</p>
                
                <p>The war displaced millions, caused famine risks, and eroded global peace, with analysts doubting quick resolution amid Russia's optimism for 2026 victory.</p>`,
                coverImage: '/ukraine-war.png',
                authorName: 'Alexander Petrov',
                categoryId: worldCategoryId,
                categoryName: 'World',
                tags: ['Ukraine', 'Russia', 'War', 'Europe', 'Conflict'],
                status: 'published',
                publishedAt: new Date('2025-02-24').toISOString(),
                views: 5230,
                source: 'Eastern Europe Bureau'
            },
            {
                title: "U.S. Brokers Historic Gaza Ceasefire After Two Years",
                slug: 'us-brokers-historic-gaza-ceasefire-two-years',
                excerpt: "A U.S.-mediated three-phase ceasefire took effect in October 2025, involving hostage exchanges, troop withdrawals, and humanitarian aid surges after two years of fighting.",
                content: `<p>After two years of fighting, a U.S.-mediated three-phase ceasefire took effect in October 2025, involving hostage exchanges (dozens released), troop withdrawals, and humanitarian aid surges. Brokered by figures like Jared Kushner and involving Egypt, Qatar, and Turkey, it built on prior failed truces in November 2023 and March 2025.</p>
                
                <p>Implementation was shaky, with violations like Israeli strikes on a Gaza wedding in December and Hamas "changes" to terms, but it survived tests and was deemed "better than expected" by VP Vance. Announced by Biden in his farewell, it offered hope amid devastation (over 40,000 dead), enabling reconstruction but leaving governance and security unresolved.</p>`,
                coverImage: '/gaza-ceasefire.jpg',
                authorName: 'Fatima Hassan',
                categoryId: worldCategoryId,
                categoryName: 'World',
                tags: ['Gaza', 'Israel', 'Palestine', 'Ceasefire', 'Peace'],
                status: 'published',
                publishedAt: new Date('2025-10-15').toISOString(),
                views: 3780,
                source: 'Middle East Peace Desk'
            }
        ];

        for (const article of articles) {
            await pool.query(`
                INSERT INTO articles (
                    title, slug, excerpt, content, cover_image,
                    author_name, category_id, category_name,
                    tags, status, published_at, views, source
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            `, [
                article.title,
                article.slug,
                article.excerpt,
                article.content,
                article.coverImage,
                article.authorName,
                article.categoryId,
                article.categoryName,
                article.tags,
                article.status,
                article.publishedAt,
                article.views,
                article.source
            ]);
            console.log(`✓ Created: ${article.title}`);
        }

        console.log('\n✅ Custom World news seeding complete!');
    } catch (error) {
        console.error('❌ Failed to seed custom World news:', error);
    } finally {
        await pool.end();
    }
}

seedCustomWorldNews();
