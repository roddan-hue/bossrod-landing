import { Beaker, Sparkles, Rocket } from 'lucide-react';
import { BentoCard } from './BentoCard';

export function ComingSoonCard() {
  return (
    <BentoCard
      glowColor="rgba(236, 72, 153, 0.15)"
      className="hover:border-pink-500/40"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Beaker className="w-4 h-4 text-pink-400" />
          <h4 className="text-sm font-semibold text-white">Bossrod Labs</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-[10px] text-pink-400 font-medium">
          In Development
        </span>
      </div>

      <p className="text-xs text-zinc-400 mb-4 flex-1 leading-relaxed">
        Next incubator nodes in preparation. Experiments spanning AI automation, API gateways,
        and developer utilities.
      </p>

      {/* Teaser Slots */}
      <div className="space-y-2">
        <div className="p-2.5 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-xs font-mono text-zinc-400">api.bossrod.com</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Coming Soon</span>
        </div>

        <div className="p-2.5 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-xs font-mono text-zinc-400">blog.bossrod.com</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Planned</span>
        </div>
      </div>
    </BentoCard>
  );
}
