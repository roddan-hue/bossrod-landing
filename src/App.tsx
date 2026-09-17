import { useState, useEffect } from 'react';
import { SubdomainCard } from './components/SubdomainCard';
import { ProfileCard } from './components/ProfileCard';
import { TechStackCard } from './components/TechStackCard';
import { ComingSoonCard } from './components/ComingSoonCard';
import { Footer } from './components/Footer';
import { SecurityGate } from './components/dashboard/SecurityGate';
import { DashboardModal } from './components/dashboard/DashboardModal';
import { SUBDOMAINS } from './data/subdomains';

export function App() {
  const [isSecurityGateOpen, setIsSecurityGateOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleOpenDashboardTrigger = () => {
    const token = sessionStorage.getItem('bossrod_auth_token');
    if (token) {
      setIsDashboardOpen(true);
    } else {
      setIsSecurityGateOpen(true);
    }
  };

  const handleAuthenticated = () => {
    setIsSecurityGateOpen(false);
    setIsDashboardOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bossrod_auth_token');
    setIsDashboardOpen(false);
  };

  // Keyboard shortcut: Ctrl + Shift + D to open monitor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handleOpenDashboardTrigger();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#0a0a0a', color: '#f0f0f0' }}
    >
      <main className="flex-1 max-w-6xl w-full mx-auto px-6">
        {/* ── Hero ─────────────────────────────────── */}
        <section className="pt-8 pb-7 border-b border-[#1e1e1e]">
          {/* Domain tag */}
          <div className="flex items-center gap-2 mb-3">
            <div className="acid-dot" />
            <span className="section-label">bossrod.com</span>
          </div>

          {/* bossrod — understated, lowercase, not screaming */}
          <h1
            className="text-[clamp(36px,5vw,60px)] text-[#d0d0d0] leading-none mb-3"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            bossrod.
          </h1>

          {/* Tagline — dry, monospace, dim */}
          <p className="text-[#666666] text-xs font-['JetBrains_Mono']">
            builds things.&nbsp;&nbsp;ships code.&nbsp;&nbsp;bad at interviews.
          </p>
        </section>

        {/* ── Active Deployments ──────────────────── */}
        <section id="projects" className="py-6 scroll-mt-12">
          {/* Section header row */}
          <div className="flex items-center justify-between mb-4">
            <span className="section-label">// active deployments</span>
            <span className="section-label">04&nbsp;nodes&nbsp;online</span>
          </div>

          {/* 4 project cards in a 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {SUBDOMAINS.map((project) => (
              <SubdomainCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* ── About / Stack / Labs ────────────────── */}
        <section className="pb-8">
          <hr className="divider mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <ProfileCard />
            <TechStackCard />
            <ComingSoonCard />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenDashboard={handleOpenDashboardTrigger} />

      {/* Security Gate Modal */}
      {isSecurityGateOpen && (
        <SecurityGate
          onAuthenticated={handleAuthenticated}
          onCancel={() => setIsSecurityGateOpen(false)}
        />
      )}

      {/* Telemetry Dashboard Modal */}
      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
