import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SOCIAL_LINKS } from '../data/subdomains';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 },
      colors: ['#a855f7', '#f59e0b', '#3b82f6', '#10b981'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="w-full border-t border-white/5 bg-[#050609] py-12 px-4 sm:px-6 mt-16 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-tight">bossrod.com</span>
            <span className="text-zinc-400 text-xs">• Hub Ecosystem</span>
          </div>
          <p className="text-xs text-zinc-400">
            Automated, curated digital platforms on high-availability AWS edge.
          </p>
        </div>

        {/* Center: Copy Email interaction */}
        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer group"
          title="Click to copy email address"
        >
          <Mail className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-mono">{SOCIAL_LINKS.email}</span>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          )}
        </button>

        {/* Right: Social icons & Status */}
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href={SOCIAL_LINKS.x}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            X (Twitter)
          </a>
          <span>•</span>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-3">
        <span>© {new Date().getFullYear()} Bossrod. All rights reserved.</span>
        <div className="flex items-center gap-2 font-mono">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>AWS S3 + CloudFront CDN Global Edge</span>
        </div>
      </div>
    </footer>
  );
}
