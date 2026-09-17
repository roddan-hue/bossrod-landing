import { GithubIcon } from './icons/GithubIcon';
import { SOCIAL_LINKS } from '../data/subdomains';

interface FooterProps {
  onOpenDashboard?: () => void;
}

export function Footer({ onOpenDashboard }: FooterProps) {
  return (
    <footer className="w-full border-t border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: nodes status + copyright + telemetry terminal link */}
        <div className="flex items-center flex-wrap gap-3">
          <div className="acid-dot" />
          <span className="section-label">04 nodes online</span>
          <span className="text-[#1e1e1e]">·</span>
          <span className="section-label">© {new Date().getFullYear()} bossrod</span>
          {onOpenDashboard && (
            <>
              <span className="text-[#1e1e1e]">·</span>
              <button
                onClick={onOpenDashboard}
                className="section-label text-[#555555] hover:text-[#c8f000] cursor-pointer transition-colors"
                title="Open Telemetry Dashboard"
              >
                // sys.mon
              </button>
            </>
          )}
        </div>

        {/* Right: GitHub link */}
        <div>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="section-label flex items-center gap-1.5 hover:text-[#f0f0f0] transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>github</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
