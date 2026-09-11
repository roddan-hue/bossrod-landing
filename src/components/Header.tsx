import { GithubIcon } from './icons/GithubIcon';
import { SOCIAL_LINKS } from '../data/subdomains';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#07080c]/80 backdrop-blur-xl transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 group text-white font-semibold tracking-tight text-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-amber-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#07080c] rounded-[7px] flex items-center justify-center">
                <span className="font-mono text-sm font-bold bg-gradient-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent">
                  B
                </span>
              </div>
            </div>
            <span className="hover:text-white transition-colors">
              bossrod<span className="text-purple-400">.com</span>
            </span>
          </a>

          {/* Live Node Badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>2 Nodes Active</span>
          </div>
        </div>

        {/* Navigation / Links */}
        <nav className="flex items-center gap-6 text-sm text-zinc-400">
          <a
            href="#projects"
            className="hidden md:inline-block hover:text-white transition-colors"
          >
            Ecosystem
          </a>
          <a
            href="#about"
            className="hidden md:inline-block hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#stack"
            className="hidden md:inline-block hover:text-white transition-colors"
          >
            Stack
          </a>

          <div className="h-4 w-px bg-white/10 hidden md:block" />

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all flex items-center gap-1.5"
            >
              <span>Connect</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
