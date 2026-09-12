import { ArrowUpRight } from 'lucide-react';
import type { SubdomainProject } from '../data/subdomains';
import { BentoCard } from './BentoCard';

interface SubdomainCardProps {
  project: SubdomainProject;
}

export function SubdomainCard({ project }: SubdomainCardProps) {
  return (
    <BentoCard className="min-h-[320px] group">
      {/* Top: category label + subdomain link */}
      <div className="flex items-center justify-between mb-6">
        <span className="section-label text-[#c8f000]">{project.badge.toLowerCase()}</span>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="section-label flex items-center gap-1 text-[#3a3a3a] hover:text-[#c8f000] transition-colors"
        >
          <span>{project.subdomain}</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      {/* Project name — big Barlow headline */}
      <h3 className="headline text-4xl md:text-5xl text-[#f0f0f0] leading-none mb-2">
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="text-[#888888] text-xs leading-relaxed mb-4">
        {project.tagline}
      </p>

      {/* Description — dry one-liner */}
      <p className="text-[#666666] text-xs leading-relaxed mb-auto">
        {project.description}
      </p>

      {/* Divider */}
      <hr className="divider my-4" />

      {/* Bottom: tech stack + launch */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="mono-tag">
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="btn-acid shrink-0"
        >
          launch
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </BentoCard>
  );
}
