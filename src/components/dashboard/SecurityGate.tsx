import React, { useState, useEffect } from 'react';
import { Lock, AlertTriangle, KeyRound, ArrowRight } from 'lucide-react';

interface SecurityGateProps {
  onAuthenticated: () => void;
  onCancel: () => void;
}

// Default fallback SHA-256 of "bossrod" if no env variable is provided
const DEFAULT_MASTER_HASH = "c6d0f9c2a8fd6b182f6eb132a42540d0ff8848b67cb9c6fd45e888d291ae505e";

// Can be overridden via VITE_ADMIN_PASS_HASH in .env / .env.local
const CONFIGURED_HASH = import.meta.env.VITE_ADMIN_PASS_HASH || DEFAULT_MASTER_HASH;

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
      // Strictly matches configured SHA-256 hash (no plaintext comparison)
      if (hashed === CONFIGURED_HASH) {
        sessionStorage.setItem('bossrod_auth_token', Date.now().toString());
        onAuthenticated();
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);

        if (nextAttempts >= 5) {
          const lockTime = Date.now() + 60 * 1000; // 60 second lockout
          setLockedOutUntil(lockTime);
          setRemainingLockSeconds(60);
          setError('maximum failed attempts exceeded. terminal locked for 60s.');
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
            <Lock className="w-4 h-4 text-[#dfa838]" />
            <span className="section-label text-[#dfa838]">// security checkpoint</span>
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
                placeholder="clearance passkey"
                autoFocus
                className="w-full bg-[#0a0a0a] border border-[#1e1e1e] focus:border-[#dfa838] px-3 py-2.5 text-xs text-[#f0f0f0] font-['JetBrains_Mono'] outline-none transition-colors disabled:opacity-50"
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
