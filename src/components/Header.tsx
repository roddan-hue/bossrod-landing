import { GithubIcon } from './icons/GithubIcon';
import { SOCIAL_LINKS } from '../data/subdomains';

export function Header() {
  return (
    <header className="w-full border-b border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 h-10 flex items-center justify-end">
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
    </header>
  );
}
