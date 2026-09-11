import {
  ExternalLink,
  Film,
  ShoppingBag,
  Sparkles,
  Activity,
  ArrowUpRight,
  Flame,
  Star,
} from 'lucide-react';
import type { SubdomainProject } from '../data/subdomains';
import { BentoCard } from './BentoCard';

interface SubdomainCardProps {
  project: SubdomainProject;
}

export function SubdomainCard({ project }: SubdomainCardProps) {
  const isMovie = project.previewType === 'movies';

  return (
    <BentoCard
      glowColor={project.accentColor.glow}
      className={`min-h-[420px] transition-all duration-300 ${project.accentColor.border}`}
    >
      {/* Top Header: Badge + Live Subdomain */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${project.accentColor.badgeBg} ${project.accentColor.badgeText}`}
        >
          {isMovie ? <Film className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          <span>{project.badge}</span>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-mono transition-colors group/link"
        >
          <span>{project.subdomain}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
        </a>
      </div>

      {/* Project Title & Tagline */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          {project.name}
        </h3>
        <p className="text-sm font-medium text-zinc-400 mt-1">{project.tagline}</p>
        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{project.description}</p>
      </div>

      {/* Interactive Mockup Graphic Section */}
      <div className="flex-1 my-3 relative overflow-hidden rounded-xl border border-white/5 bg-[#090a10] p-4 flex flex-col justify-center">
        {isMovie ? (
          /* Movie Cinematic Preview Widget */
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Sparkles className="w-3.5 h-3.5" /> Curated Watchlist
              </span>
              <span className="font-mono text-zinc-400 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 8.8 IMDB
              </span>
            </div>

            {/* Poster cards preview mock */}
            <div className="grid grid-cols-3 gap-2">
              <div className="group/item relative rounded-lg bg-gradient-to-b from-purple-900/40 to-black p-2 border border-purple-500/20 text-center flex flex-col items-center justify-end h-24 hover:border-purple-500/40 transition-colors">
                <span className="text-[10px] font-semibold text-zinc-200">Sci-Fi Hits</span>
                <span className="text-[9px] text-purple-300">4K Ultra HD</span>
              </div>
              <div className="group/item relative rounded-lg bg-gradient-to-b from-indigo-900/40 to-black p-2 border border-indigo-500/20 text-center flex flex-col items-center justify-end h-24 hover:border-indigo-500/40 transition-colors">
                <span className="text-[10px] font-semibold text-zinc-200">Trending Now</span>
                <span className="text-[9px] text-indigo-300">Top 10</span>
              </div>
              <div className="group/item relative rounded-lg bg-gradient-to-b from-pink-900/40 to-black p-2 border border-pink-500/20 text-center flex flex-col items-center justify-end h-24 hover:border-pink-500/40 transition-colors">
                <span className="text-[10px] font-semibold text-zinc-200">Classics</span>
                <span className="text-[9px] text-pink-300">Critically Acclaimed</span>
              </div>
            </div>
          </div>
        ) : (
          /* TrendShop Live Data Feed Widget */
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Flame className="w-3.5 h-3.5" /> High Velocity Trends
              </span>
              <span className="font-mono text-emerald-400 flex items-center gap-1">
                <Activity className="w-3 h-3" /> Auto-Enriched
              </span>
            </div>

            {/* Mini Trend Graph / Price Tracker Visual */}
            <div className="rounded-lg bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-2.5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-zinc-200 font-medium">Google Trends Spike</span>
                <span className="text-emerald-400 font-mono text-[11px] font-bold">+284%</span>
              </div>
              {/* Simulated sparkline / bar */}
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full w-[78%] rounded-full animate-pulse" />
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400">
                <span>DynamoDB Catalog</span>
                <span className="text-zinc-300 font-mono">Amazon Verified</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-[11px] text-zinc-400 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${project.accentColor.button}`}
      >
        <span>Launch {project.name}</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </BentoCard>
  );
}
