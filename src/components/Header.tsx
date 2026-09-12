import { GithubIcon } from './icons/GithubIcon';
import { SOCIAL_LINKS } from '../data/subdomains';

export function Header() {
  return (
    <header className="w-full border-b border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Left: nav links */}
        <nav className="flex items-center gap-6">
          <a
            href="#projects"
            className="section-label hover:text-[#f0f0f0] transition-colors"
          >
            projects
          </a>
          <a
            href="#about"
            className="section-label hover:text-[#f0f0f0] transition-colors"
          >
            about
          </a>
          <a
            href="#stack"
            className="section-label hover:text-[#f0f0f0] transition-colors"
          >
            stack
          </a>
        </nav>

        {/* Right: status + github */}
        <div className="flex items-center gap-4">
          {/* Live node indicator */}
          <div className="flex items-center gap-2">
            <div className="acid-dot" />
            <span className="section-label text-[#3a3a3a]">02 nodes</span>
          </div>

          <div className="w-px h-4 bg-[#1e1e1e]" />

          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="section-label flex items-center gap-1.5 hover:text-[#f0f0f0] transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>github</span>
          </a>
        </div>
      </div>
    </header>
  );
}
