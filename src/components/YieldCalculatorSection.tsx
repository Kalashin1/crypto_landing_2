import React, { useState } from 'react';
import {
  Calculator,
  ArrowUpRight,
  TrendingUp,
  Shield,
  RefreshCcw,
  Sparkles,
} from 'lucide-react';
import { VAULT_STRATEGIES } from '../data/quantData';
import { ScrollReveal } from './ScrollReveal';

interface YieldCalculatorSectionProps {
  selectedStrategyId: string;
  onStrategyChange: (strategyId: string) => void;
  onOpenAllocationModal: (presetAmount: number, presetStrategy: string) => void;
}

export const YieldCalculatorSection: React.FC<YieldCalculatorSectionProps> = ({
  selectedStrategyId,
  onStrategyChange,
  onOpenAllocationModal,
}) => {
  const [capital, setCapital] = useState<number>(250000);
  const [horizonMonths, setHorizonMonths] = useState<6 | 12 | 36>(12);
  const [autoCompound, setAutoCompound] = useState<boolean>(true);

  const activeVault =
    VAULT_STRATEGIES.find((v) => v.id === selectedStrategyId) || VAULT_STRATEGIES[1];

  const annualRate = activeVault.targetApy / 100;
  const benchmarkRate = 0.042; // 4.2% standard staking benchmark
  const years = horizonMonths / 12;

  // Compute ending value & alpha
  const projectedFinalValue = autoCompound
    ? capital * Math.pow(1 + annualRate / 52, 52 * years)
    : capital * (1 + annualRate * years);

  const benchmarkFinalValue = capital * Math.pow(1 + benchmarkRate / 12, 12 * years);

  const netProfitUsd = projectedFinalValue - capital;
  const netReturnPct = ((projectedFinalValue - capital) / capital) * 100;
  const avgMonthlyYieldUsd = netProfitUsd / horizonMonths;
  const outperformanceVsBenchmark = projectedFinalValue - benchmarkFinalValue;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  // Generate 12 SVG curve points across the selected horizon
  const steps = 12;
  const svgWidth = 560;
  const svgHeight = 200;

  const curveData = Array.from({ length: steps + 1 }, (_, i) => {
    const tYears = (i / steps) * years;
    const vectisVal = autoCompound
      ? capital * Math.pow(1 + annualRate / 52, 52 * tYears)
      : capital * (1 + annualRate * tYears);
    const benchVal = capital * Math.pow(1 + benchmarkRate / 12, 12 * tYears);
    return { step: i, vectisVal, benchVal };
  });

  const minVal = capital * 0.98;
  const maxVal = Math.max(projectedFinalValue * 1.04, capital * 1.15);

  const toPoint = (stepIdx: number, val: number) => {
    const x = (stepIdx / steps) * (svgWidth - 32) + 16;
    const y =
      svgHeight -
      22 -
      ((val - minVal) / (maxVal - minVal)) * (svgHeight - 44);
    return { x, y };
  };

  const vectisPts = curveData.map((d) => toPoint(d.step, d.vectisVal));
  const benchPts = curveData.map((d) => toPoint(d.step, d.benchVal));

  const vectisPath = vectisPts
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const vectisArea = `${vectisPath} L ${vectisPts[vectisPts.length - 1].x.toFixed(
    1
  )} ${svgHeight - 16} L ${vectisPts[0].x.toFixed(1)} ${svgHeight - 16} Z`;

  const benchPath = benchPts
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const presets = [25000, 100000, 250000, 1000000, 2500000, 5000000];

  // Calculate slider progress % for track fill
  const sliderPct = ((capital - 10000) / (5000000 - 10000)) * 100;

  return (
    <section
      id="simulator"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Ambient Emerald/Cyan Center Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.11) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 72%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#10B981] mb-4">
              <Calculator className="w-3.5 h-3.5" />
              INTERACTIVE CAPITAL ALLOCATION & YIELD SIMULATOR
            </div>
            <h2 className="font-display font-bold tracking-[-0.03em] text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-[#F8FAFC] mb-4">
              Model Your Institutional Alpha{' '}
              <span className="text-emerald-cyan">Before Deploying a Single Dollar.</span>
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Configure your initial capital commitment, select an audited quantitative vault, and compare net compounded returns against standard passive staking benchmarks.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/[0.1]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* LEFT 6 COLUMNS: Interactive Controls */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-7">
                {/* 1. Capital Slider & Quick Presets */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#06080D]/80 border border-white/[0.07]">
                  <div className="flex items-baseline justify-between gap-2 mb-4">
                    <label
                      htmlFor="capital-range"
                      className="text-xs font-mono-tabular uppercase tracking-[0.1em] text-[#94A3B8]"
                    >
                      01 // INITIAL CAPITAL ALLOCATION
                    </label>
                    <div className="font-mono-tabular font-bold text-2xl sm:text-3xl text-[#10B981]">
                      {formatCurrency(capital)}
                    </div>
                  </div>

                  <input
                    id="capital-range"
                    type="range"
                    min={10000}
                    max={5000000}
                    step={10000}
                    value={capital}
                    onChange={(e) => setCapital(Number(e.target.value))}
                    className="quant-slider mb-4"
                    style={{
                      background: `linear-gradient(to right, #10B981 0%, #38BDF8 ${sliderPct}%, rgba(255,255,255,0.1) ${sliderPct}%, rgba(255,255,255,0.1) 100%)`,
                    }}
                  />

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {presets.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setCapital(amt)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-tabular transition-all cursor-pointer ${
                          capital === amt
                            ? 'bg-[#10B981] text-[#04130E] font-bold shadow-[0_0_16px_rgba(16,185,129,0.4)]'
                            : 'bg-white/[0.04] hover:bg-white/[0.09] text-[#94A3B8] hover:text-white border border-white/[0.06]'
                        }`}
                      >
                        {amt >= 1000000 ? `$${amt / 1000000}M` : `$${amt / 1000}K`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Strategy Mandate Selector */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#06080D]/80 border border-white/[0.07]">
                  <div className="text-xs font-mono-tabular uppercase tracking-[0.1em] text-[#94A3B8] mb-3.5">
                    02 // SELECT QUANTITATIVE VAULT MANDATE
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {VAULT_STRATEGIES.map((v) => {
                      const isActive = v.id === activeVault.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => onStrategyChange(v.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#10B981]/15 border-[#10B981]/45 shadow-[0_0_24px_rgba(16,185,129,0.15)]'
                              : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]'
                          }`}
                        >
                          <div className="text-[10px] font-mono-tabular text-[#94A3B8] uppercase">
                            {v.code.split('//')[0]}
                          </div>
                          <div className="font-display font-bold text-xs text-[#F8FAFC] mt-1 line-clamp-1">
                            {v.name}
                          </div>
                          <div className="font-mono-tabular font-bold text-sm text-[#10B981] mt-1.5">
                            {v.targetApy}% Net APY
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Horizon & Auto-Compound Controls */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#06080D]/80 border border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono-tabular uppercase tracking-[0.1em] text-[#94A3B8] mb-2">
                      03 // EPOCH HORIZON
                    </div>
                    <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                      {(
                        [
                          { m: 6, label: '6 Months' },
                          { m: 12, label: '1 Year' },
                          { m: 36, label: '3 Years' },
                        ] as const
                      ).map((item) => (
                        <button
                          key={item.m}
                          onClick={() => setHorizonMonths(item.m)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tabular transition-all cursor-pointer ${
                            horizonMonths === item.m
                              ? 'bg-[#10B981] text-[#04130E] font-bold'
                              : 'text-[#94A3B8] hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono-tabular uppercase tracking-[0.1em] text-[#94A3B8] mb-2">
                      WEEKLY RE-COMPOUNDING
                    </div>
                    <button
                      onClick={() => setAutoCompound(!autoCompound)}
                      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs font-mono-tabular transition-all cursor-pointer ${
                        autoCompound
                          ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
                          : 'bg-white/[0.04] border-white/[0.08] text-[#94A3B8]'
                      }`}
                    >
                      <RefreshCcw className="w-3.5 h-3.5" />
                      <span>{autoCompound ? 'AUTO-COMPOUND: ON' : 'SIMPLE PAYOUT'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT 6 COLUMNS: Computed Telemetry & Dynamic SVG Trajectory */}
              <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#06080D]/90 border border-white/[0.08]">
                {/* Primary Projected Readouts */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-5 border-b border-white/[0.07]">
                    <div>
                      <div className="text-xs font-mono-tabular uppercase tracking-[0.1em] text-[#94A3B8]">
                        PROJECTED ENDING PORTFOLIO VALUE ({horizonMonths}M)
                      </div>
                      <div className="font-mono-tabular font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-[#F8FAFC] mt-1 tracking-tight">
                        {formatCurrency(projectedFinalValue)}
                      </div>
                    </div>
                    <div className="px-3.5 py-2 rounded-xl bg-[#10B981]/15 border border-[#10B981]/35 text-right">
                      <div className="text-[10px] font-mono-tabular uppercase tracking-[0.08em] text-[#10B981]">
                        NET CUMULATIVE ALPHA
                      </div>
                      <div className="font-mono-tabular font-bold text-lg sm:text-xl text-[#10B981]">
                        +{formatCurrency(netProfitUsd)} (+{netReturnPct.toFixed(1)}%)
                      </div>
                    </div>
                  </div>

                  {/* Secondary 3-Metric Telemetry Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[10px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                        EST. MONTHLY YIELD
                      </div>
                      <div className="font-mono-tabular font-bold text-base sm:text-lg text-[#38BDF8] mt-1">
                        +{formatCurrency(avgMonthlyYieldUsd)}/mo
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[10px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                        AUDITED SHARPE
                      </div>
                      <div className="font-mono-tabular font-bold text-base sm:text-lg text-[#F8FAFC] mt-1 flex items-center gap-1">
                        {activeVault.sharpe}
                        <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[10px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                        MAX DRAWDOWN BOUND
                      </div>
                      <div className="font-mono-tabular font-bold text-base sm:text-lg text-[#10B981] mt-1 flex items-center gap-1">
                        {activeVault.maxDrawdown}
                        <Shield className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic SVG Comparison Curve */}
                  <div className="rounded-xl bg-[#090D16] border border-white/[0.06] p-4 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular mb-3">
                      <span className="inline-flex items-center gap-2 text-[#10B981] font-semibold">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                        Vectis {activeVault.code.split('//')[0]} ({activeVault.targetApy}% APY)
                      </span>
                      <span className="inline-flex items-center gap-2 text-[#64748B]">
                        <span className="w-2.5 h-0.5 bg-[#64748B]" />
                        DeFi Staking Benchmark (4.2% APY)
                      </span>
                    </div>

                    <svg
                      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                      className="w-full h-[165px] overflow-visible"
                    >
                      <defs>
                        <linearGradient id="calcEmeraldArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {[0.25, 0.55, 0.85].map((r, i) => (
                        <line
                          key={i}
                          x1="16"
                          x2={svgWidth - 16}
                          y1={svgHeight * r}
                          y2={svgHeight * r}
                          stroke="rgba(255,255,255,0.05)"
                          strokeDasharray="3 3"
                        />
                      ))}

                      {/* Benchmark Curve */}
                      <path
                        d={benchPath}
                        fill="none"
                        stroke="#64748B"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Vectis Quant Curve */}
                      <path d={vectisArea} fill="url(#calcEmeraldArea)" />
                      <path
                        d={vectisPath}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* End Point Indicator */}
                      <circle
                        cx={vectisPts[vectisPts.length - 1].x}
                        cy={vectisPts[vectisPts.length - 1].y}
                        r="7"
                        fill="rgba(16, 185, 129, 0.25)"
                      />
                      <circle
                        cx={vectisPts[vectisPts.length - 1].x}
                        cy={vectisPts[vectisPts.length - 1].y}
                        r="4"
                        fill="#10B981"
                        stroke="#06080D"
                        strokeWidth="1.5"
                      />
                    </svg>

                    <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8] pt-2 border-t border-white/[0.05]">
                      <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                        Outperformance vs Staking Benchmark:
                      </span>
                      <span className="text-[#10B981] font-bold">
                        +{formatCurrency(outperformanceVsBenchmark)} Extra Alpha
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Conversion CTA */}
                <button
                  onClick={() => onOpenAllocationModal(capital, activeVault.id)}
                  className="btn-emerald-primary w-full py-4 px-6 rounded-xl text-base font-semibold flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Lock In {formatCurrency(capital)} Allocation Parameters</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
