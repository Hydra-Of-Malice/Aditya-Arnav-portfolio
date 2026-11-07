/**
 * Every fact the page shows lives here, next to the link that proves it.
 *
 * The site's one rule: a claim carries a source. If something cannot link to a
 * repo, a demo or a post, it either says so plainly or it does not go on the
 * page. Nothing here comes from a private repository. Those hold confidential
 * and unfiled patent work.
 */

export const LINKEDIN = 'https://www.linkedin.com/in/aditya-arnav-76a0222a1';
export const GITHUB = 'https://github.com/Hydra-Of-Malice';

export const postUrl = (id: string) => `https://www.linkedin.com/feed/update/urn:li:activity:${id}/`;
const repo = (name: string) => `${GITHUB}/${name}`;

export type Source = { kind: 'post' | 'repo' | 'demo'; href: string };

const post = (id: string): Source => ({ kind: 'post', href: postUrl(id) });
const code = (href: string): Source => ({ kind: 'repo', href });
const demo = (href: string): Source => ({ kind: 'demo', href });

export const person = {
  name: 'Aditya Arnav',
  title: 'AI Engineer',
  email: 'mr.aditya30112003@gmail.com',
  github: GITHUB,
  linkedin: LINKEDIN,
  leetcode: 'https://leetcode.com/HydraOfMalice',
  location: 'Bangalore, India',
  timezone: 'Asia/Kolkata',
};

export const hero = {
  headline: 'I build AI systems that show their evidence',
  text: "I'm Aditya Arnav, an AI engineer at Zapper Edge in Bangalore. I work on speech pipelines, agent memory and the backend services under them. Every claim on this page links to its repo, demo or post.",
};

/** The hero's trace. Demo data from the Orbit workspace in the Minutes repo. */
export const trace = {
  project: 'Minutes',
  workspace: 'Orbit workspace, demo data',
  changes: [
    { from: 'Bottom tab bar', to: 'Side drawer' },
    { from: 'Razorpay', to: 'PayU' },
  ],
  work: [
    { title: 'Review navigation accessibility tests', owner: 'Sana', flagged: true },
    { title: 'Update the payment integration runbook', owner: 'Priya', flagged: true },
    { title: 'Refresh the UPI release handoff', owner: 'Rahul', flagged: true },
    { title: 'Maintain the October release checklist', owner: 'Aditya', flagged: false },
    { title: 'Archive the original vendor sandbox spike', owner: 'Priya', flagged: false },
  ],
  caption: 'Change a decision and Minutes walks the graph to the work that depended on it',
};

export const about = [
  "I got into engineering through drones. I'm a DGCA-certified pilot, and I still work the same way: build it, fly it, see what breaks.",
  'At Zapper Edge I build the backend for an AI meeting platform. It runs real-time multilingual transcription, speaker diarization and summaries on FastAPI, Whisper, Azure OpenAI, Redis and Docker.',
  "I'm finishing a B.Tech in Computer Science (Business Systems) at VIT Vellore, and I enter hackathons around Bengaluru with Team Vulcan.",
];

