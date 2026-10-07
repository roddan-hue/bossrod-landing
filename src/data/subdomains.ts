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
    badge: 'multiplayer / gaming',
    tagline: 'real-time 4-player multiplayer & bot lobbies',
    description:
      'browser-based asian mahjong engine. instant websocket rooms, shareable invite links, and serverless matchmaking.',
    techStack: ['React', 'TypeScript', 'WebSockets', 'AWS Serverless'],
    previewType: 'mahjong',
  },
  {
    id: 'garage',
    name: 'BossRod Garage',
    subdomain: 'garage.bossrod.com',
    url: 'https://garage.bossrod.com',
    badge: 'automotive / gear',
    tagline: 'ranked car gear & straight-talk buying guides',
    description:
      'curated automotive gear ranked like vinyl records. straight-talk verdicts on dash cams, tyre inflators, detailing kits & tools with no filler.',
    techStack: ['Astro', 'TypeScript', 'Tailwind', 'CloudFront'],
    previewType: 'generic',
  },
  {
    id: 'getjob',
    name: 'getJob',
    subdomain: 'getjob.bossrod.com',
    url: 'https://getjob.bossrod.com',
    badge: 'career / ai suite',
    tagline: 'australian career suite & job application tracker',
    description:
      'australian job discovery, ats resume tailoring & application tracker powered by gemini ai and cosmos db.',
    techStack: ['Next.js', 'TypeScript', 'Gemini AI', 'Cosmos DB'],
    previewType: 'generic',
  },
  {
    id: 'grocer',
    name: 'My Pantry Buddy',
    subdomain: 'grocer.bossrod.com',
    url: 'https://grocer.bossrod.com',
    badge: 'grocery / utility',
    tagline: 'realtime grocery price comparison & shared checklist',
    description:
      'live supermarket price comparison across Woolworths, Coles & ALDI with collaborative real-time grocery checklists.',
    techStack: ['React', 'FastAPI', 'Python', 'DynamoDB'],
    previewType: 'generic',
  },
  {
    id: 'quizme',
    name: 'QuizMe',
    subdomain: 'quizme.bossrod.com',
    url: 'https://quizme.bossrod.com',
    badge: 'ai / education',
    tagline: 'ai assessment & exam simulator',
    description:
      'automated question synthesis powered by gemini. multi-format testing, document upload parsing, and timed exam simulations.',
    techStack: ['Next.js', 'TypeScript', 'Gemini AI', 'Tailwind'],
    previewType: 'quizme',
  },
  {
    id: 'movies',
    name: 'Movies',
    subdomain: 'movies.bossrod.com',
    url: 'https://movies.bossrod.com',
    badge: 'entertainment',
    tagline: 'real-time popular films & trend scoring',
    description:
      'real-time directory of popular movies with search-driven trend scoring. focused strictly on data—no links, no trailers.',
    techStack: ['React', 'Vite', 'TMDB API', 'Tailwind'],
    previewType: 'movies',
  },
  {
    id: 'shop',
    name: 'TrendShop',
    subdomain: 'shop.bossrod.com',
    url: 'https://shop.bossrod.com',
    badge: 'e-commerce',
    tagline: 'google trends + amazon affiliate engine',
    description:
      'real-time geo-localised google trends fused with amazon product data. ai-enriched. automated.',
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
