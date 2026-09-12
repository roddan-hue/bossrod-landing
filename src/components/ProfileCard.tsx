import { BentoCard } from './BentoCard';

export function ProfileCard() {
  return (
    <BentoCard id="about">
      <span className="section-label text-[#c8f000] mb-3">// about</span>

      <h4 className="headline text-2xl text-[#f0f0f0] mb-2">Rod Daniel B.</h4>

      <p className="text-[#888888] text-xs leading-relaxed mb-3">
        full-stack developer and builder.
        <br />
        learns by shipping and breaking things.
        <br />
        prefers code over conversation.
      </p>

      <p className="text-[#666666] text-xs leading-relaxed">
        currently: building the bossrod.com ecosystem.
      </p>
    </BentoCard>
  );
}
