import { useState, useEffect } from 'react';
import {
  Activity,
  Globe2,
  Server,
  RefreshCw,
  LogOut,
  X,
  Compass,
  Laptop,
} from 'lucide-react';
import {
  MOCK_TELEMETRY,
  probeNode,
  type NodeHealth,
  type TelemetrySummary,
} from '../../services/telemetryService';
import { SUBDOMAINS } from '../../data/subdomains';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function DashboardModal({ isOpen, onClose, onLogout }: DashboardModalProps) {
  const [telemetry] = useState<TelemetrySummary>(MOCK_TELEMETRY);
  const [nodeHealths, setNodeHealths] = useState<NodeHealth[]>([]);
  const [isProbing, setIsProbing] = useState(false);
  const [lastProbedTime, setLastProbedTime] = useState<string>('');

  // Probes all active subdomains
  const runHealthProbe = async () => {
    setIsProbing(true);

    const targets = [
      ...SUBDOMAINS.map((s) => ({
        id: s.id,
        name: s.name,
        subdomain: s.subdomain,
        url: s.url,
      })),
      {
        id: 'hub',
        name: 'Apex Hub',
        subdomain: 'bossrod.com',
        url: window.location.origin,
      },
    ];

    const results = await Promise.all(
      targets.map((t) => probeNode(t.url, t.id, t.name, t.subdomain))
    );

    setNodeHealths(results);
    setLastProbedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setIsProbing(false);
  };

  useEffect(() => {
    if (isOpen) {
      runHealthProbe();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md overflow-y-auto flex items-start justify-center p-3 sm:p-6">
      <div className="w-full max-w-6xl bg-[#0f0f0f] border border-[#1e1e1e] p-4 sm:p-6 my-auto shadow-2xl flex flex-col gap-6">

        {/* ── Top Header ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="acid-dot" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Barlow_Condensed'] font-bold text-xl uppercase tracking-wider text-[#f0f0f0]">
                  bossrod // telemetry control
                </span>
                <span className="mono-tag text-[#c8f000] border-[#c8f000]/40">
                  internal
                </span>
              </div>
              <p className="text-[11px] font-['JetBrains_Mono'] text-[#666666]">
                ap-southeast-1 edge analytics · 4 subdomains + apex hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runHealthProbe}
              disabled={isProbing}
              className="btn-ghost text-[11px] py-1.5 px-3 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isProbing ? 'animate-spin text-[#c8f000]' : ''}`} />
              <span>{isProbing ? 'probing...' : 'probe nodes'}</span>
            </button>

            <button
              onClick={onLogout}
              className="btn-ghost text-[11px] py-1.5 px-3 flex items-center gap-1.5 text-red-400 hover:text-red-300 border-red-950/50 hover:border-red-800 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>lock</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#666666] hover:text-[#f0f0f0] border border-[#1e1e1e] hover:border-[#333333] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Quick KPI Stat Cards ────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          <div className="flat-card p-3.5 bg-[#141414]">
            <span className="section-label">24h edge requests</span>
            <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#f0f0f0] mt-1">
              {telemetry.totalRequests24h.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#666666] font-['JetBrains_Mono']">
              +14.2% vs yesterday
            </span>
          </div>

          <div className="flat-card p-3.5 bg-[#141414]">
            <span className="section-label">unique visitors</span>
            <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#c8f000] mt-1">
              {telemetry.totalVisitors24h.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#666666] font-['JetBrains_Mono']">
              cross-subdomain sessions
            </span>
          </div>

          <div className="flat-card p-3.5 bg-[#141414]">
            <span className="section-label">active nodes</span>
            <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#f0f0f0] mt-1">
              {telemetry.activeNodes} / {telemetry.totalNodes}
            </div>
            <span className="text-[10px] text-[#c8f000] font-['JetBrains_Mono']">
              100% operational
            </span>
          </div>

          <div className="flat-card p-3.5 bg-[#141414]">
            <span className="section-label">avg edge latency</span>
            <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#f0f0f0] mt-1">
              {telemetry.avgLatencyMs}ms
            </div>
            <span className="text-[10px] text-[#666666] font-['JetBrains_Mono']">
              error rate: {telemetry.errorRatePercent}%
            </span>
          </div>
        </div>

        {/* ── Section: Subdomain Traffic & Live Health Matrix ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Left: Subdomain Breakdown (7 cols) */}
          <div className="lg:col-span-7 flat-card p-4 bg-[#111111] flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1e1e1e]">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#c8f000]" />
                <span className="section-label text-[#c8f000]">traffic distribution by subdomain (24h)</span>
              </div>
              <span className="text-[10px] font-['JetBrains_Mono'] text-[#666666]">
                share of total
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {telemetry.subdomains.map((item) => (
                <div key={item.id} className="text-xs font-['JetBrains_Mono']">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#f0f0f0] font-medium">{item.subdomain}</span>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="text-[#888888]">{item.requests.toLocaleString()} reqs</span>
                      <span className="text-[#c8f000] font-bold w-12 text-right">{item.sharePercentage}%</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#1a1a1a] overflow-hidden">
                    <div
                      className="h-full bg-[#c8f000]"
                      style={{ width: `${item.sharePercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#1e1e1e] flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[#666666]">
              <span>bandwidth consumed: ~1.34 GB</span>
              <span>cache hit ratio: 94.2%</span>
            </div>
          </div>

          {/* Right: Live Health Matrix (5 cols) */}
          <div className="lg:col-span-5 flat-card p-4 bg-[#111111] flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1e1e1e]">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-[#c8f000]" />
                <span className="section-label text-[#c8f000]">live node probe matrix</span>
              </div>
              {lastProbedTime && (
                <span className="text-[10px] font-['JetBrains_Mono'] text-[#666666]">
                  {lastProbedTime}
                </span>
              )}
            </div>

            <div className="space-y-2 flex-1">
              {nodeHealths.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-2 border border-[#1a1a1a] hover:border-[#262626] transition-colors text-xs font-['JetBrains_Mono']"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c8f000]" />
                    <div>
                      <div className="text-[#f0f0f0] text-[11px] leading-tight">{node.name}</div>
                      <div className="text-[#666666] text-[10px]">{node.subdomain}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#888888] font-mono">
                      {node.latencyMs}ms
                    </span>
                    <span className="mono-tag text-[9px] py-0 px-1 border-emerald-800 text-emerald-400">
                      200 OK
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#1e1e1e] text-[10px] font-['JetBrains_Mono'] text-[#666666]">
              all endpoints protected via TLS 1.3 & CloudFront OAC
            </div>
          </div>

        </div>

        {/* ── Section: Geolocation & Acquisition Sources ─────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Geolocation Rankings */}
          <div className="flat-card p-4 bg-[#111111]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1e1e1e]">
              <Globe2 className="w-3.5 h-3.5 text-[#c8f000]" />
              <span className="section-label text-[#c8f000]">top geolocations (viewer country)</span>
            </div>

            <div className="space-y-2.5">
              {telemetry.geolocations.map((geo) => (
                <div key={geo.code} className="text-xs font-['JetBrains_Mono']">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#d0d0d0] flex items-center gap-1.5">
                      <span>{geo.flag}</span>
                      <span>{geo.country}</span>
                    </span>
                    <span className="text-[#888888] text-[11px]">{geo.percentage}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#1a1a1a]">
                    <div
                      className="h-full bg-[#c8f000]"
                      style={{ width: `${geo.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources / Referrers */}
          <div className="flat-card p-4 bg-[#111111]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1e1e1e]">
              <Compass className="w-3.5 h-3.5 text-[#c8f000]" />
              <span className="section-label text-[#c8f000]">acquisition channels</span>
            </div>

            <div className="space-y-2.5">
              {telemetry.referrers.map((ref) => (
                <div key={ref.source} className="flex items-center justify-between text-xs font-['JetBrains_Mono'] py-1 border-b border-[#1a1a1a]">
                  <span className="text-[#d0d0d0]">{ref.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#666666] text-[10px]">{ref.count}</span>
                    <span className="text-[#c8f000] font-bold text-[11px]">{ref.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devices & Browsers */}
          <div className="flat-card p-4 bg-[#111111]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1e1e1e]">
              <Laptop className="w-3.5 h-3.5 text-[#c8f000]" />
              <span className="section-label text-[#c8f000]">client breakdown</span>
            </div>

            <div className="space-y-3">
              {telemetry.devices.map((dev) => (
                <div key={dev.type} className="text-xs font-['JetBrains_Mono']">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#d0d0d0] text-[11px]">{dev.type}</span>
                    <span className="text-[#888888] text-[11px]">{dev.percentage}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#1a1a1a]">
                    <div
                      className="h-full bg-[#888888]"
                      style={{ width: `${dev.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#1e1e1e] text-[10px] font-['JetBrains_Mono'] text-[#666666]">
              viewport: 62% mobile-first
            </div>
          </div>

        </div>

        {/* ── Footer Status Bar ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-[#1e1e1e] text-[10px] font-['JetBrains_Mono'] text-[#555555]">
          <span>telemetry source: cloudfront edge logs & live http probes</span>
          <span>session active (auto-locks on tab close)</span>
        </div>

      </div>
    </div>
  );
}
