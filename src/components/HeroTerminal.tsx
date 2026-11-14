import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Terminal,
  Zap,
  Shield,
  TrendingUp,
  Cpu,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { STRATEGY_PAIR_FEEDS, StrategyPairFeed } from '../data/quantData';
import { ScrollReveal } from './ScrollReveal';

interface HeroTerminalProps {
  onOpenAllocationModal: (presetAmount?: number, presetStrategy?: string) => void;
}

export const HeroTerminal: React.FC<HeroTerminalProps> = ({ onOpenAllocationModal }) => {
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);
  const [mouseTilt, setMouseTilt] = useState({ rotateX: 4, rotateY: -6 });
  const [executionPulse, setExecutionPulse] = useState(0);
  const [liveBlockNumber, setLiveBlockNumber] = useState(21489302);

  const activeFeed: StrategyPairFeed = STRATEGY_PAIR_FEEDS[activeFeedIndex];

  // Simulate live block & execution stream pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setExecutionPulse((prev) => (prev + 1) % 3);
      setLiveBlockNumber((prev) => prev + 1);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({
      rotateX: +(4 - y * 5).toFixed(2),
      rotateY: +(-6 + x * 6).toFixed(2),
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ rotateX: 4, rotateY: -6 });
  };

  // Build SVG path for the active strategy's cumulative return curve
  const chartWidth = 520;
  const chartHeight = 165;
  const points = activeFeed.chartPoints;
  const minVal = 99;
  const maxVal = Math.max(...points.map((p) => p.vectisReturn)) + 2;

  const getCoord = (idx: number, val: number) => {
    const x = (idx / (points.length - 1)) * (chartWidth - 28) + 14;
    const y =
      chartHeight -
      18 -
      ((val - minVal) / (maxVal - minVal)) * (chartHeight - 36);
    return { x, y };
  };

  const vectisCoords = points.map((p, idx) => getCoord(idx, p.vectisReturn));
  const benchmarkCoords = points.map((p, idx) => getCoord(idx, p.benchmarkReturn));

  const vectisLinePath = vectisCoords
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(' ');

  const vectisAreaPath = `${vectisLinePath} L ${vectisCoords[vectisCoords.length - 1].x.toFixed(
    1
  )} ${chartHeight - 12} L ${vectisCoords[0].x.toFixed(1)} ${chartHeight - 12} Z`;

  const benchmarkLinePath = benchmarkCoords
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(' ');

  const inspectedIndex = hoveredPointIdx !== null ? hoveredPointIdx : points.length - 1;
  const inspectedPoint = points[inspectedIndex];
  const inspectedCoord = vectisCoords[inspectedIndex];

  return (
    <section
      id="performance"
      className="relative min-h-[94vh] pt-32 sm:pt-36 pb-20 lg:pb-28 flex items-center overflow-hidden"
    >
      {/* Background Coordinate Grid & Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-quant-grid pointer-events-none" />
      <div
        className="absolute -top-24 left-1/4 w-[680px] h-[680px] rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.13) 0%, rgba(56, 189, 248, 0.06) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute top-1/3 -right-24 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.11) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 72%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT 6 COLUMNS: Copy, Value Proposition & Dual CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <ScrollReveal delayMs={0}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0D111A]/90 border border-[#10B981]/30 shadow-[0_0_25px_rgba(16,185,129,0.15)] mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <span className="text-[11px] sm:text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#CBD5E1]">
                  EPOCH #843 OPEN <span className="text-white/25 mx-1">•</span>{' '}
                  <span className="text-[#10B981] font-semibold">+31.8% NET COMPOSITE APY</span>
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={80}>
              <h1
                className="font-display font-bold tracking-[-0.035em] leading-[1.04] text-[2.65rem] sm:text-[3.5rem] xl:text-[4.25rem] mb-6"
              >
                <span className="text-metallic block">Institutional Alpha.</span>
                <span className="text-metallic block">Engineered for</span>
                <span className="text-emerald-cyan block mt-1">
                  Sovereign Crypto Capital.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delayMs={160}>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-[1.65] max-w-[58ch] mb-8 font-normal">
                Stop bleeding funding fees and directional drawdowns. Vectis deploys your capital across{' '}
                <span className="text-[#F8FAFC] font-medium">
                  delta-neutral perpetual basis arbitrage
                </span>
                ,{' '}
                <span className="text-[#F8FAFC] font-medium">
                  sub-millisecond cross-DEX market making
                </span>
                , and{' '}
                <span className="text-[#F8FAFC] font-medium">
                  MEV-shielded liquidity vaults
                </span>
                —secured off-exchange inside bankruptcy-remote MPC custody.
              </p>
            </ScrollReveal>

            {/* Dual Action Cluster */}
            <ScrollReveal delayMs={240} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
                <button
                  onClick={() => onOpenAllocationModal(100000, 'multi-strat')}
                  className="btn-emerald-primary inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold tracking-tight cursor-pointer"
                >
                  <span>Start Allocating Capital</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
                </button>

                <a
                  href="#simulator"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-medium text-[#F8FAFC] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#38BDF8]/40 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                >
                  <Terminal className="w-4 h-4 text-[#38BDF8]" />
                  <span>Simulate Net Yield</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Audited Institutional KPI Bar */}
            <ScrollReveal delayMs={320} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/[0.08] w-full">
                <div>
                  <div className="font-mono-tabular font-bold text-xl sm:text-2xl text-[#F8FAFC]">
                    $1.42B+
                  </div>
                  <div className="text-[11px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B] mt-0.5">
                    ACTIVE VAULT TVL
                  </div>
                </div>
                <div>
                  <div className="font-mono-tabular font-bold text-xl sm:text-2xl text-[#10B981]">
                    3.42
                  </div>
                  <div className="text-[11px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B] mt-0.5">
                    AUDITED SHARPE
                  </div>
                </div>
                <div>
                  <div className="font-mono-tabular font-bold text-xl sm:text-2xl text-[#38BDF8]">
                    0.38ms
                  </div>
                  <div className="text-[11px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B] mt-0.5">
                    ORDER ROUTING
                  </div>
                </div>
                <div>
                  <div className="font-mono-tabular font-bold text-xl sm:text-2xl text-[#F8FAFC]">
                    0.00%
                  </div>
                  <div className="text-[11px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B] mt-0.5">
                    MANAGEMENT FEE
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT 6 COLUMNS: 3D-Tilted Live Execution & Liquidity Terminal */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal delayMs={180} direction="right">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative mx-auto max-w-[620px] lg:max-w-none"
                style={{
                  perspective: '1200px',
                }}
              >
                {/* Floating Telemetry Badge 1 — Top Right */}
                <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl glass-panel-elevated border border-[#10B981]/35 absolute -top-5 -right-3 z-30 animate-float-slow shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-tabular uppercase tracking-[0.1em] text-[#94A3B8]">
                      EXECUTION LATENCY
                    </div>
                    <div className="text-xs font-mono-tabular font-bold text-[#F8FAFC] flex items-center gap-1.5">
                      <span className="text-[#10B981]">{activeFeed.latencyMs}ms</span>
                      <span className="text-white/25">•</span>
                      <span>ZERO SLIPPAGE</span>
                    </div>
                  </div>
                </div>

                {/* Floating Telemetry Badge 2 — Bottom Left */}
                <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl glass-panel-elevated border border-[#38BDF8]/35 absolute -bottom-5 -left-4 z-30 animate-float-delayed shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
                  <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-tabular uppercase tracking-[0.1em] text-[#94A3B8]">
                      30D RISK-ADJUSTED TELEMETRY
                    </div>
                    <div className="text-xs font-mono-tabular font-bold text-[#F8FAFC] flex items-center gap-1.5">
                      <span>Sharpe:</span>
                      <span className="text-[#10B981]">{activeFeed.sharpe30d}</span>
                      <span className="text-white/25">•</span>
                      <span>Max DD: {activeFeed.maxDrawdown}</span>
                    </div>
                  </div>
                </div>

                {/* Main 3D Perspective Glass Terminal Container */}
                <div
                  className="glass-panel-elevated rounded-2xl p-4 sm:p-6 transition-transform duration-300 ease-out relative overflow-hidden"
                  style={{
                    transform: `rotateX(${mouseTilt.rotateX}deg) rotateY(${mouseTilt.rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Top Specular Edge Glint */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[1px]"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.65) 35%, rgba(56,189,248,0.65) 65%, transparent 100%)',
                    }}
                  />

                  {/* Terminal Window Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
                      </div>
                      <span className="text-xs font-mono-tabular text-[#94A3B8] flex items-center gap-1.5 ml-1">
                        <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
                        VECTIS-CORE // ARBITRAGE TELEMETRY
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono-tabular text-[#64748B]">
                      <span className="inline-flex items-center gap-1 text-[#10B981]">
                        <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '5s' }} />
                        BLOCK #{liveBlockNumber}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Strategy Switcher Tabs */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#06080D]/90 border border-white/[0.07] mb-4">
                    {STRATEGY_PAIR_FEEDS.map((feed, idx) => {
                      const isActive = idx === activeFeedIndex;
                      return (
                        <button
                          key={feed.id}
                          onClick={() => {
                            setActiveFeedIndex(idx);
                            setHoveredPointIdx(null);
                          }}
                          className={`px-2.5 py-2 rounded-lg text-[11px] font-mono-tabular font-medium transition-all cursor-pointer text-left flex flex-col justify-between ${
                            isActive
                              ? 'bg-[#10B981]/15 text-[#F8FAFC] border border-[#10B981]/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                              : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.03] border border-transparent'
                          }`}
                        >
                          <span className="truncate font-semibold">{feed.pair}</span>
                          <span
                            className={`text-[10px] mt-0.5 ${
                              isActive ? 'text-[#10B981]' : 'text-[#64748B]'
                            }`}
                          >
                            +{feed.netApy}% Net APY
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Strategy Header Telemetry Readout */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4 p-3 rounded-xl bg-[#06080D]/60 border border-white/[0.06]">
                    <div>
                      <div className="text-[10px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                        REALIZED NET APY
                      </div>
                      <div className="text-lg sm:text-xl font-mono-tabular font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                        +{activeFeed.netApy.toFixed(1)}%
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                        FUNDING SPREAD
                      </div>
                      <div className="text-lg sm:text-xl font-mono-tabular font-bold text-[#38BDF8] mt-0.5">
                        +{inspectedPoint.basisSpreadBps.toFixed(1)} bps
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                        24H HEDGED VOL
                      </div>
                      <div className="text-lg sm:text-xl font-mono-tabular font-bold text-[#F8FAFC] mt-0.5">
                        {activeFeed.dailyVolume}
                      </div>
                    </div>
                  </div>

                  {/* Interactive SVG Cumulative Alpha Curve */}
                  <div className="relative rounded-xl bg-[#06080D]/80 border border-white/[0.06] p-3 mb-4">
                    <div className="flex items-center justify-between text-[11px] font-mono-tabular mb-2">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 text-[#10B981]">
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          Vectis NAV ({inspectedPoint.label}:{' '}
                          <strong>+{(inspectedPoint.vectisReturn - 100).toFixed(1)}%</strong>)
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1.5 text-[#64748B]">
                          <span className="w-2 h-0.5 bg-[#64748B]" />
                          DeFi Benchmark (+{(inspectedPoint.benchmarkReturn - 100).toFixed(1)}%)
                        </span>
                      </div>
                      <span className="text-[10px] text-[#64748B]">HOVER TO INSPECT</span>
                    </div>

                    <svg
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      className="w-full h-[145px] overflow-visible select-none"
                    >
                      <defs>
                        <linearGradient id="heroEmeraldFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.34" />
                          <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.06" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="heroEmeraldStroke" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="60%" stopColor="#34D399" />
                          <stop offset="100%" stopColor="#38BDF8" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Reference Grid Lines */}
                      {[0.2, 0.5, 0.8].map((ratio, i) => (
                        <line
                          key={i}
                          x1="14"
                          x2={chartWidth - 14}
                          y1={chartHeight * ratio}
                          y2={chartHeight * ratio}
                          stroke="rgba(255,255,255,0.05)"
                          strokeDasharray="3 3"
                        />
                      ))}

                      {/* Benchmark Muted Curve */}
                      <path
                        d={benchmarkLinePath}
                        fill="none"
                        stroke="#475569"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />

                      {/* Vectis Area Fill & Glowing Primary Curve */}
                      <path d={vectisAreaPath} fill="url(#heroEmeraldFill)" />
                      <path
                        d={vectisLinePath}
                        fill="none"
                        stroke="url(#heroEmeraldStroke)"
                        strokeWidth="2.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Vertical Crosshair Line for Inspected Point */}
                      {inspectedCoord && (
                        <>
                          <line
                            x1={inspectedCoord.x}
                            x2={inspectedCoord.x}
                            y1={12}
                            y2={chartHeight - 12}
                            stroke="rgba(16, 185, 129, 0.45)"
                            strokeWidth="1"
                            strokeDasharray="2 2"
                          />
                          <circle
                            cx={inspectedCoord.x}
                            cy={inspectedCoord.y}
                            r="6"
                            fill="rgba(16, 185, 129, 0.25)"
                          />
                          <circle
                            cx={inspectedCoord.x}
                            cy={inspectedCoord.y}
                            r="3.5"
                            fill="#10B981"
                            stroke="#06080D"
                            strokeWidth="1.5"
                          />
                        </>
                      )}

                      {/* Invisible Interactive Hover Columns */}
                      {vectisCoords.map((pt, idx) => {
                        const colWidth = chartWidth / points.length;
                        return (
                          <rect
                            key={idx}
                            x={pt.x - colWidth / 2}
                            y={0}
                            width={colWidth}
                            height={chartHeight}
                            fill="transparent"
                            className="cursor-crosshair"
                            onMouseEnter={() => setHoveredPointIdx(idx)}
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Live Hedged Order-Book Arbitrage Stream */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8] mb-2">
                      <span className="uppercase tracking-[0.08em] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                        LIVE ATOMIC HEDGED EXECUTIONS
                      </span>
                      <span className="text-[#64748B]">MEV-SHIELDED</span>
                    </div>

                    <div className="space-y-1.5">
                      {activeFeed.liveExecutions.map((exec, idx) => {
                        const isPulsing = idx === executionPulse;
                        return (
                          <div
                            key={exec.id}
                            className={`p-2.5 rounded-lg border font-mono-tabular text-[11px] transition-all duration-500 flex items-center justify-between gap-2 ${
                              isPulsing
                                ? 'bg-[#10B981]/[0.09] border-[#10B981]/35 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                                : 'bg-[#06080D]/65 border-white/[0.05]'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 text-[#F8FAFC] truncate">
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-[#94A3B8]">
                                  {exec.id}
                                </span>
                                <span className="text-[#10B981] font-medium truncate">
                                  {exec.legLong}
                                </span>
                                <span className="text-[#64748B]">⇄</span>
                                <span className="text-[#38BDF8] font-medium truncate">
                                  {exec.legShort}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 shrink-0">
                              <span className="text-[#CBD5E1] hidden sm:inline">
                                {exec.sizeUsd}
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] font-semibold">
                                {exec.capturedBps}
                              </span>
                              <span className="text-[10px] text-[#64748B] w-11 text-right">
                                {exec.latency}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Venue Settlement Strip */}
                  <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-tabular text-[#64748B]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>SETTLEMENT VENUES:</span>
                      {activeFeed.activeVenues.map((v) => (
                        <span
                          key={v}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[#94A3B8]"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
