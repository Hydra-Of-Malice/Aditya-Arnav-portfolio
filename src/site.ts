/**
 * Everything the page renders, derived from `data.ts`.
 *
 * `data.ts` stays the single source of truth for résumé facts; this file
 * shapes those facts into the sections of the layout (hero, stickers, what I
 * do, features, cases, vision, numbers, identity, footer) so the components
 * never reach into `portfolioData` directly.
 */
import { portfolioData, type Project } from './data';

const { personalInfo, experience, education, research, projects, skills, stats } = portfolioData;

export const person = {
  ...personalInfo,
  /** The two words of the draggable hero title. */
  heroWords: ['ADITYA', 'ARNAV'] as const,
  /** The three lines under it. */
  heroLines: ['AI Software Engineer', 'Est. 2003', 'India'],
  /** Header logo mark. */
  logo: 'ADITYA ARNAV',
  resumeCta: 'GET RÉSUMÉ',
};

/** Footer / contact card. */
export const contact = {
  location: ['Bangalore,', 'Karnataka,', 'India'],
  timezone: personalInfo.timezone,
  email: personalInfo.email,
  socials: [
    { name: 'linkedin', label: 'LinkedIn', href: personalInfo.linkedin },
    { name: 'github', label: 'GitHub', href: personalInfo.github },
    { name: 'leetcode', label: 'LeetCode', href: personalInfo.leetcode },
    { name: 'mail', label: 'Email', href: `mailto:${personalInfo.email}` },
  ],
};

export const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#services' },
  { label: 'About', href: '#agency' },
  { label: 'Contact', href: '#contact', contact: true },
];

/* ------------------------------------------------------------------------ */
/* Stickers                                                                  */
/* ------------------------------------------------------------------------ */

export const stickers = {
  subtitle:
    'I build production AI systems that express real engineering through clean pipelines, honest latency budgets and services that keep running at 3am.',
  text: personalInfo.aboutText,
  /** Flashed one after another inside the white box. */
  badges: ['Python', 'FastAPI', 'React', 'Docker', 'Redis', 'PyTorch', 'Postgres', 'Go'],
  words: ['Vision.', 'Clarity.', 'Flow.', 'Execution.'],
};

/* ------------------------------------------------------------------------ */
/* What I do                                                                 */
/* ------------------------------------------------------------------------ */

export const whatIDo = {
  title: ['What', 'I', 'DO'] as const,
  text: 'I ship AI products end to end — from the model call to the queue, the API and the screen in front of the user.',
  columns: [
    ['LLM Applications', 'RAG Pipelines', 'Multi-Agent Systems', 'Prompt Engineering', 'Vector Search'],
    ['Real-Time Inference', 'Speech & Transcription', 'Computer Vision', 'Model Serving', 'Evaluation'],
    ['FastAPI Microservices', 'Go & Django Backends', 'PostgreSQL & Redis', 'Async Pipelines', 'REST & GraphQL'],
    ['React & TypeScript', 'Docker & CI/CD', 'Nginx & Linux', 'Azure & AWS', 'Observability'],
  ],
  approachTitle: 'MY APPROACH',
  quotes: [
    'I build the boring half of intelligence work — the part that has to keep running.',
    'Every model call gets a timeout, a retry and a budget.',
    'p99 is the number that matters, not the demo.',
    'Ship the microservice, then make it observable.',
    'Agents are only as good as the contracts between them.',
    "If it can't be replayed, it can't be debugged.",
    'Zero-downtime deploys are a habit, not a feature.',
    'Listen to the user first, then design the pipeline.',
  ],
};

/* ------------------------------------------------------------------------ */
/* Features (the hover-to-reveal rows with a 3D scene)                       */
/* ------------------------------------------------------------------------ */

export type Feature = {
  index: string;
  title: string;
  /** Scene id rendered by `FeatureScene`. */
  scene: 'agents' | 'backend' | 'frontend' | 'data';
  /** Two columns of words cycled beside the title while hovered. */
  words: [string[], string[]];
};

