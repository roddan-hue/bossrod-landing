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
];

export const TECH_STACK = [
  { name: 'TypeScript', category: 'lang' },
  { name: 'React', category: 'ui' },
  { name: 'Node.js', category: 'runtime' },
  { name: 'REST APIs', category: 'api' },
  { name: 'Tailwind', category: 'css' },
  { name: 'Git', category: 'vcs' },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/roddan-hue',
};
