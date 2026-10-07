import { FileText, X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md overflow-y-auto flex items-start justify-center p-3 sm:p-6">
      <div className="w-full max-w-3xl bg-[#0f0f0f] border border-[#1e1e1e] p-5 sm:p-7 my-auto shadow-2xl flex flex-col gap-5 text-xs font-['JetBrains_Mono']">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#dfa838]" />
            <span className="section-label text-[#dfa838]">// terms of service</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#666666] hover:text-[#f0f0f0] border border-[#1e1e1e] hover:border-[#333333] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-[#888888] leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <span className="text-[#666666] text-[10px] uppercase block mb-1">
              Effective Date: September 2026
            </span>
            <p className="text-[#d0d0d0]">
              Welcome to <span className="text-[#f0f0f0]">bossrod.com</span>. By accessing or using our websites, applications, and associated subdomains, you agree to comply with and be bound by the following Terms of Service.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-[#f0f0f0] font-semibold text-xs uppercase tracking-wider">
              1. Permitted Use
            </h4>
            <p>
              The tools, applications, and content on bossrod.com and its subdomains are provided for personal, educational, and developer evaluation purposes. You agree not to abuse, crawl without authorization, reverse-engineer, or attempt to disrupt the availability of any connected infrastructure.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-[#f0f0f0] font-semibold text-xs uppercase tracking-wider">
              2. Intellectual Property
            </h4>
            <p>
              All software architectures, interactive tools, trademarks, and original codebases hosted on bossrod.com remain the intellectual property of the author unless specifically stated otherwise under open-source licensing.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-[#f0f0f0] font-semibold text-xs uppercase tracking-wider">
              3. Disclaimer of Warranties
            </h4>
            <p>
              All applications, APIs, and data feeds are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. No warranties of accuracy, uptime, or merchantability are made.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-[#f0f0f0] font-semibold text-xs uppercase tracking-wider">
              4. Third-Party Advertising
            </h4>
            <p>
              bossrod.com and its subdomains may display third-party advertisements served through Google AdSense. We are not responsible for the products, services, or content featured in third-party advertisements or external links.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-[#f0f0f0] font-semibold text-xs uppercase tracking-wider">
              5. Contact & Inquiries
            </h4>
            <p>
              Inquiries regarding these terms can be directed via email to <a href="mailto:contact@bossrod.com" className="text-[#dfa838] underline">contact@bossrod.com</a>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1e1e1e] flex items-center justify-between text-[10px] text-[#555555]">
          <span>bossrod.com &bull; Terms of Service</span>
          <button
            onClick={onClose}
            className="btn-ghost text-[10px] py-1 px-3 cursor-pointer"
          >
            [close]
          </button>
        </div>
      </div>
    </div>
  );
}
