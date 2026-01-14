import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function addIPhone17Article() {
    try {
        console.log('Adding iPhone 17 article...');

        // Get Technology category
        const categories = await neonService.getCategories();
        const techCategory = categories.find(c => c.name === 'Technology' || c.name === 'Tech');

        if (!techCategory) {
            console.error('Technology category not found!');
            return;
        }

        const article = {
            title: 'iPhone 17 Series Unveiled: Everything You Need to Know About Apple\'s Latest Flagship',
            slug: 'iphone-17-series-complete-guide-2026',
            excerpt: 'Apple\'s iPhone 17 lineup brings major upgrades including 120Hz displays across all models, all-48MP cameras, breakthrough battery life, and the ultra-slim iPhone 17 Air. Plus, the budget iPhone 17e is coming soon.',
            content: `
<h2>iPhone 17 Series Overview</h2>
<p>The iPhone 17 lineup was officially unveiled by Apple in September 2025, marking a significant refresh with enhanced displays, processors, and camera systems across the board. It includes the standard iPhone 17, the slim iPhone 17 Air, and the premium iPhone 17 Pro and Pro Max models.</p>

<p>Pricing starts at $799 for the base iPhone 17 (256GB), with the Pro models beginning at higher tiers. As of January 2026, these devices are widely available, and Apple has highlighted key upgrades like improved battery life and AI integration in recent ads.</p>

<h2>Major Upgrades Across the Board</h2>

<h3>Display Revolution</h3>
<p>For the first time, all iPhone 17 models feature 120Hz ProMotion displays, ending the exclusivity that Pro models previously enjoyed. The displays range from 6.3 inches on the standard iPhone 17 to a massive 6.9 inches on the Pro Max, all with up to 3000 nits peak brightness and anti-reflective coating.</p>

<h3>All-48MP Camera System</h3>
<p>Every iPhone 17 model now features all-48MP rear cameras, a significant upgrade that delivers better resolution and low-light performance. The Pro models include telephoto lenses with up to 8x optical zoom, while all models get a 24MP front camera with Center Stage for group selfies.</p>

<h3>Breakthrough Battery Life</h3>
<p>The Pro models cross the 5,000 mAh threshold for the first time, featuring vapor chamber cooling and supporting 25W wired and wireless charging. Even the standard models see improved battery efficiency for longer daily use.</p>

<h2>Model Breakdown</h2>

<h3>iPhone 17</h3>
<ul>
<li>6.3-inch Super Retina XDR OLED display (120Hz)</li>
<li>A19 chip with 6-core CPU and 5-core GPU</li>
<li>48MP Fusion Main + 48MP Ultra Wide cameras</li>
<li>256GB/512GB storage options</li>
<li>Available in Lavender and four other colors</li>
<li>Starting at $799</li>
</ul>

<h3>iPhone 17 Air</h3>
<p>The standout of the lineup, the iPhone 17 Air is ultra-slim at just 5.64mm thick, making it the thinnest iPhone ever. It features a 6.5-inch display and maintains the same powerful specs as the standard model while prioritizing portability.</p>

<h3>iPhone 17 Pro & Pro Max</h3>
<ul>
<li>6.3-inch (Pro) or 6.9-inch (Pro Max) displays</li>
<li>A19 Pro chip with 6-core GPU</li>
<li>All 48MP camera system with advanced telephoto</li>
<li>Up to 2TB storage</li>
<li>Over 5,000 mAh battery capacity</li>
<li>Pro-level video recording and landscape selfies</li>
</ul>

<h2>iPhone 17e: Budget Option Coming Soon</h2>
<p>Apple is gearing up for an early 2026 release of the budget-friendly iPhone 17e, entering mass production after CES 2026 (January 9). Key features include:</p>

<ul>
<li>Downgraded A19 chip (performance akin to A17 Pro)</li>
<li>6.1-inch 60Hz OLED display with Dynamic Island</li>
<li>Slimmer bezels and single rear camera</li>
<li>Expected pricing at $599</li>
<li>Modern features like MagSafe and improved modem</li>
</ul>

<p>This model aims to bridge the gap for users upgrading from older SE or e-series devices, offering an affordable entry point with modern features.</p>

<h2>Design and Build Quality</h2>
<p>While there's no major design overhaul from iPhone 16, refinements include thinner bezels, a smaller Dynamic Island, and new color options like Mist Blue or Deep Blue. All models feature Ceramic Shield 2 front protection and aluminum unibody construction with improved heat dissipation on Pro models.</p>

<h2>Performance and AI Integration</h2>
<p>The A19 series chips deliver 5-10% faster performance over the A18, with an enhanced Neural Engine for AI tasks. Apple Intelligence powers improved Siri functionality, advanced photo editing, and real-time language translation. All models ship with iOS 19 and are upgradable to iOS 20+.</p>

<h2>Connectivity Upgrades</h2>
<p>All iPhone 17 models feature:</p>
<ul>
<li>Apple-designed Wi-Fi 7 chip</li>
<li>Bluetooth 6.0</li>
<li>Apple C1x modem for better cellular performance</li>
<li>Dual Capture video recording</li>
</ul>

<h2>Looking Ahead: 2026 and Beyond</h2>
<p>Apple is planning significant changes for future releases:</p>
<ul>
<li>No iPhone 18 in fall 2026 - shifting to split launches</li>
<li>Potential under-display Face ID</li>
<li>Custom C2 modem development</li>
<li>Foldable iPhone rumors for late 2026</li>
<li>Spring launches starting next year</li>
</ul>

<h2>Should You Upgrade?</h2>
<p>Reviews praise the Pro Max's 6.9-inch display and battery as "worth upgrading" for power users. The universal 120Hz displays and doubled base storage (no more 128GB) make even the standard models compelling upgrades from iPhone 14 or earlier.</p>

<p>However, some users are holding off for 2026 models, citing potential under-display Face ID and foldable designs as bigger leaps worth waiting for.</p>

<h2>Availability</h2>
<p>The iPhone 17 series is widely available through Apple's website, carriers like Spectrum Mobile, and authorized resellers worldwide. For international buyers, check local Apple resellers or online shipping options for the latest stock.</p>
            `,
            coverImage: '/iphone-17-pro-lineup.jpg',
            authorId: 'gg-tech-desk',
            authorName: 'Gossip Gazette Tech Desk',
            categoryId: techCategory.id,
            categoryName: techCategory.name,
            tags: ['iPhone 17', 'Apple', 'Technology', 'Smartphones', 'iPhone 17 Pro', 'iPhone 17 Air', 'A19 Chip'],
            status: 'published' as const,
            publishedAt: new Date().toISOString(),
            views: 0,
            source: 'Gossip Gazette Technology'
        };

        const created = await neonService.createArticle(article);
        console.log('✅ iPhone 17 article created successfully!');
        console.log('Title:', created.title);
        console.log('Slug:', created.slug);
        console.log('ID:', created.id);

    } catch (error) {
        console.error('❌ Error adding article:', error);
    }
}

addIPhone17Article();
