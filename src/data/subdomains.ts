export interface SubdomainProject {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  badge: string;
  tagline: string;
  description: string;
  techStack: string[];
  accentColor: {
    border: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
    button: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  previewType: 'movies' | 'shop' | 'generic';
}

export const SUBDOMAINS: SubdomainProject[] = [
  {
    id: 'movies',
    name: 'Bossrod Movies',
    subdomain: 'movies.bossrod.com',
    url: 'https://movies.bossrod.com',
    badge: 'Entertainment & Streaming',
    tagline: 'Cinematic Discovery & Media Intelligence',
    description:
      'Curated movie catalog, real-time ratings, trailers, and personalized watchlists powered by seamless media tracking.',
    techStack: ['React', 'TMDB API', 'Tailwind CSS', 'Vite'],
    accentColor: {
      border: 'hover:border-purple-500/50',
      glow: 'rgba(168, 85, 247, 0.15)',
      badgeBg: 'bg-purple-500/10 border-purple-500/30',
      badgeText: 'text-purple-400',
      button: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/25',
    },
    metrics: [
      { label: 'Catalog', value: '10,000+' },
      { label: 'API Sync', value: 'Live' },
    ],
    previewType: 'movies',
  },
  {
    id: 'shop',
    name: 'Bossrod TrendShop',
    subdomain: 'shop.bossrod.com',
    url: 'https://shop.bossrod.com',
    badge: 'Automated E-Commerce',
    tagline: 'Google Trends & Amazon Affiliate Engine',
    description:
      'Real-time geo-localized Google Trends fused with Amazon product intelligence, automated AI summaries, and instant checkout tracking.',
    techStack: ['React', 'AWS DynamoDB', 'Google Trends', 'Node.js', 'Tailwind'],
    accentColor: {
      border: 'hover:border-amber-500/50',
      glow: 'rgba(245, 158, 11, 0.15)',
      badgeBg: 'bg-amber-500/10 border-amber-500/30',
      badgeText: 'text-amber-400',
      button: 'bg-amber-500 hover:bg-amber-400 text-black font-medium shadow-amber-500/25',
    },
    metrics: [
      { label: 'Data Source', value: 'Google Trends' },
      { label: 'Storage', value: 'AWS DynamoDB' },
    ],
    previewType: 'shop',
  },
];

export const TECH_STACK = [
  { name: 'TypeScript', category: 'Language' },
  { name: 'React', category: 'Frontend' },
  { name: 'AWS Cloud', category: 'Infra' },
  { name: 'DynamoDB', category: 'Database' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Tailwind CSS', category: 'Styling' },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/roddan-hue',
  linkedin: 'https://www.linkedin.com/in/rod-daniel-bagares-122347108',
  email: 'contact@bossrod.com',
};
