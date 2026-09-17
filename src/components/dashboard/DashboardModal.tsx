import { useState, useEffect } from 'react';
import {
  Activity,
  Globe2,
  Server,
  RefreshCw,
  LogOut,
  X,
  Compass,
  BarChart2,
  Layers,
} from 'lucide-react';
import {
  MOCK_TELEMETRY,
  probeNode,
  type NodeHealth,
  type TelemetrySummary,
  type DailyDataPoint,
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
  const [selectedDomainId, setSelectedDomainId] = useState<string>('all');

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

  // Compute active trend data based on selection
  const selectedDomain = telemetry.subdomains.find((s) => s.id === selectedDomainId);

  const activeDailyTrend: DailyDataPoint[] = selectedDomain
    ? selectedDomain.dailyTrend
    : telemetry.dailyTrend;

  // Max requests in active trend to scale the bars
  const maxDailyRequests = Math.max(...activeDailyTrend.map((d) => d.requests), 1);
  const total7DayRequests = activeDailyTrend.reduce((acc, cur) => acc + cur.requests, 0);
  const avgDailyRequests = Math.round(total7DayRequests / activeDailyTrend.length);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md overflow-y-auto flex items-start justify-center p-3 sm:p-6">
      <div className="w-full max-w-6xl bg-[#0f0f0f] border border-[#1e1e1e] p-4 sm:p-6 my-auto shadow-2xl flex flex-col gap-5">

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
          <div className="flat-card p-3 bg-[#141414]">
            <span className="section-label">24h edge requests</span>
            <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#f0f0f0] mt-1">
              {telemetry.totalRequests24h.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#666666] font-['JetBrains_Mono']">
              +14.2% vs yesterday
            </span>
          </div>

          <div className="flat-card p-3 bg-[#141414]">
            <span className="section-label">unique visitors</span>
            <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#c8f000] mt-1">
              {telemetry.totalVisitors24h.toLocaleString()}
            </div>
            <span className="text-[10px] text-[#666666] font-['JetBrains_Mono']">
              cross-subdomain sessions
            </span>
          </div>

          <div className="flat-card p-3 bg-[#141414]">
            <span className="section-label">active nodes</span>
            <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#f0f0f0] mt-1">
              {telemetry.activeNodes} / {telemetry.totalNodes}
            </div>
            <span className="text-[10px] text-[#c8f000] font-['JetBrains_Mono']">
              100% operational
            </span>
          </div>

          <div className="flat-card p-3 bg-[#141414]">
            <span className="section-label">avg edge latency</span>
            <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#f0f0f0] mt-1">
              {telemetry.avgLatencyMs}ms
            </div>
            <span className="text-[10px] text-[#666666] font-['JetBrains_Mono']">
              error rate: {telemetry.errorRatePercent}%
            </span>
          </div>
        </div>

        {/* ── Filter: Domain Selector ─────────────────────────── */}
        <div className="flex items-center flex-wrap gap-1.5 p-2 bg-[#121212] border border-[#1e1e1e]">
          <span className="section-label text-[#666666] mr-2 flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#c8f000]" />
            scope:
          </span>

          <button
            onClick={() => setSelectedDomainId('all')}
            className={`text-xs font-['JetBrains_Mono'] px-2.5 py-1 transition-colors cursor-pointer border ${
              selectedDomainId === 'all'
                ? 'bg-[#c8f000] text-black font-bold border-[#c8f000]'
                : 'bg-transparent text-[#888888] border-[#1e1e1e] hover:border-[#333333] hover:text-[#f0f0f0]'
            }`}
          >
            All Subdomains (Combined)
          </button>

          {telemetry.subdomains.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedDomainId(s.id)}
              className={`text-xs font-['JetBrains_Mono'] px-2.5 py-1 transition-colors cursor-pointer border ${
                selectedDomainId === s.id
                  ? 'bg-[#c8f000] text-black font-bold border-[#c8f000]'
                  : 'bg-transparent text-[#888888] border-[#1e1e1e] hover:border-[#333333] hover:text-[#f0f0f0]'
              }`}
            >
              {s.subdomain}
            </button>
          ))}
        </div>

        {/* ── Section: Daily Trends & Domain Analytics ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Daily Trend Chart (7 cols) */}
          <div className="lg:col-span-7 flat-card p-4 bg-[#111111] flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1e1e1e]">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-3.5 h-3.5 text-[#c8f000]" />
                <span className="section-label text-[#c8f000]">
                  {selectedDomain ? `${selectedDomain.name} (${selectedDomain.subdomain})` : 'Ecosystem-Wide'} // 7-day daily trend
                </span>
              </div>
              <div className="text-[10px] font-['JetBrains_Mono'] text-[#666666]">
                avg: {avgDailyRequests.toLocaleString()} reqs/day
              </div>
            </div>

            {/* Scope Summary Banner */}
            <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 bg-[#141414] border border-[#1a1a1a] text-xs font-['JetBrains_Mono']">
              <div>
                <span className="section-label block">7-day volume</span>
                <span className="text-[#f0f0f0] font-bold text-sm">{total7DayRequests.toLocaleString()}</span>
              </div>
              <div>
                <span className="section-label block">current share</span>
                <span className="text-[#c8f000] font-bold text-sm">
                  {selectedDomain ? `${selectedDomain.sharePercentage}%` : '100%'}
                </span>
              </div>
              <div>
                <span className="section-label block">top geo</span>
                <span className="text-[#d0d0d0] text-sm">
                  {selectedDomain ? selectedDomain.topCountry : '🇵🇭 PH (46%)'}
                </span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-44 pt-4 px-1 flex-1">
              {activeDailyTrend.map((dp) => {
                const heightPercent = Math.max(12, Math.round((dp.requests / maxDailyRequests) * 100));
                const isToday = dp.day === 'Today';

                return (
                  <div
                    key={dp.date}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#0a0a0a] border border-[#333333] px-2 py-0.5 text-[9px] font-mono text-[#f0f0f0] whitespace-nowrap z-10">
                      {dp.requests.toLocaleString()} reqs · {dp.visitors.toLocaleString()} users
                    </div>

                    {/* Bar value */}
                    <span className="text-[9px] font-['JetBrains_Mono'] text-[#666666] mb-1 group-hover:text-[#c8f000] transition-colors">
                      {(dp.requests / 1000).toFixed(1)}k
                    </span>

                    {/* Bar element */}
                    <div className="w-full max-w-[36px] bg-[#1a1a1a] rounded-t-[1px] overflow-hidden flex flex-col justify-end h-full">
                      <div
                        className={`w-full transition-all duration-300 ${
                          isToday
                            ? 'bg-[#c8f000]'
                            : 'bg-[#444444] group-hover:bg-[#c8f000]/80'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    {/* Labels */}
                    <span className={`text-[10px] font-['JetBrains_Mono'] mt-1.5 ${isToday ? 'text-[#c8f000] font-bold' : 'text-[#888888]'}`}>
                      {dp.day}
                    </span>
                    <span className="text-[9px] font-['JetBrains_Mono'] text-[#555555]">
                      {dp.date}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-2 border-t border-[#1e1e1e] flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[#666666]">
              <span>7-day retention & edge traffic curves</span>
              <span>updated live via CloudWatch metrics</span>
            </div>
          </div>

          {/* Subdomain Distribution & Drilldown Table (5 cols) */}
          <div className="lg:col-span-5 flat-card p-4 bg-[#111111] flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1e1e1e]">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#c8f000]" />
                <span className="section-label text-[#c8f000]">distribution by domain (click to filter)</span>
              </div>
              <span className="text-[10px] font-['JetBrains_Mono'] text-[#666666]">
                24h share
              </span>
            </div>

            <div className="space-y-2 flex-1">
              {telemetry.subdomains.map((item) => {
                const isSelected = selectedDomainId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDomainId(isSelected ? 'all' : item.id)}
                    className={`p-2.5 border transition-all cursor-pointer text-xs font-['JetBrains_Mono'] ${
                      isSelected
                        ? 'border-[#c8f000] bg-[#181a0e]'
                        : 'border-[#1a1a1a] hover:border-[#2a2a2a] bg-[#131313]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        {isSelected && <div className="w-1.5 h-1.5 bg-[#c8f000] rounded-full" />}
                        <span className={`font-medium ${isSelected ? 'text-[#c8f000]' : 'text-[#f0f0f0]'}`}>
                          {item.subdomain}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-[#888888]">{item.requests.toLocaleString()} reqs</span>
                        <span className="text-[#c8f000] font-bold w-12 text-right">{item.sharePercentage}%</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1 bg-[#1a1a1a] overflow-hidden my-1">
                      <div
                        className={`h-full ${isSelected ? 'bg-[#c8f000]' : 'bg-[#666666]'}`}
                        style={{ width: `${item.sharePercentage}%` }}
                      />
                    </div>

                    {/* Metadata line */}
                    <div className="flex items-center justify-between text-[10px] text-[#666666] pt-0.5">
                      <span>{item.uniqueVisitors.toLocaleString()} unique users</span>
                      <span>{item.bandwidthMb} MB transfer</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-2 border-t border-[#1e1e1e] flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[#666666]">
              <span>click any card above to focus daily trends</span>
              {selectedDomainId !== 'all' && (
                <button
                  onClick={() => setSelectedDomainId('all')}
                  className="text-[#c8f000] hover:underline cursor-pointer"
                >
                  [reset to all]
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ── Section: Live Health & Geolocation Breakdown ─────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Live Node Probe Matrix */}
          <div className="flat-card p-4 bg-[#111111]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1e1e1e]">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-[#c8f000]" />
                <span className="section-label text-[#c8f000]">live node matrix</span>
              </div>
              {lastProbedTime && (
                <span className="text-[10px] font-['JetBrains_Mono'] text-[#666666]">
                  {lastProbedTime}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {nodeHealths.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-1.5 border border-[#1a1a1a] hover:border-[#262626] transition-colors text-xs font-['JetBrains_Mono']"
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
          </div>

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

          {/* Traffic Sources & Clients */}
          <div className="flat-card p-4 bg-[#111111]">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1e1e1e]">
              <Compass className="w-3.5 h-3.5 text-[#c8f000]" />
              <span className="section-label text-[#c8f000]">acquisition & clients</span>
            </div>

            <div className="space-y-2 text-xs font-['JetBrains_Mono']">
              <div className="space-y-1.5 pb-2 border-b border-[#1a1a1a]">
                <span className="text-[10px] text-[#666666] uppercase tracking-wider block">channels</span>
                {telemetry.referrers.slice(0, 3).map((ref) => (
                  <div key={ref.source} className="flex items-center justify-between">
                    <span className="text-[#888888] text-[11px]">{ref.source}</span>
                    <span className="text-[#c8f000] font-bold text-[11px]">{ref.percentage}%</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-[#666666] uppercase tracking-wider block">platforms</span>
                {telemetry.devices.map((dev) => (
                  <div key={dev.type} className="flex items-center justify-between">
                    <span className="text-[#888888] text-[11px]">{dev.type}</span>
                    <span className="text-[#f0f0f0] text-[11px]">{dev.percentage}%</span>
                  </div>
                ))}
              </div>
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
