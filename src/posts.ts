/**
 * LinkedIn posts shown in the Posts section. Each card opens the real post, and
 * those links work for visitors who are not signed in.
 *
 * Images live in `public/` because LinkedIn's image links expire. Left out on
 * purpose: the two posts that still contain template placeholders (9 Oct and
 * 18 Sep 2026), a near duplicate DriftWatch post, and images that show QR
 * codes, barcodes, ticket codes or a student registration number.
 */

export const categories = ['Results', 'Builds', 'Patents', 'Events', 'Milestones'] as const;
export type Category = (typeof categories)[number];

export type Post = {
  id: string;
  /** ISO date, decoded from the post's activity id. */
  date: string;
  category: Category;
  title: string;
  excerpt: string;
  image?: { src: string; alt: string; width: number; height: number };
};

const li = (id: string, alt: string, width: number, height: number) => ({ src: `/linkedin/${id}.webp`, alt, width, height });
const work = (name: string, alt: string) => ({ src: `/work/${name}.webp`, alt, width: 1200, height: 750 });

export const posts: Post[] = [
  {
    id: '7524811339861721088',
    date: '2026-11-07',
    category: 'Events',
    title: 'Bengaluru Skill Summit 2026',
    excerpt:
      'My biggest takeaway: preparing for the future of work means building AI literacy alongside human skills like critical thinking, creativity and adaptability.',
    image: li('7524811339861721088', 'Speakers on stage at the Bengaluru Skill Summit, seen from the audience', 480, 640),
  },
  {
    id: '7523398960288280576',
    date: '2026-11-03',
    category: 'Events',
    title: 'Beyond Borders: Build, Fund and Scale',
    excerpt: 'Enjoyed hearing Shourya Agarwal and Malhar Patil talk about building Flam, fundraising and scaling a startup.',
    image: li('7523398960288280576', 'Outside the HustleHub office building in Bengaluru', 720, 959),
  },
  {
    id: '7522923508298035200',
    date: '2026-11-02',
    category: 'Events',
    title: 'Lexsi AI Alignment and Safety Hackathon kickoff',
    excerpt: 'A walk through the Lexsi open-source stack. They were open about what each tool does and does not do.',
    image: li('7522923508298035200', 'Polaris School of Technology campus building in Bengaluru', 480, 480),
  },
  {
    id: '7522229283373625345',
    date: '2026-10-31',
    category: 'Builds',
    title: 'Live at Stranger Builds',
    excerpt: 'The mission: build something unexpected, ship it in seven days, and get real people using it.',
  },
  {
    id: '7521857591786815488',
    date: '2026-10-30',
    category: 'Builds',
    title: 'Untangle, submitted for hackFront India 2026',
    excerpt: 'Every codebase has that one line nobody dares to touch. The person who knew why it exists left two years ago.',
    image: li('7521857591786815488', 'Untangle poster showing 2,531 decisions identified and 891 superseded', 720, 900),
  },
  {
    id: '7521659923399766018',
    date: '2026-10-29',
    category: 'Builds',
    title: 'Team Vulcan enters the Lexsi AI Safety Hackathon',
    excerpt: 'An AI demo can look impressive. How do we prove the model behind it is reliable?',
  },
  {
    id: '7520821310600486912',
    date: '2026-10-27',
    category: 'Results',
    title: 'On Record wins Best Use of Sarvam',
    excerpt: '"Wait, who agreed to that?" One question. Three different memories. A meeting recording nobody wants to replay.',
    image: work('onrecord', 'On Record landing page with the headline Every meeting, remembered by who said it'),
  },
  {
    id: '7518040274451947520',
    date: '2026-10-19',
    category: 'Results',
    title: 'Helium wins the Neo4j Graph Builder Build Sprint',
    excerpt: 'What happens when AI can remember what was decided, why it was decided, who said it, and how that decision evolved over time?',
    image: li('7518040274451947520', 'Winner announcement for Team Vulcan at the Neo4j Build Sprint, with the team on stage', 393, 492),
  },
  {
    id: '7517638717742866432',
    date: '2026-10-18',
    category: 'Builds',
    title: 'Minutes: a company brain on FalkorDB',
    excerpt: 'Your team changed a decision on Tuesday. By Friday, three people were still working off the old one.',
    image: work('minutes', 'Minutes landing page with the headline Your company, with a memory'),
  },
  {
    id: '7516259272591310848',
    date: '2026-10-14',
    category: 'Builds',
    title: 'Heading to Hacktoberfest Hack Day Bengaluru',
    excerpt: '"We discussed this in a meeting." Six words. Forty minutes of searching. Still no answer.',
    image: li('7516259272591310848', 'Team Vulcan poster for the voice-first AI interaction track', 480, 599),
  },
  {
    id: '7515526124509270016',
    date: '2026-10-12',
    category: 'Builds',
    title: 'Team Vulcan registers for AgentVerse 2026',
    excerpt: 'Go beyond impressive demos and build something that actually works. What we are building stays classified for now.',
  },
  {
    id: '7515446850053660672',
    date: '2026-10-12',
    category: 'Builds',
    title: 'hackFront India builder pass',
    excerpt: "India doesn't have a talent problem. It has a discovery problem. The best way to get discovered is to build something worth noticing.",
  },
  {
    id: '7514677866261901312',
    date: '2026-10-10',
    category: 'Results',
    title: 'Shortlisted for Hacktoberfest Hack Day Bengaluru',
    excerpt: 'Out of 192 teams and 800+ participants, we made the 137 shortlisted teams.',
  },
  {
    id: '7511814871928201216',
    date: '2026-10-02',
    category: 'Builds',
    title: 'Registered for Graph Hacks',
    excerpt: 'Your AI agent forgets everything the moment the session ends. We are spending Oct 15 to 18 fixing that.',
  },
  {
    id: '7511510377977806848',
    date: '2026-10-01',
    category: 'Results',
    title: 'DriftWatch, a Top 50 submission',
    excerpt: 'Your scraper is green. But the information your product depends on has changed.',
    image: li('7511510377977806848', 'DriftWatch drift event screen', 480, 300),
  },
  {
    id: '7507023629994618880',
    date: '2026-09-19',
    category: 'Events',
    title: 'A day at First Commit IRL',
    excerpt: 'Learning from other builders, asking better questions, and exposing your ideas to different perspectives can change how you build.',
    image: li('7507023629994618880', 'Aditya at the Bharat Builds Tour photo frame at First Commit', 480, 594),
  },
  {
    id: '7505348557298630656',
    date: '2026-09-14',
    category: 'Builds',
    title: 'MedRail is live on TestNet',
    excerpt: 'An AI agent just paid for its own clinical workflow, end to end, with no human in the loop.',
    image: work('medrail', 'MedRail dashboard showing settled TestNet payments and active consent grants'),
  },
  {
    id: '7504253403280248832',
    date: '2026-09-11',
    category: 'Milestones',
    title: 'Viksit Bharat Young Leaders Dialogue quiz',
    excerpt: "An opportunity to engage with ideas around India's development, youth participation and leadership.",
    image: li('7504253403280248832', 'Certificate of participation for the VBYLD 2027 online quiz', 720, 574),
  },
  {
    id: '7497158729604292608',
    date: '2026-08-23',
    category: 'Builds',
    title: 'Day 1 of the Algorand Global x402 Challenge',
    excerpt: 'Clinical services an AI agent can discover, use and pay for, without an account, an API key, or permission from anyone except the patient.',
    image: li('7497158729604292608', 'Aditya in a co-working office on day one of the Algorand challenge', 720, 540),
  },
  {
    id: '7496452743859961856',
    date: '2026-08-21',
    category: 'Builds',
    title: 'Building DriftWatch',
    excerpt: 'Scrapers can fail silently. Worse, extraction can succeed while the meaning of the data changes.',
    image: li('7496452743859961856', 'Illustration of a data contract being checked', 720, 376),
  },
  {
    id: '7494803200512888832',
    date: '2026-08-16',
    category: 'Builds',
    title: 'MedRail shortlisted for the Global x402 Challenge',
    excerpt: '"The patient owns their data" is the easiest sentence in healthtech to say and the hardest to actually prove. So we put it on-chain.',
    image: li('7494803200512888832', 'Illustration of a medical cross, a lock and a coin on a rail', 720, 405),
  },
  {
    id: '7493713953655541760',
    date: '2026-08-13',
    category: 'Patents',
    title: 'Patent filed: influence-budgeted human flow coordination',
    excerpt: "In a crowded environment, physical space isn't the only scarce resource. People's attention and trust are limited too.",
    image: li('7493713953655541760', 'System diagram of the human flow coordination patent', 720, 480),
  },
  {
    id: '7492141907930763264',
    date: '2026-08-09',
    category: 'Patents',
    title: 'Patent filed: evaluating audit report quality',
    excerpt: 'Every audit report is ultimately judged by one tired human reading it at 11pm. We decided that should not be the last line of defence.',
    image: li('7492141907930763264', 'Architecture diagram of the multi-agent audit report evaluator', 720, 943),
  },
  {
    id: '7490465286605656064',
    date: '2026-08-04',
    category: 'Patents',
    title: 'Patent filed: trust-aware inference orchestration',
    excerpt: 'Most systems that run multiple AI models in parallel route traffic by basic health checks or CPU load.',
    image: li('7490465286605656064', 'Diagram of the trust-aware inference orchestration system', 720, 900),
  },
  {
    id: '7487097687230685184',
    date: '2026-07-26',
    category: 'Patents',
    title: 'Patent filed: Secure Glide',
    excerpt: "Vehicle theft is usually caught after the fact, on a camera somewhere, way too late to matter.",
    image: li('7487097687230685184', 'Block diagram of the ESP32 vehicle security system', 720, 377),
  },
  {
    id: '7463475356885233664',
    date: '2026-05-22',
    category: 'Milestones',
    title: 'Joined Zapper Edge',
    excerpt: 'I accepted an internship offer as Software Builder 1 Intern at Zapper Edge.',
  },
  {
    id: '7374164490944368640',
    date: '2025-09-17',
    category: 'Events',
    title: 'Co-hosting the Visteon event at VIT',
    excerpt: 'The launch of the Visteon Scholar Program, hosted for over 1,000 students, and the honor of introducing Mohammed Azad Abdul Kareem.',
    image: li('7374164490944368640', 'Aditya holding a microphone in the audience at the Visteon event at VIT', 720, 480),
  },
  {
    id: '7344067976142180353',
    date: '2025-06-26',
    category: 'Milestones',
    title: 'Summer internship at ESoft',
    excerpt: 'About my recent summer internship at ESoft, Lucknow.',
  },
  {
    id: '7344063416858308608',
    date: '2025-06-26',
    category: 'Milestones',
    title: 'Outreach Head, VIT Cycling Club',
    excerpt: 'Certificate of my board position in the VIT Cycling Club as the Outreach Head.',
  },
  {
    id: '7310380976612724736',
    date: '2025-03-25',
    category: 'Events',
    title: 'Bull Run at VIT',
    excerpt: 'Three days of trading strategy and paper trading, run by the Bulls and Bears Club of VIT.',
  },
  {
    id: '7267116115107950592',
    date: '2024-11-26',
    category: 'Milestones',
    title: 'Started at 1% Club',
    excerpt: "I'm happy to share that I've started my stock market mastery at 1% Club.",
  },
];
