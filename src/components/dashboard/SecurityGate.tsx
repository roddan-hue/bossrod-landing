import React, { useState, useEffect } from 'react';
import { Lock, AlertTriangle, KeyRound, ArrowRight } from 'lucide-react';

interface SecurityGateProps {
  onAuthenticated: () => void;
  onCancel: () => void;
}

// SHA-256 of "bossrod"
const MASTER_HASH_BOSSROD = "b723528b97d2e0573e04e9c704f08f8bb1a4a4b27df77df8fa5b4b1a47dfd635";
// SHA-256 of "bossrod2026"
const MASTER_HASH_2026 = "170669226cbcf08f75c88fa58801556a3e264627d42cf38a082725d2bce3ce35";

async function sha256(text: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(text.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function SecurityGate({ onAuthenticated, onCancel }: SecurityGateProps) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockedOutUntil, setLockedOutUntil] = useState<number | null>(null);
  const [remainingLockSeconds, setRemainingLockSeconds] = useState(0);

  useEffect(() => {
    if (!lockedOutUntil) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((lockedOutUntil - Date.now()) / 1000));
      setRemainingLockSeconds(remaining);
      if (remaining <= 0) {
        setLockedOutUntil(null);
        setAttempts(0);
        setError('');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockedOutUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedOutUntil) return;

    if (!passphrase.trim()) {
      setError('passphrase required.');
      return;
    }

    try {
      const hashed = await sha256(passphrase);
      // Validates "bossrod" or "bossrod2026"
      if (hashed === MASTER_HASH_BOSSROD || hashed === MASTER_HASH_2026 || passphrase === 'bossrod') {
        sessionStorage.setItem('bossrod_auth_token', Date.now().toString());
        onAuthenticated();
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);

        if (nextAttempts >= 5) {
          const lockTime = Date.now() + 30 * 1000; // 30 second lockout
          setLockedOutUntil(lockTime);
          setRemainingLockSeconds(30);
          setError('maximum failed attempts exceeded. terminal locked for 30s.');
        } else {
          setError(`access denied. invalid clearance key (${5 - nextAttempts} attempts left).`);
        }
      }
    } catch {
      setError('cryptographic validation error.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#1e1e1e] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#c8f000]" />
            <span className="section-label text-[#c8f000]">// security checkpoint</span>
          </div>
          <button
            onClick={onCancel}
            className="text-xs font-['JetBrains_Mono'] text-[#666666] hover:text-[#f0f0f0] cursor-pointer"
          >
            [esc / cancel]
          </button>
        </div>

        {/* Info */}
        <p className="text-xs text-[#888888] mb-6 leading-relaxed font-['JetBrains_Mono']">
          restricted internal dashboard. telemetry & edge traffic monitor for <span className="text-[#d0d0d0]">bossrod.com</span> ecosystem.
        </p>

        {/* Lockout Warning */}
        {lockedOutUntil && remainingLockSeconds > 0 && (
          <div className="mb-4 p-3 border border-red-900/50 bg-red-950/20 flex items-center gap-2 text-xs text-red-400">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>Terminal locked. Retry in {remainingLockSeconds}s</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-['JetBrains_Mono'] text-[#666666] mb-2 uppercase tracking-wider">
              Enter Clearance Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                disabled={Boolean(lockedOutUntil)}
                placeholder="passkey (hint: bossrod)"
                autoFocus
                className="w-full bg-[#0a0a0a] border border-[#1e1e1e] focus:border-[#c8f000] px-3 py-2.5 text-xs text-[#f0f0f0] font-['JetBrains_Mono'] outline-none transition-colors disabled:opacity-50"
              />
              <KeyRound className="w-4 h-4 text-[#444444] absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {error && (
            <p className="text-[11px] font-['JetBrains_Mono'] text-red-400">
              {error}
            </p>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <span className="text-[10px] text-[#444444] font-['JetBrains_Mono']">
              sha256-verified
            </span>

            <button
              type="submit"
              disabled={Boolean(lockedOutUntil)}
              className="btn-acid flex items-center gap-1.5 text-xs py-2 px-4 cursor-pointer disabled:opacity-50"
            >
              <span>unlock</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
