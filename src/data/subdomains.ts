export interface SubdomainProject {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  badge: string;
  tagline: string;
  description: string;
  techStack: string[];
  previewType: 'movies' | 'shop' | 'generic';
  // Simplified — no accentColor needed in flat design
}

export const SUBDOMAINS: SubdomainProject[] = [
  {
    id: 'movies',
    name: 'Movies',
    subdomain: 'movies.bossrod.com',
    url: 'https://movies.bossrod.com',
    badge: 'entertainment',
    tagline: 'cinematic discovery & media intelligence',
    description:
      'curated movie catalog with real-time ratings, trailers, and watchlist tracking. powered by TMDB.',
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
    techStack: ['React', 'Node.js', 'AWS DynamoDB', 'SerpAPI'],
    previewType: 'shop',
  },
];

export const TECH_STACK = [
  { name: 'TypeScript', category: 'lang' },
  { name: 'React', category: 'ui' },
  { name: 'Node.js', category: 'runtime' },
  { name: 'AWS Cloud', category: 'infra' },
  { name: 'DynamoDB', category: 'db' },
  { name: 'Tailwind', category: 'css' },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/roddan-hue',
  linkedin: 'https://www.linkedin.com/in/rod-daniel-bagares-122347108',
  email: 'contact@bossrod.com',
};
