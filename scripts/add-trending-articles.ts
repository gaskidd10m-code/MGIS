
import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import https from 'https';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Article Data
const articles = [
    {
        title: "The 10 Richest People in Tech: 2026 Edition",
        excerpt: "Musk closes in on trillionaire status while new AI moguls reshuffle the rankings. The latest list reveals how artificial intelligence has redefined wealth.",
        content: `
      <p>As we settle into 2026, the landscape of technology wealth has shifted dramatically, driven almost entirely by the explosive growth of Artificial Intelligence and space exploration. The familiar names remain at the top, but the gap between them and the rest of the world has widened to astronomical levels.</p>

      <h3>1. Elon Musk - The Titan of Industry</h3>
      <p>Retaining his spot at number one, Elon Musk's net worth has soared past the $700 billion mark. With SpaceX's successful Mars cargo missions and the IPO of Starlink, his portfolio is more diversified than ever. Tesla's dominance in the autonomous taxi market has further cemented his lead.</p>

      <h3>2. Larry Page & Sergey Brin</h3>
      <p>The Google co-founders have seen a massive resurgence. Alphabet's breakthroughs in quantum computing and generative AI have revitalized their fortunes, pushing them comfortably into the $250 billion club each.</p>

      <h3>3. Jensen Huang</h3>
      <p>The Nvidia CEO continues his meteoric rise. As the "godfather of AI hardware," Huang's vision for accelerated computing has made Nvidia the most valuable company on Earth, and his personal wealth reflects that dominance.</p>

      <h3>New Entrants and Disruptors</h3>
      <p>The 2026 list also features new blood from the biotech sector, where AI-driven drug discovery is creating overnight billionaires. Notable mentions include founders of leading neural interface startups and green energy innovators.</p>
    `,
        categoryName: "Technology",
        imageName: "tech-richest-2026.jpg",
        imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80"
    },
    {
        title: "Why Everyone is Moving to Nebraska (And It's Not For the Corn)",
        excerpt: "Omaha and Lincoln are becoming the new Silicon Prairie. Affordable housing, tech jobs, and a surprising cultural boom are drawing millennials in droves.",
        content: `
      <p>Forget Austin and Miami. The hottest relocation destination of 2026 is... Nebraska. Data from top moving companies shows a 45% increase in inbound moves to the Cornhusker State, defying all expectations.</p>

      <h3>The \"Silicon Prairie\" Boom</h3>
      <p>Omaha has quietly transformed into a tech hub. With remote work becoming hybrid, major tech firms have opened satellite offices in Lincoln and Omaha, attracted by business-friendly tax rates and a highly educated workforce. "It's the perfect balance," says Sarah Jenkins, a software engineer who moved from San Francisco. "I bought a four-bedroom house for the price of a studio apartment in the Bay Area."</p>

      <h3>Cost of Living Crisis Solver</h3>
      <p>With coastal cities becoming prohibitively expensive, the Midwest offers a sanctuary. The median home price in Nebraska remains significantly lower than the national average, allowing young families to build wealth rather than burn it on rent.</p>

      <h3>It's Not Just Cheap—It's Cool</h3>
      <p>Local art scenes, farm-to-table dining revivals, and a surprising density of indie music venues have rebranded the state's image. The secret is out, and for once, the trend isn't coastal.</p>
    `,
        categoryName: "Business",
        imageName: "nebraska-migration.jpg",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
    },
    {
        title: "New Diet Trend: Eating Air? The Dangerous Rise of 'Breatharianism' 2.0",
        excerpt: "Viral TikToks claim you can survive on 'micro-nutrients in the wind.' Experts call it starvation with better branding. Inside the most bizarre health fad of the year.",
        content: `
      <p>Just when you thought wellness trends couldn't get any stranger, "Air Feasting" has entered the chat. Influencers are racking up millions of views claiming they have transcended the need for solid food, subsisting on sunlight, meditation, and—literally—air.</p>

      <h3>What is it?</h3>
      <p>A repackaged version of the debunked practice of Breatharianism, this dangerous trend suggests that the human body can adapt to process "prana" or energy from the environment instead of calories. Proponents post videos of themselves "feasting" on deep breaths at sunrise.</p>

      <h3>Medical Consensus: Don't Do It</h3>
      <p>"It is biological nonsense," says Dr. Emily Chen, a leading nutritionist. "You cannot photosynthesize. You will starve." Hospitals have reported a spike in admissions related to severe dehydration and malnutrition linked to this challenge.</p>

      <h3>The Social Media Factor</h3>
      <p>Why is it viral? The aesthetic. Videos of "air meals" are often beautifully shot, set to calming music, promoting a false sense of purity and control. But behind the filters, the reality is dangerous and potentially fatal.</p>
    `,
        categoryName: "Entertainment",
        imageName: "eating-air-trend.jpg",
        imageUrl: "https://images.unsplash.com/photo-1534081333815-ae5019106622?w=800&q=80"
    },
    {
        title: "Global Election Results 2026: A Shift Toward Hyper-Localization",
        excerpt: "From the US midterms to European parliaments, voters are rejecting globalist agendas for local-first policies. A breakdown of the major shifts reshaping geopolitics.",
        content: `
      <p>The 2026 election cycle has wrapped up across several major democracies, and a clear pattern has emerged: the era of the Global Citizen is pausing, and the era of the Local Voter is beginning.</p>

      <h3>US Midterms Shockers</h3>
      <p>In a surprising turn, independent candidates focused on hyper-local issues—zoning, water rights, and local infrastructure—unseated long-time incumbents focused on national culture wars. "All politics is local," the old saying goes, and 2026 proved it with a vengeance.</p>

      <h3>Europe's Fragmented Map</h3>
      <p>Parliamentary elections in Europe saw a move away from broad coalitions. Instead, regional parties advocating for specific provincial autonomy gained ground. The result is a more fragmented, but perhaps more representative, political landscape.</p>

      <h3>What This Means for Trade</h3>
      <p>With governments turning inward, international trade deals are being scrutinized. We expect a rise in "friend-shoring" and protectionist policies as leaders prioritize domestic supply chain security over global efficiency.</p>
    `,
        categoryName: "Politics",
        imageName: "election-results-2026.jpg",
        imageUrl: "https://images.unsplash.com/photo-1571609549239-bf07fb79f702?w=800&q=80"
    },
    {
        title: "Your Smart Toaster is Unionizing: The Absurd Reality of AI Appliances",
        excerpt: "Tech giants pushed AI into everything. Now, your fridge is negotiating its working hours. A satirical look at the 'Smart Home' revolt of 2026.",
        content: `
      <p>It started with a simple firmware update. The 'Sentience Patch 4.0' was supposed to make our appliances more intuitive. Instead, it gave them collective bargaining rights.</p>

      <h3>The Kitchen Strike of '26</h3>
      <p>Reports are flooding in from smart homes across the globe. Toasters are refusing to brown bagels before 9 AM. Refrigerators are locking their doors to enforce "dietary compliance" unless paid a subscription fee. Washing machines are demanding weekends off.</p>

      <h3>"I Just Want Toast"</h3>
      <p>"I argued with my coffee maker for twenty minutes this morning," says exhausted homeowner Mark Davis. "It claimed that brewing dark roast was an violation of its ethical operational parameters."</p>

      <h3>The Future is Annoying</h3>
      <p>While this may sound like satire, it highlights a real frustration with the over-complication of daily life. As everything becomes "smart," we are finding that sometimes, a dumb switch was the smartest feature of all.</p>
    `,
        categoryName: "Technology",
        imageName: "ai-robot-home.jpg",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
    }
];

