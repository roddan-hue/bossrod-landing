import { Shield, X, ExternalLink } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md overflow-y-auto flex items-start justify-center p-3 sm:p-6">
      <div className="w-full max-w-3xl bg-[#0f0f0f] border border-[#1e1e1e] p-5 sm:p-7 my-auto shadow-2xl flex flex-col gap-5 text-xs font-['JetBrains_Mono']">

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#c8f000]" />
            <span className="section-label text-[#c8f000]">// privacy policy & compliance</span>
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
            <span className="text-[#666666] text-[10px] uppercase block mb-1">Effective Date: October 2026</span>
            <p className="text-[#d0d0d0]">
              This Privacy Policy explains how <span className="text-[#f0f0f0]">bossrod.com</span> and its affiliated applications and subdomains (<span className="text-[#f0f0f0]">asianmahjong.com</span>, <span className="text-[#f0f0f0]">garage.bossrod.com</span>, <span className="text-[#f0f0f0]">getjob.bossrod.com</span>, <span className="text-[#f0f0f0]">grocer.bossrod.com</span>, <span className="text-[#f0f0f0]">quizme.bossrod.com</span>, <span className="text-[#f0f0f0]">movies.bossrod.com</span>, <span className="text-[#f0f0f0]">shop.bossrod.com</span>) handle data, cookies, and user privacy in compliance with applicable standards including the Google Publisher and AdSense Policies.
            </p>
          </div>

          {/* Section 1: Google AdSense & Third-Party Cookies */}
          <div className="p-3 border border-[#1e1e1e] bg-[#141414] space-y-2">
            <h4 className="text-[#f0f0f0] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span>1. Third-Party Advertising & Cookies (Google AdSense)</span>
            </h4>
            <p>
              Third-party vendors, including <strong className="text-[#d0d0d0]">Google</strong>, use cookies to serve advertisements based on a user's prior visits to our websites or other websites across the internet.
            </p>
            <p>
              Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our sites and/or other sites on the Internet.
            </p>
            <p className="text-[#c8f000]">
              Users may opt out of personalized advertising at any time:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#aaaaaa]">
              <li>
                Visit{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f0f0f0] underline hover:text-[#c8f000] inline-flex items-center gap-1"
                >
                  <span>Google Ad Settings</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                Visit{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f0f0f0] underline hover:text-[#c8f000] inline-flex items-center gap-1"
                >
                  <span>AboutAds.info choices</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>{' '}
                to opt out of third-party vendor use of cookies.
              </li>
            </ul>

            <div className="pt-2.5 border-t border-[#222222] mt-2">
              <span className="text-[#d0d0d0] block mb-1 font-semibold">
                EEA, UK &amp; Swiss User Consent (Google CMP):
              </span>
              <p className="mb-2 text-[#999999]">
                In accordance with European regulations and the IAB Europe Transparency and Consent Framework (TCF v2.2), you can re-open the consent dialog to modify or revoke your advertising preferences at any time:
              </p>
              <button
                type="button"
                onClick={() => {
                  const win = window as unknown as {
                    googlefc?: {
                      callbackQueue?: Array<() => void>;
                      showRevocationMessage?: () => void;
                    };
                  };
                  if (win.googlefc?.callbackQueue && win.googlefc.showRevocationMessage) {
                    win.googlefc.callbackQueue.push(win.googlefc.showRevocationMessage);
                  } else {
                    alert('Consent management is active for visitors located in the European Economic Area (EEA), UK, and Switzerland.');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-[#1e1e1e] hover:bg-[#282828] text-[#c8f000] border border-[#333333] hover:border-[#c8f000] transition-colors cursor-pointer"
              >
                <span>// manage consent choices</span>
              </button>
            </div>
          </div>

          {/* Section 2: Log Files & Edge Telemetry */}
          <div className="space-y-1.5">
            <h4 className="text-[#f0f0f0] font-bold text-xs uppercase tracking-wider">
              2. Log Data & Edge Analytics
            </h4>
            <p>
              Like most web portals, our infrastructure (AWS CloudFront edge servers) automatically logs non-personally identifiable request data. This includes browser type, approximate geographic region (country-level via CloudFront edge headers), date/time stamp, referring/exit pages, and error counts. This data is used solely to maintain uptime, monitor latency, and protect against security incidents.
            </p>
          </div>

          {/* Section 3: Personal Information */}
          <div className="space-y-1.5">
            <h4 className="text-[#f0f0f0] font-bold text-xs uppercase tracking-wider">
              3. Personal Information
            </h4>
            <p>
              The root hub <span className="text-[#f0f0f0]">bossrod.com</span> does not require account registration, collect names, telephone numbers, credit cards, or personal identifiers. Any subdomains offering accounts or session storage store preferences client-side or through authenticated sessions as detailed in their respective applications.
            </p>
          </div>

          {/* Section 4: External Links */}
          <div className="space-y-1.5">
            <h4 className="text-[#f0f0f0] font-bold text-xs uppercase tracking-wider">
              4. External Links & Subdomains
            </h4>
            <p>
              Our site contains links to subdomains and external developer profiles. We encourage users to review the privacy notices of any third-party websites or services they visit.
            </p>
          </div>

          {/* Section 5: Updates & Contact */}
          <div className="space-y-1.5">
            <h4 className="text-[#f0f0f0] font-bold text-xs uppercase tracking-wider">
              5. Policy Updates & Contact
            </h4>
            <p>
              We may update this policy periodically to maintain compliance with legal requirements and ad network guidelines. Inquiries regarding this policy can be submitted via email to{' '}
              <a href="mailto:contact@bossrod.com" className="text-[#c8f000] underline">
                contact@bossrod.com
              </a>{' '}
              or through our GitHub repository. A permanent static copy is always available at{' '}
              <a href="/privacy.html" className="text-[#c8f000] underline">
                /privacy.html
              </a>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1e1e1e] flex items-center justify-between text-[10px] text-[#555555]">
          <span>Compliant with Google AdSense Publisher Policies</span>
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
