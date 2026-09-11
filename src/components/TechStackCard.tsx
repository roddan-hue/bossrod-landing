import { Layers } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { TECH_STACK } from '../data/subdomains';

export function TechStackCard() {
  return (
    <BentoCard
      id="stack"
      glowColor="rgba(59, 130, 246, 0.15)"
      className="hover:border-blue-500/40"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <h4 className="text-sm font-semibold text-white">Core Technology</h4>
        </div>
        <span className="text-[10px] text-zinc-500 font-mono">Modern Stack</span>
      </div>

      <p className="text-xs text-zinc-400 mb-4">
        Battle-tested technologies powering subdomains across cloud and edge.
      </p>

      {/* Grid of Tech Pills */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {TECH_STACK.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-blue-500/30 hover:bg-blue-500/[0.05] transition-all group/tech"
          >
            <span className="text-xs font-medium text-zinc-200 group-hover/tech:text-white transition-colors">
              {tech.name}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">{tech.category}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
