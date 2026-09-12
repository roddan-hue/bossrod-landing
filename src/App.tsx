import { Header } from './components/Header';
import { SubdomainCard } from './components/SubdomainCard';
import { ProfileCard } from './components/ProfileCard';
import { TechStackCard } from './components/TechStackCard';
import { ComingSoonCard } from './components/ComingSoonCard';
import { Footer } from './components/Footer';
import { SUBDOMAINS } from './data/subdomains';

export function App() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#0a0a0a', color: '#f0f0f0' }}
    >
      {/* Nav bar */}
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6">
        {/* ── Hero ─────────────────────────────────── */}
        <section className="pt-16 pb-14 border-b border-[#1e1e1e]">
          {/* Domain tag */}
          <div className="flex items-center gap-2 mb-6">
            <div className="acid-dot" />
            <span className="section-label">bossrod.com</span>
          </div>

          {/* bossrod — understated, lowercase, not screaming */}
          <h1
            className="text-[clamp(40px,6vw,72px)] text-[#d0d0d0] leading-none mb-5"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            bossrod.
          </h1>

          {/* Tagline — dry, monospace, dim */}
          <p className="text-[#666666] text-sm font-['JetBrains_Mono']">
            builds things.&nbsp;&nbsp;ships code.&nbsp;&nbsp;bad at interviews.
          </p>
        </section>

        {/* ── Active Deployments ──────────────────── */}
        <section id="projects" className="py-12 scroll-mt-16">
          {/* Section header row */}
          <div className="flex items-center justify-between mb-6">
            <span className="section-label">// active deployments</span>
            <span className="section-label">02&nbsp;nodes&nbsp;online</span>
          </div>

          {/* Two large project cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {SUBDOMAINS.map((project) => (
              <SubdomainCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* ── About / Stack / Labs ────────────────── */}
        <section className="pb-16">
          <hr className="divider mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ProfileCard />
            <TechStackCard />
            <ComingSoonCard />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
