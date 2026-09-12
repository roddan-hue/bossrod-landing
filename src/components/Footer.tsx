import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon } from './icons/GithubIcon';
import { SOCIAL_LINKS } from '../data/subdomains';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 1 },
      colors: ['#c8f000', '#f0f0f0', '#555555'],
      scalar: 0.8,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="w-full border-t border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left: copyright */}
        <span className="section-label">
          © {new Date().getFullYear()} bossrod · ap-southeast-1
        </span>

        {/* Center: email copy */}
        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-2 text-[10px] font-['JetBrains_Mono'] text-[#3a3a3a] hover:text-[#c8f000] transition-colors cursor-pointer group"
        >
          {copied ? (
            <Check className="w-3 h-3 text-[#c8f000]" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          <span>{SOCIAL_LINKS.email}</span>
        </button>

        {/* Right: links */}
        <div className="flex items-center gap-4">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="section-label flex items-center gap-1.5 hover:text-[#f0f0f0] transition-colors"
          >
            <GithubIcon className="w-3 h-3" />
            <span>github</span>
          </a>
          <span className="text-[#1e1e1e]">·</span>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="section-label hover:text-[#f0f0f0] transition-colors"
          >
            linkedin
          </a>
        </div>
      </div>
    </footer>
  );
}