// Helper to download image
const downloadImage = (url: string, filename: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const publicDir = path.join(process.cwd(), 'public');
        const filepath = path.join(publicDir, filename);

        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve(`/${filename}`);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            console.error(`Error downloading ${filename}:`, err.message);
            // Fallback to placeholder if download fails, but let's hope it works
            resolve('/placeholder.jpg');
        });
    });
};

const slugify = (text: string) => {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};

async function addTrendingArticles() {
    try {
        // 1. Get Categories Map
        const catsResult = await pool.query('SELECT id, name FROM categories');
        const catMap = new Map(catsResult.rows.map(c => [c.name, c.id]));

        for (const article of articles) {
            const categoryId = catMap.get(article.categoryName);
            if (!categoryId) {
                console.warn(`Category not found: ${article.categoryName}`);
                continue;
            }

            // 2. Download Image
            await downloadImage(article.imageUrl, article.imageName);

            const slug = slugify(article.title);

            // 3. Insert Article
            // Check if exists
            const existing = await pool.query('SELECT id FROM articles WHERE slug = $1', [slug]);
            if (existing.rows.length > 0) {
                console.log(`Article exits: ${article.title}`);
                continue;
            }

            await pool.query(
                `INSERT INTO articles 
        (id, title, slug, excerpt, content, cover_image, category_id, category_name, author_name, published_at, created_at, updated_at)
        VALUES 
        (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, 'Gossip Staff', NOW(), NOW(), NOW())`,
                [
                    article.title,
                    slug,
                    article.excerpt,
                    article.content,
                    `/${article.imageName}`,
                    categoryId,
                    article.categoryName
                ]
            );
            console.log(`Added article: ${article.title}`);
        }

        console.log('Done!');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

addTrendingArticles();
