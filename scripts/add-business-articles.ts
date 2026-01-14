import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function addBusinessArticles() {
    try {
        console.log('Adding Business articles...');

        const categories = await neonService.getCategories();
        const businessCategory = categories.find(c => c.name === 'Business');

        if (!businessCategory) {
            console.error('Business category not found!');
            return;
        }

        const articles = [
            {
                title: 'Global Markets Rally as Tech Giants Report Record Earnings',
                slug: 'global-markets-rally-tech-earnings-2026',
                excerpt: 'Stock markets surge worldwide as major technology companies exceed analyst expectations with unprecedented quarterly profits, driven by AI innovations and cloud computing growth.',
                content: `
<h2>Tech Sector Drives Market Surge</h2>
<p>Global stock markets experienced significant gains today as major technology companies reported record-breaking quarterly earnings, surpassing analyst expectations and driving investor confidence to new heights.</p>

<p>The rally was led by the so-called "Magnificent Seven" tech giants, with artificial intelligence and cloud computing divisions showing particularly strong performance. Market analysts attribute the surge to increased enterprise adoption of AI tools and continued digital transformation across industries.</p>

<h2>Key Earnings Highlights</h2>
<p>Several major players reported earnings that exceeded Wall Street forecasts by substantial margins. Cloud computing revenue grew by double digits year-over-year, while AI-related services showed triple-digit growth in some cases.</p>

<p>The strong performance comes despite earlier concerns about potential economic headwinds and regulatory challenges facing the technology sector.</p>

<h2>Investor Sentiment</h2>
<p>Market sentiment has shifted dramatically positive, with the tech-heavy NASDAQ composite posting its best single-day gain in months. Institutional investors are increasing their positions in technology stocks, viewing the sector as a key driver of future economic growth.</p>

<p>Analysts predict continued strength in the technology sector throughout 2026, particularly in areas related to artificial intelligence, cybersecurity, and cloud infrastructure.</p>
                `,
                coverImage: '/business-markets-rally.jpg',
                authorId: 'gg-business-desk',
                authorName: 'Gossip Gazette Business Desk',
                categoryId: businessCategory.id,
                categoryName: businessCategory.name,
                tags: ['Markets', 'Technology', 'Earnings', 'Stocks', 'AI'],
                status: 'published' as const,
                publishedAt: new Date().toISOString(),
                views: 0,
                source: 'Gossip Gazette Business'
            },
            {
                title: 'Major Retail Chain Announces Expansion Plans Amid E-Commerce Shift',
                slug: 'retail-expansion-ecommerce-strategy-2026',
                excerpt: 'Leading retail corporation unveils ambitious expansion strategy combining physical stores with enhanced digital presence, betting on hybrid shopping experience.',
                content: `
<h2>Hybrid Retail Strategy</h2>
<p>A major retail chain has announced plans to open 200 new stores while simultaneously investing heavily in e-commerce infrastructure, signaling confidence in a hybrid shopping model that combines physical and digital experiences.</p>

<p>The expansion comes at a time when many retailers are struggling to balance traditional brick-and-mortar operations with growing online demand. The company's strategy focuses on creating "experience centers" that blend in-store shopping with seamless digital integration.</p>

<h2>Investment in Technology</h2>
<p>The retailer is committing billions to upgrade its technology infrastructure, including AI-powered inventory management, augmented reality shopping features, and same-day delivery capabilities in major metropolitan areas.</p>

<p>These investments are designed to compete with pure-play e-commerce giants while leveraging the advantages of physical store locations for customer service and product experience.</p>

<h2>Market Impact</h2>
<p>Industry analysts view the move as a bold bet on the future of retail, with potential implications for the entire sector. The company's stock rose on the announcement, suggesting investor confidence in the strategy.</p>

<p>The expansion is expected to create thousands of jobs across multiple states, with hiring beginning in the second quarter of 2026.</p>
                `,
                coverImage: '/business-retail-expansion.jpg',
                authorId: 'gg-business-desk',
                authorName: 'Gossip Gazette Business Desk',
                categoryId: businessCategory.id,
                categoryName: businessCategory.name,
                tags: ['Retail', 'E-commerce', 'Business Strategy', 'Jobs'],
                status: 'published' as const,
                publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                views: 0,
                source: 'Gossip Gazette Business'
            },
            {
                title: 'Cryptocurrency Market Sees Renewed Interest from Institutional Investors',
                slug: 'cryptocurrency-institutional-investment-2026',
                excerpt: 'Major financial institutions increase cryptocurrency holdings as regulatory clarity improves and blockchain technology gains mainstream acceptance.',
                content: `
<h2>Institutional Adoption Accelerates</h2>
<p>The cryptocurrency market is experiencing a resurgence of institutional interest, with major banks and investment firms significantly increasing their digital asset holdings following improved regulatory frameworks and technological maturation.</p>

<p>This shift marks a departure from the skepticism that characterized institutional attitudes toward cryptocurrencies in previous years, driven by clearer regulatory guidelines and proven use cases for blockchain technology.</p>

<h2>Regulatory Developments</h2>
<p>Recent regulatory clarity from major financial jurisdictions has provided institutions with the confidence needed to enter the cryptocurrency market. New frameworks establish clear guidelines for custody, trading, and reporting of digital assets.</p>

<p>Financial regulators have worked closely with industry participants to create rules that protect investors while allowing innovation to flourish.</p>

<h2>Market Implications</h2>
<p>The influx of institutional capital is expected to reduce volatility and increase liquidity in cryptocurrency markets. Analysts predict this could lead to broader mainstream adoption and integration of digital assets into traditional financial systems.</p>

<p>Major cryptocurrency exchanges are reporting record trading volumes from institutional clients, with derivatives markets showing particularly strong growth.</p>
                `,
                coverImage: '/business-crypto-investment.jpg',
                authorId: 'gg-business-desk',
                authorName: 'Gossip Gazette Business Desk',
                categoryId: businessCategory.id,
                categoryName: businessCategory.name,
                tags: ['Cryptocurrency', 'Finance', 'Investment', 'Blockchain', 'Regulation'],
                status: 'published' as const,
                publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                views: 0,
                source: 'Gossip Gazette Business'
            }
        ];

        for (const article of articles) {
            const created = await neonService.createArticle(article);
            console.log(`✅ Created: ${created.title}`);
        }

        console.log('\n✅ All Business articles added successfully!');

    } catch (error) {
        console.error('❌ Error adding articles:', error);
    }
}

addBusinessArticles();
