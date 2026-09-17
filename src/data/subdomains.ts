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
    id: 'mahjong',
    name: 'Mahjong',
    subdomain: 'mahjong.bossrod.com',
    url: 'https://mahjong.bossrod.com',
    badge: 'multiplayer / gaming',
    tagline: 'real-time 4-player multiplayer & bot lobbies',
    description:
      'browser-based mahjong engine. instant websocket rooms, shareable invite links, and serverless matchmaking.',
    techStack: ['React', 'TypeScript', 'WebSockets', 'AWS Serverless'],
    previewType: 'mahjong',
  },
];

export const TECH_STACK = [
  { name: 'TypeScript', category: 'lang' },
  { name: 'React', category: 'ui' },
  { name: 'Next.js', category: 'framework' },
  { name: 'Node.js', category: 'runtime' },
  { name: 'WebSockets', category: 'real-time' },
  { name: 'Tailwind', category: 'css' },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/roddan-hue',
};
