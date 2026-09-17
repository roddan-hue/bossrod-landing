import { ArrowUpRight } from 'lucide-react';
import type { SubdomainProject } from '../data/subdomains';
import { BentoCard } from './BentoCard';

interface SubdomainCardProps {
  project: SubdomainProject;
}

export function SubdomainCard({ project }: SubdomainCardProps) {
  return (
    <BentoCard className="group">
      {/* Top: category label + subdomain link */}
      <div className="flex items-center justify-between mb-2">
        <span className="section-label text-[#c8f000] text-[10px]">{project.badge.toLowerCase()}</span>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="section-label flex items-center gap-1 text-[#888888] hover:text-[#c8f000] text-[10px] transition-colors"
        >
          <span>{project.subdomain}</span>
          <ArrowUpRight className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Project name — compact headline */}
      <h3 className="headline text-2xl md:text-3xl text-[#f0f0f0] leading-none mb-1">
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="text-[#888888] text-[11px] leading-snug mb-1.5">
        {project.tagline}
      </p>

      {/* Description */}
      <p className="text-[#666666] text-[11px] leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Bottom: tech stack + launch */}
      <div className="mt-auto pt-2 border-t border-[#1e1e1e] flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="mono-tag text-[9px] py-0.5 px-1.5">
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-acid shrink-0 text-[11px] py-1 px-2.5"
        >
          <span>launch</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </BentoCard>
  );
}
