import { GithubIcon } from './icons/GithubIcon';
import { SOCIAL_LINKS } from '../data/subdomains';

interface FooterProps {
  onOpenDashboard?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export function Footer({ onOpenDashboard, onOpenPrivacy, onOpenTerms }: FooterProps) {
  return (
    <footer className="w-full border-t border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: nodes status + copyright + telemetry terminal link + privacy + terms */}
        <div className="flex items-center flex-wrap gap-3">
          <div className="acid-dot" />
          <span className="section-label">04 nodes online</span>
          <span className="text-[#1e1e1e]">·</span>
          <span className="section-label">© {new Date().getFullYear()} bossrod</span>
          
          <span className="text-[#1e1e1e]">·</span>
          <a
            href="/privacy"
            onClick={(e) => {
              if (onOpenPrivacy) {
                e.preventDefault();
                onOpenPrivacy();
              }
            }}
            className="section-label text-[#555555] hover:text-[#c8f000] cursor-pointer transition-colors"
            title="Privacy Policy & AdSense Disclosures"
          >
            // privacy
          </a>

          <span className="text-[#1e1e1e]">·</span>
          <a
            href="/terms"
            onClick={(e) => {
              if (onOpenTerms) {
                e.preventDefault();
                onOpenTerms();
              }
            }}
            className="section-label text-[#555555] hover:text-[#c8f000] cursor-pointer transition-colors"
            title="Terms of Service"
          >
            // terms
          </a>

          <span className="text-[#1e1e1e]">·</span>
          <button
            onClick={() => {
              const win = window as unknown as {
                googlefc?: {
                  callbackQueue?: Array<() => void>;
                  showRevocationMessage?: () => void;
                };
              };
              if (win.googlefc?.callbackQueue && win.googlefc.showRevocationMessage) {
                win.googlefc.callbackQueue.push(win.googlefc.showRevocationMessage);
              } else if (onOpenPrivacy) {
                onOpenPrivacy();
              }
            }}
            className="section-label text-[#555555] hover:text-[#c8f000] cursor-pointer transition-colors"
            title="Privacy and Cookie Settings (Google CMP)"
          >
            // cookies
          </button>

          <span className="text-[#1e1e1e]">·</span>
          <a
            href="mailto:contact@bossrod.com"
            className="section-label text-[#555555] hover:text-[#c8f000] cursor-pointer transition-colors"
            title="Contact Support & Publisher Inquiries"
          >
            // contact
          </a>

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
