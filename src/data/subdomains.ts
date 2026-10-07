export interface SubdomainProject {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  badge: string;
  tagline: string;
  description: string;
  techStack: string[];
  previewType: 'movies' | 'shop' | 'quizme' | 'mahjong' | 'generic';
}

export const SUBDOMAINS: SubdomainProject[] = [
  {
    id: 'asianmahjong',
    name: 'Asian Mahjong',
    subdomain: 'asianmahjong.com',
    url: 'https://asianmahjong.com',
    badge: 'multiplayer / real-time',
    tagline: 'high-concurrency multiplayer engine & game lobbies',
    description:
      'distributed browser mahjong platform featuring real-time websocket state synchronization, low-latency matchmaking, and automated session reconciliation.',
    techStack: ['React', 'TypeScript', 'WebSockets', 'AWS Serverless'],
    previewType: 'mahjong',
  },
  {
    id: 'garage',
    name: 'BossRod Garage',
    subdomain: 'garage.bossrod.com',
    url: 'https://garage.bossrod.com',
    badge: 'automotive / reviews',
    tagline: 'benchmarked automotive equipment & field testing index',
    description:
      'independent technical ratings and field-tested buying evaluations for touring, off-road expeditions, and vehicle maintenance in australian conditions.',
    techStack: ['Astro', 'TypeScript', 'Tailwind', 'CloudFront'],
    previewType: 'generic',
  },
  {
    id: 'getjob',
    name: 'getJob',
    subdomain: 'getjob.bossrod.com',
    url: 'https://getjob.bossrod.com',
    badge: 'career / ai suite',
    tagline: 'australian employment analytics & career tailoring suite',
    description:
      'localized employment opportunity discovery across australia, ats-targeted resume engineering powered by gemini ai, and encrypted pipeline management.',
    techStack: ['Next.js', 'TypeScript', 'Gemini AI', 'Cosmos DB'],
    previewType: 'generic',
  },
  {
    id: 'grocer',
    name: 'My Pantry Buddy',
    subdomain: 'grocer.bossrod.com',
    url: 'https://grocer.bossrod.com',
    badge: 'utility / market data',
    tagline: 'live australian grocery pricing index & collaborative checklist',
    description:
      'real-time retail price monitoring across Woolworths, Coles & ALDI with collaborative shared checklists and supermarket basket optimization.',
    techStack: ['React', 'FastAPI', 'Python', 'DynamoDB'],
    previewType: 'generic',
  },
  {
    id: 'quizme',
    name: 'QuizMe',
    subdomain: 'quizme.bossrod.com',
    url: 'https://quizme.bossrod.com',
    badge: 'ai / assessment',
    tagline: 'adaptive question synthesis & timed exam simulation engine',
    description:
      'automated assessment synthesis and curriculum evaluation powered by gemini ai. supports complex document parsing and proctored examination drills.',
    techStack: ['Next.js', 'TypeScript', 'Gemini AI', 'Tailwind'],
    previewType: 'quizme',
  },
  {
    id: 'movies',
    name: 'Movies',
    subdomain: 'movies.bossrod.com',
    url: 'https://movies.bossrod.com',
    badge: 'cinema / intelligence',
    tagline: 'real-time popular cinema index & trend scoring engine',
    description:
      'high-velocity film directory with quantitative popularity analytics and box-office trajectory tracking. strictly focused on clean metadata delivery.',
    techStack: ['React', 'Vite', 'TMDB API', 'Tailwind'],
    previewType: 'movies',
  },
  {
    id: 'shop',
    name: 'TrendShop',
    subdomain: 'shop.bossrod.com',
    url: 'https://shop.bossrod.com',
    badge: 'commerce / analytics',
    tagline: 'geo-localized search trends & automated commercial indexing',
    description:
      'demand analytics fusing real-time regional search telemetry with verified merchant product catalogs, enriched via automated machine learning pipelines.',
    techStack: ['React', 'Node.js', 'REST APIs', 'Tailwind'],
    previewType: 'shop',
  },
];

export const TECH_STACK = [
  { name: 'TypeScript', category: 'lang' },
  { name: 'React', category: 'ui' },
  { name: 'Next.js', category: 'framework' },
  { name: 'Astro', category: 'framework' },
  { name: 'Node.js', category: 'runtime' },
  { name: 'Python', category: 'backend' },
  { name: 'WebSockets', category: 'real-time' },
  { name: 'Tailwind', category: 'css' },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/roddan-hue',
};
