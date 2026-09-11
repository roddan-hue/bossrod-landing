import { ArrowDown, Sparkles, Layers } from 'lucide-react';
import { Header } from './components/Header';
import { SubdomainCard } from './components/SubdomainCard';
import { ProfileCard } from './components/ProfileCard';
import { TechStackCard } from './components/TechStackCard';
import { ComingSoonCard } from './components/ComingSoonCard';
import { Footer } from './components/Footer';
import { SUBDOMAINS } from './data/subdomains';

export function App() {
  return (
    <div className="min-h-screen bg-[#07080c] text-white flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background Dot Grid + Subtle Ambient Light Orbs */}
      <div className="fixed inset-0 pointer-events-none bg-dot-grid opacity-60 z-0" />
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[30%] right-[10%] w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none z-0" />

      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-12 pb-20">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-zinc-300 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Curated Digital Ecosystem</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 font-mono">bossrod.com</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Architecting digital products &{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              curated platforms
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Central launchpad for live production subdomains, real-time automated tools,
            and personal cloud architectures.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 flex items-center gap-2"
            >
              <span>Explore Subdomains</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#about"
              className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white font-medium text-sm transition-all"
            >
              About System
            </a>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section id="projects" className="scroll-mt-24 space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-400 font-mono">
                Active Subdomains & Nodes
              </h2>
            </div>
            <span className="text-xs text-zinc-500 font-mono">2 Live Deployments</span>
          </div>

          {/* Primary Featured Bento Cards: 2 Columns on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SUBDOMAINS.map((project) => (
              <SubdomainCard key={project.id} project={project} />
            ))}
          </div>

          {/* Secondary Bento Row: 3 Columns on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
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