export const stack = {
  intro: 'I ship AI products end to end, from the model call to the queue, the API and the screen in front of the user.',
  groups: [
    { label: 'Languages', items: ['Python', 'TypeScript', 'Go', 'Java', 'C++', 'C', 'JavaScript', 'SQL', 'Bash'] },
    {
      label: 'AI and ML',
      items: [
        'LLMs',
        'RAG',
        'Agents',
        'LangChain',
        'FAISS',
        'Whisper',
        'Faster-Whisper',
        'Azure OpenAI',
        'PyTorch',
        'TensorFlow',
        'Scikit-learn',
        'YOLO',
        'OpenCV',
      ],
    },
    { label: 'Graphs and data', items: ['Neo4j', 'FalkorDB', 'PostgreSQL', 'Redis', 'MySQL', 'MongoDB', 'SQLite'] },
    { label: 'Backend', items: ['FastAPI', 'Django', 'Flask', 'Spring Boot', 'Node.js', 'Express', 'REST', 'GraphQL'] },
    { label: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Tailwind CSS'] },
    {
      label: 'Cloud and DevOps',
      items: ['AWS', 'Azure AI Foundry', 'GCP', 'Docker', 'GitHub Actions', 'Nginx', 'Linux', 'Playwright'],
    },
    { label: 'Licence', items: ['Licensed drone pilot, DGCA approved'] },
  ],
};

export type Project = {
  id: string;
  name: string;
  year: string;
  /** The event or employer it was built for. */
  context: string;
  team?: string;
  /** A placing, shown ahead of the summary. */
  result?: string;
  summary: string;
  /** One measured claim. */
  proof?: string;
  details: string[];
  stack: string[];
  image?: { src: string; alt: string };
  sources: Source[];
  /** Said plainly when there is nothing public to link to. */
  note?: string;
};

export const projects: Project[] = [
  {
    id: 'minutes',
    name: 'Minutes',
    year: '2026',
    context: 'Graph Hacks, WeMakeDevs and FalkorDB',
    team: 'Team Vulcan, with Pallab Das, Yuvraj Singh and Rudra Pratap',
    summary: 'A company brain on FalkorDB that remembers who owns the work and why each decision changed',
    proof: '200 agents across 20 graphs ran with zero errors',
    details: [
      'Minutes connects meeting transcripts and email threads to people, decisions and commitments in one graph. Every answer shows the meeting moment behind it, who said it and the Cypher query that found it.',
      'Every fact records when it became true and when it stopped, so "what did we believe on September 16?" is one graph query. When 25 agents race for the same task, a single atomic Cypher query settles which one wins.',
      'We also benchmarked FalkorDB 6.0 against 4.22 on agent-shaped workloads and measured about 30% more throughput on 6.0.',
    ],
    stack: ['FalkorDB', 'Cypher', 'Python', 'Multi-agent'],
    image: { src: '/work/minutes.webp', alt: 'Minutes landing page with the headline Your company, with a memory' },
    sources: [
      demo('https://minutes.pallabdas.me'),
      code(repo('FalkorDB')),
      post('7517638717742866432'),
    ],
  },
  {
    id: 'untangle',
    name: 'Untangle',
    year: '2026',
    context: 'hackFront India',
    team: 'Team Vulcan, with Sri Ram, Pallab Das and Yuvraj Singh',
    summary: 'Answers why the code is like this, by tracing a config value, dependency or file back to the decision behind it',
    proof: 'Found 2,531 decisions in knadh/listmonk, 891 of them superseded',
    details: [
      'Untangle connects git history, pull requests, reviews, issues, docs and config changes in a Neo4j decision graph. When a new decision replaces an old one, it links them, so you can ask what was true on a specific date.',
      'It uses Sarvam AI to transcribe Hinglish handover calls and connect them to code. A claim from a call is marked as confirming or contradicting recorded history. It never overwrites that history, and it says "I don\'t know" when the graph lacks evidence.',
    ],
    stack: ['Neo4j', 'Sarvam AI', 'Python', 'GraphRAG'],
    image: { src: '/work/untangle.webp', alt: 'Untangle landing page with the headline Why is the code like this?' },
    sources: [
      demo('https://untangle.pallabdas.me'),
      code(repo('Untangle')),
      post('7521857591786815488'),
    ],
  },
  {
    id: 'onrecord',
    name: 'On Record',
    year: '2026',
    context: 'Hacktoberfest Hack Day Bengaluru',
    team: 'With Pallab Das and Aditi Akansha',
    result: 'Best Use of Sarvam',
    summary: 'Connects meetings, decisions and documents so a team can trace any answer back to who said it',
    proof: 'Answers link to the exact meeting moment or document page',
    details: [
      'On Record produces speaker-attributed transcripts, pulls out decisions and action items backed by quotes, and keeps a history that connects new decisions to the ones they replace.',
      'Sarvam Vision reads PDFs and scanned documents, Mayura translates answers into Indian languages and Bulbul reads them aloud. The win came with 5,000 Sarvam credits.',
    ],
    stack: ['Python', 'Sarvam Vision', 'Mayura', 'Bulbul'],
    image: { src: '/work/onrecord.webp', alt: 'On Record landing page with the headline Every meeting, remembered by who said it' },
    sources: [
      demo('https://onrecord.pallabdas.me'),
      code('https://github.com/PDGamerSG/On-Record'),
      post('7520821310600486912'),
    ],
  },
  {
    id: 'medrail',
    name: 'MedRail',
    year: '2026',
    context: 'Algorand Global x402 Challenge',
    team: 'Team Litchi, with Rudra Pratap and Yuvraj Singh',
    result: 'Top Performer, PreHack BLR',
    summary: 'Clinical APIs an AI agent can discover, pay for and use, with no account and no API key',
    proof: '121 automated tests, and an agent run of $0.09 across 3 settled transactions',
    details: [
      'MedRail sells symptom triage and drug-interaction checks per call over the x402 protocol, settled in USDC on Algorand. A third endpoint releases a patient record only against a consent grant the patient signed with their own key.',
      'One record call is three confirmed transactions: the consent grant, the settled payment and the audit write. The ledger is the system of record, so there is no database, cache or queue.',
      'We published an engineering gap report with 37 findings, 25 resolved and 12 open, because a system that touches patient data should be judged on what it does not do yet.',
    ],
    stack: ['TypeScript', 'Hono', 'Next.js', 'Algorand Python', 'x402', 'USDC'],
    image: { src: '/work/medrail.webp', alt: 'MedRail dashboard showing settled TestNet payments and active consent grants' },
    sources: [
      demo('https://medrail-1.onrender.com/'),
      code(repo('Medrail')),
      post('7505348557298630656'),
    ],
  },
  {
    id: 'defectforge',
    name: 'Defect Forge',
    year: '2026',
    context: 'Meta Global AI Developer Hackathon',
    summary: 'Finds the smallest defect a visual inspector still catches, with no real defect photos',
    proof: 'About $0.02 and 25 seconds per labeled defect',
    details: [
      'A new production line has no defect photos, so nobody knows what its inspection will miss. Defect Forge reads a QA spec, paints realistic defects onto photos of good parts and measures where detection drops, in millimetres.',
      'Each forged defect has a known mask, so the test is a measurement and not a model grading itself. Every pixel outside the defect stays byte-identical to the original.',
    ],
    stack: ['TypeScript', 'Muse Image', 'SAM 3.1', 'Muse Spark'],
    image: { src: '/work/defectforge.webp', alt: 'Defect Forge workspace with a grid of forged defects on photographed parts' },
    sources: [demo('https://defect-forge-kappa.vercel.app'), code(repo('defect_forge'))],
  },
  {
    id: 'driftwatch',
    name: 'DriftWatch',
    year: '2026',
    context: 'WeMakeDevs and Bright Data, Into the Scrape-Verse',
    result: 'Top 50',
    summary: 'Turns the public pages a product depends on into versioned data contracts that repair themselves',
    proof: '23 tests walk all five drift classes end to end',
    details: [
      'Scrapers can fail silently, and the worst case is extraction that succeeds while the meaning changes. A provider keeps the headline price and changes the unit underneath it. No selector catches that.',
      'Nothing reaches analytics until it clears four gates: shape, invariants, unit anchors and continuity against history. A snapshot that fails one is quarantined. A heal that reports success still has to pass the same gates.',
    ],
    stack: ['Python', 'Flask', 'JavaScript', 'Bright Data Scraper Studio'],
    image: { src: '/work/driftwatch.webp', alt: 'DriftWatch console showing a page contract and its drift status' },
    sources: [code(repo('Driftwatch')), post('7511510377977806848')],
  },
];

/** Shown as a compact list under the main projects. */
export const moreProjects: Project[] = [
  {
    id: 'helium',
    name: 'Helium',
    year: '2026',
    context: 'Neo4j Graph Builder: Build Sprint',
    team: 'Team Vulcan, with Aditi Akansha and Pallab Das',
    result: 'Winner',
    summary: 'Agent memory on Neo4j that keeps what was decided, why, who said it and how it changed',
    details: [],
    stack: ['Neo4j'],
    sources: [post('7518040274451947520')],
  },
  {
    id: 'meeting',
    name: 'Meeting Intelligence Platform',
    year: '2026',
    context: 'Zapper Edge',
    summary: 'Live transcription, speaker diarization and LLM summaries through automated Google Meet and Zoom bots',
    details: [],
    stack: ['FastAPI', 'Faster-Whisper', 'Azure OpenAI', 'Redis'],
    sources: [],
    note: 'Company code',
  },
  {
    id: 'orquis',
    name: 'ORQUIS',
    year: '2026',
    context: 'Personal project',
    summary: 'Turns raw Excel and CSV exports into dashboards, written insight and PowerPoint reports',
    details: [],
    stack: ['Azure OpenAI', 'RAG', 'FastAPI', 'React'],
    sources: [],
    note: 'Private code',
  },
  {
    id: 'biomedical',
    name: 'Biomedical Waste Detection',
    year: '2025',
    context: 'Team project',
    summary: 'A custom YOLOv8 model trained on 1,500+ annotated images, at 91% detection accuracy',
    details: [],
    stack: ['YOLOv8', 'React', 'Flask', 'OpenCV'],
    sources: [code(repo('biomedical-waste-segmentation'))],
  },
  {
    id: 'voice',
    name: 'Voice Clone Studio',
    year: '2026',
    context: 'Personal project',
    summary: 'Clones your voice from one recording and reads Hindi, Hinglish or English scripts, entirely on your own GPU',
    details: [],
    stack: ['Python'],
    sources: [code(repo('voice-clone-studio'))],
  },
  {
    id: 'sketchup',
    name: 'SketchUp Bridge for ChatGPT',
    year: '2026',
    context: 'Personal project',
    summary: 'A Windows tray app that lets ChatGPT build and edit SketchUp Pro models over MCP',
    details: [],
    stack: ['Python', 'MCP'],
    sources: [code(repo('SketchUp-2022-ChatGPT-MCP'))],
  },
  {
    id: 'society',
    name: 'Society Maintenance Tracker',
    year: '2026',
    context: 'Personal project',
    summary: 'Tracks apartment complaints from report to fix, with SLA alerts and repeat-problem hotspots',
    details: [],
    stack: ['JavaScript'],
    sources: [code(repo('unthinkable-Societal-Maintenance'))],
  },
];

export type Patent = {
  title: string;
  status: string;
  reference?: string;
  summary: string;
  people?: string;
  sources: Source[];
};

/**
 * Filings as described in public LinkedIn posts. Status, numbers and inventors
 * are waiting on the owner's own patent records.
 */
export const patents: Patent[] = [
  {
    title: 'Influence-Budgeted Human Flow Coordination System',
    status: 'Filed',
    summary:
      "Treats people's attention and trust as a budget when coordinating crowds. Plans run on-device and the central system only sees aggregates, so it never tracks individual routes.",
    sources: [post('7493713953655541760')],
  },
  {
    title: 'Computer-Implemented System and Method for Evaluating Quality of an Audit Report',
    status: 'Filed',
    reference: 'Indian Patent Office, Chennai',
    summary:
      'Five AI agents score a report against a graph that ties each finding to its evidence. The final index traces back to a sentence, and confident claims with no proof lose weight.',
    people: 'With Yuvraj Singh, Amrita Roy and Rudra Pratap, guided by Prof. Hashida Haidros Rahima Manzil',
    sources: [post('7492141907930763264')],
  },
  {
    title: 'Trust-Aware Hierarchical Multi-Pipeline Inference Orchestration System',
    status: 'Filed',
    reference: 'VIT IPR Cell Ref 20264102479',
    summary:
      'Gives every inference pipeline a live trust score from latency and consistency. In 14 test cycles trust converged above 0.9 with zero false quarantines.',
    people: 'With A. Anny Leema, P. Balakrishnan and Rudra Pratap',
    sources: [post('7490465286605656064')],
  },
  {
    title: 'Secure Glide',
    status: 'Filed',
    reference: 'Ref 202641068231',
    summary: 'An ESP32 anti-theft system for vehicles that reacts on-device the moment something is wrong, with IoT monitoring',
    people: 'Co-inventor',
    sources: [post('7487097687230685184')],
  },
];

export const approach = {
  lead: 'Anyone can get a model to answer once. The work is everything around it: the timeout, the retry, the queue that drains, the trace you can read at 3am when it does not.',
  points: [
    'Every model call gets a timeout, a retry and a budget',
    'p99 is the number that matters, not the demo',
    'Agents are only as good as the contracts between them',
    "If it can't be replayed, it can't be debugged",
  ],
};

export type Result = {
  date: string;
  placing: string;
  event: string;
  project: string;
  sources: Source[];
};

export const results: Result[] = [
  {
    date: 'Oct 2026',
    placing: 'Winner',
    event: 'Neo4j Graph Builder: Build Sprint, Bengaluru',
    project: 'Helium',
    sources: [post('7518040274451947520')],
  },
  {
    date: 'Oct 2026',
    placing: 'Best Use of Sarvam',
    event: 'Hacktoberfest Hack Day Bengaluru',
    project: 'On Record',
    sources: [post('7520821310600486912')],
  },
  {
    date: 'Oct 2026',
    placing: 'Top 50',
    event: 'WeMakeDevs and Bright Data, Into the Scrape-Verse',
    project: 'DriftWatch',
    sources: [post('7511510377977806848')],
  },
  {
    date: 'Aug 2026',
    placing: 'Top Performer',
    event: 'x402 Global Challenge PreHack, BLR Edition',
    project: 'MedRail',
    sources: [{ kind: 'post', href: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7498321881759096832/' }],
  },
];

export type Role = {
  company: string;
  role: string;
  period: string;
  place?: string;
  points: string[];
};

export const experience: Role[] = [
  {
    company: 'Zapper Edge',
    role: 'Artificial Intelligence Engineer',
    period: 'Sep 2026 to present',
    points: [
      'Architected a production AI meeting platform on FastAPI microservices, Faster-Whisper and Azure OpenAI.',
      'Shipped real-time multilingual transcription, speaker diarization and LLM summaries through Google Meet and Zoom bots built on Playwright and WebRTC.',
      'Built the Redis async pipeline with PostgreSQL, Docker Compose and Nginx, plus action-item extraction and zero-downtime restarts.',
    ],
  },
  {
    company: 'Zapper Edge',
    role: 'Software Builder - 1 Intern',
    period: 'May 2026 to Aug 2026',
    place: 'Remote',
    points: [
      'Built the FastAPI backend for a real-time meeting transcription pipeline across Docker microservices.',
      'Integrated Whisper and Faster-Whisper for live speech-to-text, and Azure OpenAI for summaries and action items.',
    ],
  },
  {
    company: 'BlankSage',
    role: 'Software Engineer Intern',
    period: 'May 2026 to Jun 2026',
    points: [
      'Delivered the User Settings module and document-export engine in Go and React, with WorkOS 2FA.',
      'Standardised Go REST API error handling and drove Goose migrations and GitHub Actions CI/CD improvements.',
    ],
  },
  {
    company: 'Self-employed',
    role: 'Drone Engineer',
    period: 'Jan 2024 to Jul 2026',
    place: 'Vellore',
    points: [
      'Built an AI drone for search and rescue, running real-time object detection on a Raspberry Pi with YOLOv5, TensorFlow, OpenCV and ArduPilot.',
    ],
  },
  {
    company: 'e.Soft Technologies',
    role: 'Software Development Intern',
    period: 'Jun 2025 to Jul 2025',
    place: 'Lucknow',
    points: [
      'Built an AI-integrated hotel management system in Python, Django and SQL, with OpenCV and TensorFlow models reading live camera feeds.',
    ],
  },
];

export const education = [
  { school: 'VIT Vellore', detail: 'B.Tech, Computer Science Engineering (Business Systems)', period: '2023 to 2027', score: 'CGPA 8.77' },
  { school: 'White Leaf Bhavana', detail: 'Class XII, CBSE', period: '2022', score: '86%' },
  { school: 'Delhi Public School, Patna', detail: 'Class X, CBSE', period: '2020', score: '95%' },
];

export const alsoDid: { text: string; sources: Source[] }[] = [
  { text: 'Co-hosted the Visteon Scholar Program launch at VIT, for over 1,000 students', sources: [post('7374164490944368640')] },
  { text: 'Outreach Head, VIT Cycling Club', sources: [post('7344063416858308608')] },
];

export const stats = [
  { label: 'Patent filings', value: `${patents.length}` },
  { label: 'Hackathon results', value: `${results.length}` },
  { label: 'Projects on this page', value: `${projects.length + moreProjects.length}` },
  { label: 'CGPA at VIT Vellore', value: '8.77' },
];
