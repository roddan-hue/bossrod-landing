import { useState, useEffect } from 'react';
import { SubdomainCard } from './components/SubdomainCard';
import { ProfileCard } from './components/ProfileCard';
import { TechStackCard } from './components/TechStackCard';
import { ComingSoonCard } from './components/ComingSoonCard';
import { Footer } from './components/Footer';
import { SecurityGate } from './components/dashboard/SecurityGate';
import { DashboardModal } from './components/dashboard/DashboardModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsModal } from './components/TermsModal';
import { SUBDOMAINS } from './data/subdomains';

export function App() {
  const [isSecurityGateOpen, setIsSecurityGateOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

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

  // Check URL pathname and hash on initial mount and route changes (for /privacy and /terms)
  useEffect(() => {
    const syncRouteWithState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path === '/privacy' || path === '/privacy.html' || hash === '#privacy') {
        setIsPrivacyOpen(true);
      } else if (path === '/terms' || path === '/terms.html' || hash === '#terms') {
        setIsTermsOpen(true);
      }
    };

    syncRouteWithState();
    window.addEventListener('popstate', syncRouteWithState);
    window.addEventListener('hashchange', syncRouteWithState);
    return () => {
      window.removeEventListener('popstate', syncRouteWithState);
      window.removeEventListener('hashchange', syncRouteWithState);
    };
  }, []);

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
            <span className="section-label">{SUBDOMAINS.length.toString().padStart(2, '0')}&nbsp;nodes&nbsp;online</span>
          </div>

          {/* Active project cards in a responsive grid */}
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

        {/* ── Ecosystem Architecture & Transparency ── */}
        <section className="pb-8">
          <hr className="divider mb-4" />
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-5 sm:p-6 text-xs font-['JetBrains_Mono'] space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
              <span className="section-label text-[#c8f000]">// platform overview &amp; documentation</span>
              <span className="text-[#555555] text-[10px]">architecture: serverless + edge</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#888888] leading-relaxed">
              <div>
                <h2 className="text-[#f0f0f0] font-bold text-xs uppercase mb-2">About the BOSSROD Ecosystem</h2>
                <p className="mb-2">
                  <strong className="text-[#d0d0d0]">bossrod.com</strong> serves as the central hub and orchestrator for our network of web applications, cloud utilities, and real-time interactive systems. Each connected node operates autonomously on isolated, scalable cloud infrastructure while adhering to unified privacy, performance, and accessibility standards.
                </p>
                <p>
                  From real-time multiplayer board engines like <em>Asian Mahjong</em> (<a href="https://asianmahjong.com" target="_blank" rel="noopener noreferrer" className="text-[#c8f000] underline">asianmahjong.com</a>) to AI-assisted career and assessment suites like <em>getJob</em> and <em>QuizMe</em>, our software focuses on high-speed execution, minimal dependencies, and transparent data practices.
                </p>
              </div>

              <div>
                <h2 className="text-[#f0f0f0] font-bold text-xs uppercase mb-2">Standards &amp; Publisher Compliance</h2>
                <p className="mb-2">
                  Our ecosystem adheres strictly to modern web safety and monetization policies, including Google AdSense program guidelines, the IAB Europe Transparency and Consent Framework (TCF v2.2), and digital authorized seller verification (<a href="/ads.txt" className="text-[#c8f000] underline">ads.txt</a>).
                </p>
                <p>
                  We prioritize user data privacy: no persistent personal identifiers or tracking profiles are harvested without consent. For privacy preferences, inquiries, or terms of use, please explore our formal disclosures linked below.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenDashboard={handleOpenDashboardTrigger}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

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

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => {
          setIsPrivacyOpen(false);
          if (window.location.hash === '#privacy') {
            history.pushState(null, '', window.location.pathname);
          }
        }}
      />

      {/* Terms of Service Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => {
          setIsTermsOpen(false);
          if (window.location.hash === '#terms') {
            history.pushState(null, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
}

export default App;
