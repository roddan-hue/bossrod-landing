import { BentoCard } from './BentoCard';

export function ProfileCard() {
  return (
    <BentoCard id="about">
      <div className="flex items-center justify-between mb-2">
        <span className="section-label text-[#dfa838]">// engineer</span>
        <span className="text-[10px] font-['JetBrains_Mono'] text-[#7ea085]">🇦🇺 MELBOURNE, AU</span>
      </div>

      <h4 className="headline text-xl text-[#f2f4f2] mb-1">ROD DAN</h4>
      <div className="text-[10px] text-[#dfa838] font-['JetBrains_Mono'] mb-2 uppercase tracking-wide">
        Cloud Architect &amp; Software Engineer
      </div>

      <p className="text-[#8e9890] text-[11px] leading-relaxed mb-3">
        Architecting resilient distributed systems, real-time engines, and high-concurrency cloud services. Focused on clean abstractions, strict observability, and sub-second edge response times across Australian and global nodes.
      </p>

      <div className="mt-auto pt-2 border-t border-[#1d2420] flex items-center justify-between text-[10px] text-[#5c6760] font-['JetBrains_Mono']">
        <span>PRIMARY REGION</span>
        <span className="text-[#8e9890]">ap-southeast-2</span>
      </div>
    </BentoCard>
  );
}