export const features: Feature[] = [
  {
    index: '(01)',
    title: 'AI Systems',
    scene: 'agents',
    words: [
      ['orchestration', 'retrieval', 'agents', 'evaluation'],
      ['latency', 'trust', 'consensus', 'memory'],
    ],
  },
  {
    index: '(02)',
    title: 'Backend & APIs',
    scene: 'backend',
    words: [
      ['throughput', 'queues', 'retries', 'schemas'],
      ['async', 'postgres', 'redis', 'nginx'],
    ],
  },
  {
    index: '(03)',
    title: 'Frontend & Product',
    scene: 'frontend',
    words: [
      ['flow', 'clarity', 'hierarchy', 'feedback'],
      ['react', 'typescript', 'motion', 'systems'],
    ],
  },
  {
    index: '(04)',
    title: 'Data & Vision',
    scene: 'data',
    words: [
      ['detection', 'training', 'labels', 'accuracy'],
      ['yolo', 'opencv', 'pandas', 'pytorch'],
    ],
  },
];

export const featuresCta = {
  title: 'Discover how I can help — request my résumé',
  button: 'GET MY COPY',
};

/* ------------------------------------------------------------------------ */
/* Cases                                                                     */
/* ------------------------------------------------------------------------ */

export type Case = {
  id: string;
  name: string;
  /** Short lowercase slug used to seed the generated artwork. */
  seed: number;
  /** Two-tone palette for the generated artwork. */
  palette: [string, string];
  size: 'big' | 'small';
  align?: 'top' | 'bottom' | 'center' | 'right';
  category: 'AI' | 'WEB' | 'RESEARCH';
  description: string[];
  tags: string[];
  links: { label: string; href: string }[];
  year: string;
};

function projectCase(
  p: Project,
  extra: Pick<Case, 'seed' | 'palette' | 'size' | 'category'> & Partial<Case>,
): Case {
  const links = [
    p.githubLink && { label: 'GitHub', href: p.githubLink },
    p.liveLink && { label: 'Live', href: p.liveLink },
  ].filter(Boolean) as Case['links'];
  return {
    id: p.title.split(' ')[0].toLowerCase().replace(/[^a-z]/g, ''),
    name: p.title.split(' — ')[0],
    description: [p.blurb, p.description],
    tags: p.techStack,
    links,
    year: p.year,
    ...extra,
  };
}

function byTitle(needle: string): Project {
  const found = projects.find((p) => p.title.startsWith(needle));
  if (!found) throw new Error(`site.ts: no project in data.ts starts with "${needle}" — update this reference.`);
  return found;
}

/** The big "Fresh Drop" at the top of the cases section. */
export const latestCase: Case = projectCase(byTitle('ORQUIS'), {
  seed: 11,
  palette: ['#1d1d1d', '#00fb96'],
  size: 'big',
  category: 'AI',
});

export const cases: Case[] = [
  projectCase(byTitle('MedRail'), {
    seed: 23,
    palette: ['#0d1b2a', '#7cc4ff'],
    size: 'big',
    category: 'AI',
  }),
  projectCase(byTitle('DriftWatch'), {
    seed: 37,
    palette: ['#1a1414', '#ff7a59'],
    size: 'small',
    category: 'AI',
  }),
  {
    id: 'meeting',
    name: 'Meeting Intelligence',
    seed: 41,
    palette: ['#101418', '#e4e4e4'],
    size: 'big',
    align: 'right',
    category: 'AI',
    year: '2026',
    description: [
      'Real-time transcription, diarization and LLM summaries for Google Meet and Zoom.',
      ...experience[0].descriptionPoints,
    ],
    tags: experience[0].stack,
    links: [],
  },
  projectCase(byTitle('Biomedical'), {
    seed: 53,
    palette: ['#141a14', '#b8ff5c'],
    size: 'small',
    align: 'top',
    category: 'RESEARCH',
  }),
  {
    id: 'blanksage',
    name: 'BlankSage Platform',
    seed: 61,
    palette: ['#16131c', '#c9b6ff'],
    size: 'small',
    align: 'bottom',
    category: 'WEB',
    year: '2026',
    description: [
      'User settings, document export and 2FA for a Go + React product.',
      ...experience[1].descriptionPoints,
    ],
    tags: experience[1].stack,
    links: [],
  },
  {
    id: 'trust',
    name: research[0].title.split(' Multi')[0],
    seed: 71,
    palette: ['#1b1b1b', '#ffd166'],
    size: 'big',
    align: 'center',
    category: 'RESEARCH',
    year: '2026',
    description: [research[0].description, `${research[0].role} · ${research[0].reference}`],
    tags: ['Patent', 'Multi-Agent', 'Trust Modelling', 'Consensus', 'Orchestration'],
    links: [],
  },
  {
    id: 'hotel',
    name: 'Hotel Workflow',
    seed: 83,
    palette: ['#1a1a12', '#f2e8c4'],
    size: 'big',
    category: 'WEB',
    year: '2025',
    description: ['A Django workflow platform with OpenCV occupancy checks.', ...experience[2].descriptionPoints],
    tags: experience[2].stack,
    links: [],
  },
  {
    id: 'glide',
    name: research[1].title,
    seed: 97,
    palette: ['#121a1a', '#5ef2e0'],
    size: 'small',
    align: 'top',
    category: 'RESEARCH',
    year: '2026',
    description: [research[1].description, `${research[1].role} · ${research[1].reference}`],
    tags: ['Patent', 'ESP32', 'IoT', 'Security'],
    links: [],
  },
];

