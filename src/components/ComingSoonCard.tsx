import { BentoCard } from './BentoCard';

export function ComingSoonCard() {
  return (
    <BentoCard>
      <div className="flex items-center justify-between mb-2">
        <span className="section-label text-[#dfa838]">// pipeline</span>
        <span className="text-[10px] font-['JetBrains_Mono'] text-[#7ea085]">EXPANSION</span>
      </div>

      <h4 className="headline text-xl text-[#f2f4f2] mb-2">UPCOMING NODES</h4>

      <div className="space-y-2 flex-1">
        <div className="flex items-center justify-between py-2 border-b border-[#1d2420]">
          <div>
            <span className="text-xs font-['JetBrains_Mono'] text-[#f2f4f2] block">
              labs.bossrod.com
            </span>
            <span className="text-[10px] text-[#5c6760]">autonomous agent benchmarks</span>
          </div>
          <span className="mono-tag text-[9px] text-[#dfa838] border-[#382b17]">STAGE 1</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[#1d2420]">
          <div>
            <span className="text-xs font-['JetBrains_Mono'] text-[#f2f4f2] block">
              status.bossrod.com
            </span>
            <span className="text-[10px] text-[#5c6760]">multi-region edge latency probes</span>
          </div>
          <span className="mono-tag text-[9px] text-[#7ea085] border-[#223027]">STAGE 2</span>
        </div>
      </div>

      <p className="text-[#5c6760] text-[10px] font-['JetBrains_Mono'] mt-3">
        // continuous deployment · scheduled releases across 2026/2027
      </p>
    </BentoCard>
  );
}
