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

  const [auTime, setAuTime] = useState('');

  // Live Australian Eastern Time clock (Melbourne / Sydney)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-AU', {
          timeZone: 'Australia/Melbourne',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());

        const parts = new Intl.DateTimeFormat('en-AU', {
          timeZone: 'Australia/Melbourne',
          timeZoneName: 'short',
        }).formatToParts(new Date());
        const tz = parts.find((p) => p.type === 'timeZoneName')?.value || 'AEDT';

        setAuTime(`${timeStr} ${tz}`);
      } catch {
        setAuTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <main className="flex-1 max-w-6xl w-full mx-auto px-6">
        {/* ── Australian Studio Telemetry Strip ───── */}
        <div className="flex items-center justify-between border-b border-[#1d2420] py-2.5 text-[11px] font-['JetBrains_Mono'] text-[#5c6760]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7ea085] animate-pulse" />
            <span className="text-[#8e9890] font-medium">MELBOURNE, AU</span>
            <span className="text-[#2b352e]">/</span>
            <span className="text-[#dfa838] font-medium">{auTime || 'AEST/AEDT'}</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="hidden sm:inline text-[#5c6760]">EDGE: AP-SOUTHEAST-2 (SYDNEY)</span>
            <span className="hidden sm:inline text-[#2b352e]">·</span>
            <span className="text-[#7ea085]">NOMINAL STATUS</span>
          </div>
        </div>

        {/* ── Hero ─────────────────────────────────── */}
        <section className="pt-7 pb-7 border-b border-[#1d2420]">
          {/* Domain tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="wattle-dot" />
            <span className="section-label text-[#dfa838]">bossrod.com</span>
            <span className="text-[#2b352e]">·</span>
            <span className="text-[#5c6760] text-[10px] uppercase tracking-wider font-['JetBrains_Mono']">Australian Digital Studio</span>
          </div>

          {/* bossrod — understated, condensed, architectural */}
          <h1
            className="text-[clamp(40px,5.5vw,68px)] text-[#f2f4f2] leading-none mb-3"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            bossrod<span className="text-[#dfa838]">.</span>
          </h1>

          {/* Professional studio tagline */}
          <p className="text-[#8e9890] text-xs sm:text-sm font-['JetBrains_Mono'] max-w-2xl leading-relaxed mb-4">
            Independent software engineering studio &amp; distributed application ecosystem. Architecting high-concurrency cloud systems, real-time web engines, and edge-native platforms.
          </p>

          {/* Subtle Australian telemetry badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="mono-tag text-[10px] text-[#7ea085] border-[#223027] bg-[#111713]">
              🇦🇺 Hosted &amp; Engineered in Australia
            </span>
            <span className="mono-tag text-[10px] text-[#dfa838] border-[#382b17] bg-[#1a150e]">
              Edge: ap-southeast-2 (Sydney)
            </span>
            <span className="mono-tag text-[10px] text-[#8e9890] border-[#1d2420]">
              Sub-30ms Domestic Latency
            </span>
          </div>
        </section>

        {/* ── Active Deployments ──────────────────── */}
        <section id="projects" className="py-6 scroll-mt-12">
          {/* Section header row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="section-label text-[#dfa838]">// active deployments</span>
              <span className="text-[#2b352e]">·</span>
              <span className="text-[#5c6760] text-[10px]">federated cloud cluster</span>
            </div>
            <span className="section-label text-[#7ea085] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ea085]" />
              {SUBDOMAINS.length.toString().padStart(2, '0')}&nbsp;nodes&nbsp;online
            </span>
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
          <div className="border border-[#1d2420] bg-[#111613] p-5 sm:p-6 text-xs font-['JetBrains_Mono'] space-y-4">
            <div className="flex items-center justify-between border-b border-[#1d2420] pb-3">
              <span className="section-label text-[#dfa838]">// platform architecture &amp; sovereign compliance</span>
              <span className="text-[#5c6760] text-[10px]">infrastructure: aws edge + serverless</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#8e9890] leading-relaxed">
              <div>
                <h2 className="text-[#f2f4f2] font-bold text-xs uppercase mb-2">Ecosystem Architecture &amp; Australian Engineering</h2>
                <p className="mb-2">
                  <strong className="text-[#f2f4f2]">bossrod.com</strong> serves as the central hub and orchestrator for our network of web applications, cloud utilities, and real-time interactive systems. Headquartered and engineered out of Melbourne, Australia, connected nodes execute on isolated cloud infrastructure with low-latency edge delivery via AWS CloudFront points of presence in Sydney, Melbourne, Perth, and global regions.
                </p>
                <p>
                  From real-time multiplayer systems like <em>Asian Mahjong</em> (<a href="https://asianmahjong.com" target="_blank" rel="noopener noreferrer" className="text-[#dfa838] underline">asianmahjong.com</a>) to domestic utility engines like <em>getJob</em> (Australian career discovery) and <em>My Pantry Buddy</em> (grocery price comparison across Woolworths, Coles &amp; ALDI), each application is built with a focus on minimal bundle overhead, resilient failover, and transparent data practices.
                </p>
              </div>

              <div>
                <h2 className="text-[#f2f4f2] font-bold text-xs uppercase mb-2">Data Sovereignty &amp; Publisher Standards</h2>
                <p className="mb-2">
                  Our ecosystem adheres strictly to modern web safety and monetization standards, including the Australian Privacy Principles (APPs, Privacy Act 1988), the IAB Europe Transparency and Consent Framework (TCF v2.2), and digital authorized seller verification (<a href="/ads.txt" className="text-[#dfa838] underline">ads.txt</a>).
                </p>
                <p>
                  We prioritize user data sovereignty: no third-party tracking graphs or personal profiling identifiers are harvested without consent. For privacy preferences, regulatory inquiries, or terms of use, please explore our formal disclosures linked below.
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
