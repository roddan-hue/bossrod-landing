import { ArrowUpRight } from 'lucide-react';
import type { SubdomainProject } from '../data/subdomains';
import { BentoCard } from './BentoCard';

interface SubdomainCardProps {
  project: SubdomainProject;
}

export function SubdomainCard({ project }: SubdomainCardProps) {
  const isDomesticAU = ['getjob', 'grocer', 'garage'].includes(project.id);

  return (
    <BentoCard className="group hover:border-[#dfa838]/60 transition-all duration-200">
      {/* Top: category label + subtle regional tag + subdomain link */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="section-label text-[#dfa838] text-[10px]">{project.badge.toLowerCase()}</span>
          {isDomesticAU && (
            <span className="text-[9px] font-['JetBrains_Mono'] text-[#7ea085] bg-[#141b16] px-1 py-0.2 border border-[#223027] rounded-[1px]">
              AU REGION
            </span>
          )}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="section-label flex items-center gap-1 text-[#8e9890] hover:text-[#dfa838] text-[10px] transition-colors"
        >
          <span>{project.subdomain}</span>
          <ArrowUpRight className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Project name — compact headline */}
      <h3 className="headline text-2xl md:text-3xl text-[#f2f4f2] leading-none mb-1 group-hover:text-[#ffffff] transition-colors">
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="text-[#8e9890] text-[11px] leading-snug mb-1.5 font-['JetBrains_Mono']">
        {project.tagline}
      </p>

      {/* Description */}
      <p className="text-[#647169] text-[11px] leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Bottom: tech stack + launch */}
      <div className="mt-auto pt-2 border-t border-[#1d2420] flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="mono-tag text-[9px] py-0.5 px-1.5 text-[#8e9890] border-[#1d2420]">
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
