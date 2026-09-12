import { BentoCard } from './BentoCard';

export function ComingSoonCard() {
  return (
    <BentoCard>
      <span className="section-label text-[#c8f000] mb-4">// labs</span>

      <h4 className="headline text-2xl text-[#f0f0f0] mb-3">next nodes</h4>

      <div className="space-y-2 flex-1">
        <div className="flex items-center justify-between py-2 border-b border-[#1e1e1e]">
          <span className="text-xs font-['JetBrains_Mono'] text-[#888888]">
            api.bossrod.com
          </span>
          <span className="section-label">planned</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[#1e1e1e]">
          <span className="text-xs font-['JetBrains_Mono'] text-[#888888]">
            blog.bossrod.com
          </span>
          <span className="section-label">planned</span>
        </div>
      </div>

      {/* Dry comment */}
      <p className="text-[#444444] text-[10px] font-['JetBrains_Mono'] mt-4">
        // more coming. eventually.
      </p>
    </BentoCard>
  );
}
