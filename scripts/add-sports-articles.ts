import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function addSportsArticles() {
    console.log('Fetching categories...\n');

    try {
        // Get categories
        const categories = await neonService.getCategories();
        const sportsCategory = categories.find((c: any) => c.name === 'Sports');

        if (!sportsCategory) {
            console.error('Sports category not found!');
            return;
        }

        console.log(`Found Sports category with ID: ${sportsCategory.id}\n`);
        console.log('Adding sports articles...\n');

        const newArticles = [
            {
                title: "Jordi Cruijff Set to Become Ajax's New Technical Director",
                slug: "jordi-cruijff-ajax-technical-director-2025",
                excerpt: "Former Barcelona director Jordi Cruijff has verbally agreed to become Ajax's new technical director on a two-and-a-half-year deal, marking a new chapter in his illustrious career.",
                content: `<p>Jordi Cruijff, son of legendary Dutch footballer Johan Cruyff, has verbally agreed to become Ajax's new technical director, according to reports from De Telegraaf. The two-and-a-half-year deal is expected to be sealed soon, marking a significant appointment for the Amsterdam club.</p>

<h3>From Barcelona to Amsterdam</h3>
<p>The former Barcelona director brings extensive experience in football administration and player development. His tenure at Barcelona saw him work closely with the club's youth academy and first team operations, making him an ideal candidate for Ajax's technical director role.</p>

<h3>Continuing the Cruyff Legacy</h3>
<p>Jordi's appointment at Ajax is particularly poignant given his father Johan Cruyff's legendary status at both Barcelona and Ajax. The younger Cruyff is ready for this new chapter, bringing his own vision while honoring the footballing philosophy his father championed.</p>

<h3>What This Means for Ajax</h3>
<p>Ajax has been searching for a technical director who understands the club's philosophy of developing young talent and playing attractive football. Cruijff's background at Barcelona, combined with his family's deep connection to Ajax, makes him uniquely qualified for this role.</p>

<h3>What This Means for Ajax</h3>
<p>The appointment is expected to be officially announced in the coming weeks, with Cruijff set to begin his duties immediately to help shape Ajax's transfer strategy and long-term sporting vision.</p>`,
                coverImage: "/jordi-cruijff-ajax.jpg",
                authorId: "sports-desk",
                authorName: "Football Management Reporter",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Ajax", "Jordi Cruijff", "Technical Director", "Barcelona", "Dutch Football"],
                status: "published" as const,
                publishedAt: new Date("2025-01-22").toISOString(),
                views: 0,
                source: "De Telegraaf"
            },
            {
                title: "Lamine Yamal: 'I Want to Build My Own Path, Not Compare to Others'",
                slug: "lamine-yamal-own-path-interview-2025",
                excerpt: "Barcelona wonderkid Lamine Yamal opens up about avoiding comparisons to legends like Cristiano Ronaldo, emphasizing his desire to forge his own unique career path.",
                content: `<p>Barcelona's teenage sensation Lamine Yamal has shared his philosophy on success in a recent interview, emphasizing the importance of carving out his own identity rather than comparing himself to football legends.</p>

<h3>Learning from the Greats</h3>
<p>"It's best not to compare yourself to anyone," Yamal stated. "Players like Cristiano Ronaldo did what they did because they wanted to be themselves and not compare themselves to others."</p>

<p>The 17-year-old's mature perspective on his career has impressed observers, showing wisdom beyond his years as he navigates the pressures of being one of football's brightest young talents.</p>

<h3>Forging His Own Identity</h3>
<p>"I want to build my own path," Yamal declared, making it clear that while he respects the achievements of past greats, his focus is on creating his own legacy at Barcelona and beyond.</p>

<h3>Rising Star at Barcelona</h3>
<p>Since breaking into Barcelona's first team, Yamal has become an integral part of the squad, dazzling fans with his technical ability, vision, and maturity on the pitch. His performances have drawn comparisons to various legends, but the young winger is determined to be known for his own unique style.</p>

<p>This mindset has been praised by coaches and former players alike, who see it as a sign of the mental strength that will be crucial for his long-term success at the highest level.</p>`,
                coverImage: "/lamine-yamal-interview.png",
                authorId: "sports-desk",
                authorName: "Football Features Writer",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Lamine Yamal", "Barcelona", "Interview", "Young Talent", "La Liga"],
                status: "published" as const,
                publishedAt: new Date("2025-01-23").toISOString(),
                views: 0,
                source: "Barcelona Media"
            },
            {
                title: "Ousmane Dembélé Wins World's Best Player at Globe Soccer Awards 2025",
                slug: "dembele-world-best-player-globe-soccer-2025",
                excerpt: "Paris Saint-Germain's Ousmane Dembélé has been crowned World's Best Player at the prestigious Globe Soccer Awards 2025, capping off an exceptional year.",
                content: `<p>Ousmane Dembélé has been officially crowned World's Best Player at the Globe Soccer Awards 2025, recognizing his outstanding performances for Paris Saint-Germain throughout the year.</p>

<h3>A Career-Defining Season</h3>
<p>The French winger's move from Barcelona to PSG has proven to be transformative, with Dembélé hitting new heights in his career. His pace, dribbling ability, and improved decision-making have made him one of the most feared attackers in world football.</p>

<h3>Globe Soccer Recognition</h3>
<p>The Globe Soccer Awards, held annually in Dubai, recognize excellence in football across various categories. Dembélé's selection as World's Best Player puts him among an elite group of previous winners and acknowledges his impact on the game.</p>

<h3>PSG's Dominant Year</h3>
<p>Dembélé's individual award comes as part of a successful night for Paris Saint-Germain, with the club also winning the Best Club Award at the ceremony. This double recognition highlights PSG's dominance in European football and their successful recruitment strategy.</p>

<p>The 27-year-old has been instrumental in PSG's domestic and European campaigns, providing crucial goals and assists while showcasing the consistency that had sometimes eluded him earlier in his career.</p>`,
                coverImage: "/dembele-globe-soccer.jpg",
                authorId: "sports-desk",
                authorName: "Awards Correspondent",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Ousmane Dembélé", "PSG", "Globe Soccer Awards", "Best Player", "French Football"],
                status: "published" as const,
                publishedAt: new Date("2025-01-24").toISOString(),
                views: 0,
                source: "Globe Soccer Awards"
            },
            {
                title: "Cristiano Ronaldo Wins Best Middle East Player Award at Globe Soccer 2025",
                slug: "ronaldo-best-middle-east-player-globe-soccer-2025",
                excerpt: "Cristiano Ronaldo continues his trophy collection with the Best Middle East Player Award at Globe Soccer 2025, recognizing his impact in Saudi Arabian football.",
                content: `<p>Cristiano Ronaldo has added another accolade to his legendary career, winning the Best Middle East Player Award at the Globe Soccer Awards 2025. The Portuguese superstar's move to Al-Nassr has transformed Saudi Arabian football.</p>

<h3>Impact on Saudi Football</h3>
<p>Since joining Al-Nassr in late 2022, Ronaldo has been the catalyst for the Saudi Pro League's transformation into a global football destination. His presence has attracted numerous world-class players to the region and significantly raised the league's profile.</p>

<h3>Continued Excellence</h3>
<p>At 39 years old, Ronaldo continues to perform at an elite level, scoring goals consistently and leading Al-Nassr's charge for domestic and continental honors. His professionalism and dedication have set new standards in Middle Eastern football.</p>

<h3>Globe Soccer Recognition</h3>
<p>The award recognizes not just Ronaldo's on-field performances but also his role as an ambassador for football in the Middle East. His influence extends beyond the pitch, inspiring young players across the region and helping to develop the sport's infrastructure.</p>

<p>Ronaldo's commitment to excellence remains unwavering, and this award serves as further proof that age is just a number for one of football's all-time greats.</p>`,
                coverImage: "/ronaldo-globe-soccer.png",
                authorId: "sports-desk",
                authorName: "Middle East Football Correspondent",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Cristiano Ronaldo", "Al-Nassr", "Globe Soccer Awards", "Saudi Pro League", "Middle East Football"],
                status: "published" as const,
                publishedAt: new Date("2025-01-24").toISOString(),
                views: 0,
                source: "Globe Soccer Awards"
            },
            {
                title: "Paris Saint-Germain Named Best Club at Globe Soccer Awards 2025",
                slug: "psg-best-club-globe-soccer-2025",
                excerpt: "Paris Saint-Germain has been crowned Best Club at the Globe Soccer Awards 2025, recognizing their domestic dominance and European ambitions.",
                content: `<p>Paris Saint-Germain has been awarded the prestigious Best Club Award at the Globe Soccer Awards 2025, capping off a remarkable year for the French champions.</p>

<h3>Domestic Dominance</h3>
<p>PSG's dominance in French football continues unabated, with the club securing another Ligue 1 title while also competing strongly in domestic cup competitions. Their consistency at the highest level of French football has been unmatched.</p>

<h3>European Ambitions</h3>
<p>Beyond domestic success, PSG has made significant strides in European competition, with improved performances in the Champions League demonstrating the club's evolution under their current management and playing squad.</p>

<h3>Star-Studded Squad</h3>
<p>The award recognizes not just results but also the quality of football played by PSG's star-studded squad. With players like Ousmane Dembélé (who won World's Best Player at the same ceremony), the club has assembled one of the most talented rosters in world football.</p>

<h3>Club Vision and Development</h3>
<p>PSG's recognition also acknowledges their investment in youth development, community programs, and their role in growing football's global appeal. The club's vision extends beyond trophies to creating a lasting legacy in world football.</p>

<p>This award cements PSG's status as one of the elite clubs in world football and validates their approach to building a sustainable, successful football institution.</p>`,
                coverImage: "/psg-globe-soccer.png",
                authorId: "sports-desk",
                authorName: "Club Football Reporter",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["PSG", "Paris Saint-Germain", "Globe Soccer Awards", "Best Club", "Ligue 1"],
                status: "published" as const,
                publishedAt: new Date("2025-01-24").toISOString(),
                views: 0,
                source: "Globe Soccer Awards"
            }
        ];

        for (const article of newArticles) {
            try {
                const created = await neonService.createArticle(article);
                console.log(`✓ Added: ${created.title}`);
            } catch (error) {
                console.error(`✗ Error adding "${article.title}":`, error);
            }
        }

        console.log('\n✓ Finished adding sports articles!');
        console.log(`Total articles processed: ${newArticles.length}`);

    } catch (error) {
        console.error('Error in addSportsArticles:', error);
    }
}

addSportsArticles();
