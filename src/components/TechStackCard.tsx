import { BentoCard } from './BentoCard';
import { TECH_STACK } from '../data/subdomains';

export function TechStackCard() {
  return (
    <BentoCard id="stack">
      <div className="flex items-center justify-between mb-2">
        <span className="section-label text-[#dfa838]">// core stack</span>
        <span className="text-[10px] font-['JetBrains_Mono'] text-[#5c6760]">PRODUCTION</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {TECH_STACK.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center justify-between p-2 border border-[#1d2420] hover:border-[#dfa838]/40 hover:bg-[#141a15] transition-colors"
          >
            <span className="text-[#f2f4f2] text-xs font-['JetBrains_Mono']">
              {tech.name}
            </span>
            <span className="text-[#7ea085] text-[10px] font-['JetBrains_Mono']">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
