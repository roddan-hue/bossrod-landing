import { Sparkles, Terminal } from 'lucide-react';
import { BentoCard } from './BentoCard';

export function ProfileCard() {
  return (
    <BentoCard
      id="about"
      glowColor="rgba(99, 102, 241, 0.15)"
      className="hover:border-indigo-500/40"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-[#0d0e17] rounded-[10px] flex items-center justify-center">
            <Terminal className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
        <div>
          <h4 className="text-base font-semibold text-white">Bossrod</h4>
          <p className="text-xs text-zinc-400 font-mono">Software Engineer & Builder</p>
        </div>
      </div>

      <p className="text-xs text-zinc-300 leading-relaxed mt-1 flex-1">
        Designing and shipping autonomous, data-driven web products. Specializing in high-velocity
        full-stack architectures, cloud automation, and high-performance user interfaces.
      </p>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" /> 100% Serverless Edge
        </span>
        <span className="font-mono text-zinc-500">AWS • React • Vite</span>
      </div>
    </BentoCard>
  );
}