export const caseCounts = (['AI', 'WEB', 'RESEARCH'] as const).map((category) => ({
  category,
  count: [latestCase, ...cases].filter((c) => c.category === category).length,
}));

/* ------------------------------------------------------------------------ */
/* Vision (about)                                                            */
/* ------------------------------------------------------------------------ */

export const vision = {
  title: 'Core Vision',
  subtitle:
    'Anyone can get a model to answer once. The work is everything around it: the timeout, the retry, the queue that drains, the trace you can read at 3am when it does not.',
  smallTitle:
    'I would rather ship a smaller system that holds under load than a demo that impresses once. Most of what I build is the plumbing nobody sees.',
  paragraphs: [
    'Every system I ship gets a timeout, a retry budget and a dashboard before it gets a feature.',
    'I work best as an extension of a team — writing the boring, load-bearing services and staying on for what comes after launch.',
    "Let's push what's possible with agents and inference, and keep it observable while we do.",
  ],
  tagline: "Let's challenge conventions and explore what's next in AI.",
  email: personalInfo.email,
};

export const resumeCta = {
  title: 'Discover how I can help — request my résumé',
  button: 'GET RÉSUMÉ',
};

/* ------------------------------------------------------------------------ */
/* Numbers / companies                                                       */
/* ------------------------------------------------------------------------ */

export const numbers = {
  title: ['Track', 'RECORD'] as const,
  counters: [
    { label: 'Engineering internships', value: `${experience.length}` },
    { label: 'Patents published', value: `${research.length}` },
    { label: 'CGPA at VIT Vellore', value: education[0].gpa.replace('CGPA ', '') },
    { label: 'Shipped projects', value: `${stats[3].value}${stats[3].suffix}` },
  ],
  columns: [
    experience.map((e) => e.company),
    [...education.map((e) => e.institution), 'VIT IPR Cell'],
    ['Algorand Foundation x402', 'WeMakeDevs × Bright Data', 'Azure AI Foundry'],
    skills.Cloud,
  ],
  kickOff: "Let's kick off",
};

/* ------------------------------------------------------------------------ */
/* Identity (the draggable timeline)                                         */
/* ------------------------------------------------------------------------ */

export const identity = {
  title: ['My', 'core', 'identity'] as const,
  words: ['An Engineer', 'Fueled', 'by Curiosity', 'and Vision'],
  text: 'A CS engineer at VIT Vellore working across AI, backend and product — bringing systems thinking to every layer of the stack.',
  slides: [
    ...experience.map((e) => ({ kind: 'work' as const, title: e.company, sub: e.role, meta: e.period })),
    ...education.map((e) => ({ kind: 'edu' as const, title: e.institution, sub: e.degree, meta: e.period })),
    ...research.map((r) => ({ kind: 'patent' as const, title: r.title, sub: r.role, meta: r.status })),
  ],
};

export const footer = {
  title: ['ARNAV', 'LNK'] as const,
  years: '23-',
  copyright: '© Aditya Arnav',
  link: { label: 'source code', href: `${personalInfo.github}/Aditya-Arnav-portfolio` },
};

export const contactForm = {
  title: ["Let's", 'Talk'] as const,
  success: ['thank you', 'Thanks for reaching out. I will reply by email shortly.'],
};
