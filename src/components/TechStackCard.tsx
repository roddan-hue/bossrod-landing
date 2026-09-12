import { BentoCard } from './BentoCard';
import { TECH_STACK } from '../data/subdomains';

export function TechStackCard() {
  return (
    <BentoCard id="stack">
      <span className="section-label text-[#c8f000] mb-4">// stack</span>

      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {TECH_STACK.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center justify-between p-2 border border-[#1e1e1e] hover:border-[#2a2a2a] transition-colors"
          >
            <span className="text-[#555555] text-xs font-['JetBrains_Mono']">
              {tech.name}
            </span>
            <span className="text-[#3a3a3a] text-[10px] font-['JetBrains_Mono']">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
