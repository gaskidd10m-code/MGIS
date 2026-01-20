import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function addMoreSportsArticles() {
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
        console.log('Adding more sports articles...\n');

        const newArticles = [
            {
                title: "Christian Pulisic Calls Out Media: 'Stop with Made Up Stories About My Personal Life'",
                slug: "christian-pulisic-media-statement-2025",
                excerpt: "AC Milan star Christian Pulisic has issued a strong statement calling for accountability in sports journalism, urging media to stop fabricating stories about his personal life.",
                content: `<p>Christian Pulisic has taken a firm stand against false reporting, issuing a public statement demanding that media outlets stop spreading fabricated stories about his personal life.</p>

<h3>Strong Statement on Social Media</h3>
<p>"Please stop with the made up stories about my personal life," Pulisic stated. "Need to hold sources accountable it can affect people's lives."</p>

<p>The AC Milan winger's comments highlight the growing concern among professional athletes about the impact of unverified reporting and rumors on their personal lives and mental health.</p>

<h3>Impact on Athletes' Lives</h3>
<p>Pulisic's statement emphasizes an important issue in modern sports media: the real-world consequences of false reporting. Athletes and their families often bear the brunt of sensationalized or completely fabricated stories that spread rapidly on social media.</p>

<h3>Call for Accountability</h3>
<p>By calling for sources to be held accountable, Pulisic is advocating for higher standards in sports journalism. His message resonates with many athletes who have faced similar issues with inaccurate reporting about their private lives.</p>

<h3>Focus on Football</h3>
<p>The American international has been performing well for AC Milan this season, and his statement makes clear that he wants the focus to remain on his football rather than manufactured personal drama.</p>`,
                coverImage: "/christian-pulisic-statement.png",
                authorId: "sports-desk",
                authorName: "Football News Reporter",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Christian Pulisic", "AC Milan", "Media", "Serie A", "US Soccer"],
                status: "published" as const,
                publishedAt: new Date("2025-01-25").toISOString(),
                views: 0,
                source: "Player Statement"
            },
            {
                title: "Ibrahima Konaté's Emotional Tribute: 'A Part of Diogo Was With Us'",
                slug: "ibrahima-konate-diogo-tribute-2025",
                excerpt: "Liverpool defender Ibrahima Konaté played through illness to honor teammate Diogo, delivering an emotional tribute after the match: 'Forever 20'.",
                content: `<p>In one of the most emotional moments of the season, Liverpool's Ibrahima Konaté played the full 90 minutes despite being ill all week, driven by his desire to honor his teammate Diogo and his family.</p>

<h3>Powerful Tribute</h3>
<p>"Yesterday it was more than a match. A part of Diogo was with us. Forever 20," Konaté said in a heartfelt statement that has resonated throughout the football community.</p>

<h3>Playing Through Adversity</h3>
<p>Konaté was ill the whole week and didn't expect to play. He trained for the first time on Friday after dealing with a hamstring issue, but his determination to play for Diogo and his family pushed him through the pain barrier.</p>

<h3>Brotherhood in Football</h3>
<p>The French defender's decision to play the entire match despite his physical condition demonstrates the deep bonds that exist within football teams. His tribute highlights how the sport transcends competition, becoming about family, loyalty, and honoring those we care about.</p>

<h3>Impact on the Team</h3>
<p>Konaté's presence on the pitch provided emotional strength to his Liverpool teammates, who rallied together in what became more than just a football match—it became a tribute to their friend and colleague.</p>`,
                coverImage: "/ibrahima-konate-tribute.png",
                authorId: "sports-desk",
                authorName: "Football Features Writer",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Ibrahima Konaté", "Liverpool", "Tribute", "Premier League", "Team Spirit"],
                status: "published" as const,
                publishedAt: new Date("2025-01-25").toISOString(),
                views: 0,
                source: "Liverpool FC"
            },
            {
                title: "Luis Campos Wins Best Sporting Director at Globe Soccer Awards",
                slug: "luis-campos-best-sporting-director-globe-soccer-2025",
                excerpt: "Paris Saint-Germain's Luis Campos has been named Best Sporting Director at the Globe Soccer Awards 2025, recognizing his exceptional work in building PSG's squad.",
                content: `<p>Paris Saint-Germain director Luis Campos has been honored with the Best Sporting Director Award at the prestigious Globe Soccer Awards 2025, capping off a remarkable year for the Portuguese football executive.</p>

<h3>Masterful Squad Building</h3>
<p>Campos has been instrumental in reshaping PSG's squad, making shrewd signings and developing a clear sporting vision for the club. His work has been crucial in PSG's success both domestically and in European competition.</p>

<h3>Strategic Vision</h3>
<p>Under Campos' guidance, PSG has moved away from purely galáctico signings toward a more balanced approach that combines star power with young talent and tactical cohesion. This strategy has paid dividends on the pitch.</p>

<h3>Recognition from Peers</h3>
<p>The Globe Soccer Award recognizes Campos among the elite sporting directors in world football. His ability to identify talent, negotiate deals, and build a competitive squad has set new standards in football administration.</p>

<h3>PSG's Continued Success</h3>
<p>This award comes as part of PSG's dominant showing at the Globe Soccer Awards, with the club also winning Best Club and Ousmane Dembélé taking home the World's Best Player award—testament to Campos' excellent recruitment.</p>`,
                coverImage: "/luis-campos-award.png",
                authorId: "sports-desk",
                authorName: "Football Management Correspondent",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Luis Campos", "PSG", "Globe Soccer Awards", "Sporting Director", "Football Management"],
                status: "published" as const,
                publishedAt: new Date("2025-01-24").toISOString(),
                views: 0,
                source: "Globe Soccer Awards"
            },
            {
                title: "Raphinha Wins Best La Liga Player at Globe Soccer Awards",
                slug: "raphinha-best-la-liga-player-globe-soccer-2025",
                excerpt: "Barcelona captain Raphinha has been crowned Best La Liga Player at the Globe Soccer Awards 2025, recognizing his outstanding performances for the Catalan club.",
                content: `<p>Barcelona's Raphinha has been awarded the Best La Liga Player accolade at the Globe Soccer Awards 2025, cementing his status as one of the top performers in Spanish football this season.</p>

<h3>Leadership and Performance</h3>
<p>Since taking on greater responsibility at Barcelona, including wearing the captain's armband on occasions, Raphinha has elevated his game to new heights. His goals, assists, and overall play have been crucial to Barcelona's campaign.</p>

<h3>Consistency at the Highest Level</h3>
<p>The Brazilian winger has shown remarkable consistency throughout the season, delivering match-winning performances in both La Liga and European competition. His work rate, technical ability, and tactical intelligence have made him indispensable to Barcelona.</p>

<h3>Evolution as a Player</h3>
<p>Raphinha's development at Barcelona has been impressive. After an initial period of adaptation, he has become one of the team's most important players, combining his natural flair with improved decision-making and finishing.</p>

<h3>Recognition Well Deserved</h3>
<p>This award recognizes Raphinha's contribution to Barcelona's success and his standing among La Liga's elite players. His performances have drawn praise from coaches, teammates, and opponents alike.</p>`,
                coverImage: "/raphinha-award.png",
                authorId: "sports-desk",
                authorName: "La Liga Correspondent",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Raphinha", "Barcelona", "Globe Soccer Awards", "La Liga", "Brazilian Football"],
                status: "published" as const,
                publishedAt: new Date("2025-01-24").toISOString(),
                views: 0,
                source: "Globe Soccer Awards"
            },
            {
                title: "Ruben Neves Transfer Saga: European Giants Circle as Al Hilal Deal Stalls",
                slug: "ruben-neves-transfer-european-clubs-2025",
                excerpt: "Ruben Neves has not signed a new deal with Al Hilal despite weeks of negotiations, with several top European clubs now making approaches for a potential January move.",
                content: `<p>Ruben Neves' future at Al Hilal remains uncertain as the Portuguese midfielder has not signed a new contract despite a proposal being on the table for weeks. With his current deal expiring in June 2026, several European top clubs have started making approaches.</p>

<h3>Contract Standoff</h3>
<p>Al Hilal has offered Neves a new deal to extend his stay in Saudi Arabia, but the midfielder has not committed to the proposal. This delay has alerted top European clubs who see an opportunity to bring the talented midfielder back to Europe.</p>

<h3>European Interest Intensifies</h3>
<p>Several European top clubs have started making approaches over a potential move in January. The situation is being seen as a potential big opportunity in the midfield market, with Neves' quality and experience making him an attractive target.</p>

<h3>Al Hilal's Dilemma</h3>
<p>With Neves' contract running down, Al Hilal faces a difficult decision: accept a January transfer fee or risk losing him for free in 18 months. The club's investment in the player makes this a significant financial consideration.</p>

<h3>What's Next?</h3>
<p>The January transfer window could prove decisive for Neves' future. If he doesn't sign a new Al Hilal contract soon, a return to European football appears increasingly likely, with multiple clubs ready to make their move.</p>`,
                coverImage: "/ruben-neves-transfer.png",
                authorId: "sports-desk",
                authorName: "Transfer News Correspondent",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Ruben Neves", "Al Hilal", "Transfer News", "Saudi Pro League", "European Football"],
                status: "published" as const,
                publishedAt: new Date("2025-01-26").toISOString(),
                views: 0,
                source: "Transfer Market Sources"
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
        console.error('Error in addMoreSportsArticles:', error);
    }
}

addMoreSportsArticles();
