import React, { useState } from 'react';
import {
  VAULT_STRATEGIES,
  VaultStrategySpec,
} from '../data/quantData';
import {
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Sliders,
  BarChart3,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ProductShowcaseSectionProps {
  onSelectStrategyForSimulator: (strategyId: string) => void;
  onOpenAllocationModal: (presetAmount?: number, presetStrategy?: string) => void;
}

export const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  onSelectStrategyForSimulator,
  onOpenAllocationModal,
}) => {
  const [selectedVaultId, setSelectedVaultId] = useState<string>(VAULT_STRATEGIES[1].id);

  const activeVault: VaultStrategySpec =
    VAULT_STRATEGIES.find((v) => v.id === selectedVaultId) || VAULT_STRATEGIES[1];

  const comparisonRows = [
    {
      dimension: 'Perpetual Funding Rate Impact',
      manualTrader: 'Pays -15% to -45% APR in funding drag holding long perps',
      vectisQuant: 'Collects +18% to +38% APY as the structural liquidity counterparty',
    },
    {
      dimension: 'Directional Crash Exposure',
      manualTrader: 'Vulnerable to overnight stop-hunts & cascade liquidations',
      vectisQuant: 'Delta-neutral (<0.02% net delta); profits from volatility spikes',
    },
    {
      dimension: 'Execution Speed & Fees',
      manualTrader: '150ms–400ms retail UI latency + 5 bps taker fee bleed',
      vectisQuant: '0.38ms co-located bare-metal execution + VIP9 maker rebates',
    },
    {
      dimension: 'Exchange Solvency Risk',
      manualTrader: '100% of margin sitting exposed on CEX hot wallets',
      vectisQuant: 'Bankruptcy-remote Fireblocks MPC & Copper ClearLoop custody',
    },
    {
      dimension: 'Operational Lifestyle',
      manualTrader: '24/7 screen fatigue monitoring macro headlines & funding resets',
      vectisQuant: 'Autonomous 24/7 algorithmic execution with instant mobile telemetry',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#070A10]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* PART 1: Interactive Strategy Vault Product Showcase */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/25 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#38BDF8] mb-4">
                <BarChart3 className="w-3.5 h-3.5" />
                AUDITED QUANTITATIVE VAULT SHOWCASE
              </div>
              <h2 className="font-display font-bold tracking-[-0.03em] text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-[#F8FAFC]">
                Three Specialized Mandates.{' '}
                <span className="text-emerald-cyan">Zero Directional Guesswork.</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-md">
              Inspect live vault mechanics, venue allocation weights, and audited monthly returns before deploying capital.
            </p>
          </div>
        </ScrollReveal>

        {/* Vault Selector Tabs */}
        <ScrollReveal delayMs={60}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8">
            {VAULT_STRATEGIES.map((vault) => {
              const isSelected = vault.id === activeVault.id;
              return (
                <button
                  key={vault.id}
                  onClick={() => setSelectedVaultId(vault.id)}
                  className={`p-5 rounded-2xl text-left transition-all cursor-pointer border relative overflow-hidden ${
                    isSelected
                      ? 'glass-panel-elevated border-[#10B981]/50 shadow-[0_0_35px_rgba(16,185,129,0.18)]'
                      : 'bg-[#0D111A]/60 border-white/[0.07] hover:border-white/[0.16] hover:bg-[#0D111A]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#38BDF8]" />
                  )}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono-tabular uppercase tracking-[0.1em] text-[#94A3B8]">
                      {vault.code}
                    </span>
                    <span
                      className={`text-xs font-mono-tabular font-bold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                          : 'bg-white/[0.05] text-[#CBD5E1]'
                      }`}
                    >
                      {vault.targetApy}% Target APY
                    </span>
                  </div>
                  <div className="font-display font-bold text-base sm:text-lg text-[#F8FAFC] leading-snug">
                    {vault.name}
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.06] text-xs font-mono-tabular text-[#64748B]">
                    <span>
                      Sharpe: <strong className="text-[#CBD5E1]">{vault.sharpe}</strong>
                    </span>
                    <span>
                      Max DD: <strong className="text-[#10B981]">{vault.maxDrawdown}</strong>
                    </span>
                    <span className="ml-auto text-[#94A3B8]">TVL {vault.totalTvl}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Vault Deep-Dive Inspection Panel */}
        <ScrollReveal delayMs={120}>
          <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8 lg:p-10 mb-24 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left 7 Cols: Vault Description, Mechanics & Monthly Return Strip */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-mono-tabular font-semibold text-[#10B981]">
                      {activeVault.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-xs font-mono-tabular text-[#CBD5E1]">
                      {activeVault.deltaExposure}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/25 text-xs font-mono-tabular text-[#38BDF8]">
                      {activeVault.minEpochLock}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC] tracking-[-0.02em] mb-3">
                    {activeVault.name}
                  </h3>
                  <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                    {activeVault.description}
                  </p>
                </div>

                {/* Key Execution Mechanics */}
                <div className="space-y-2.5">
                  <div className="text-xs font-mono-tabular uppercase tracking-[0.1em] text-[#64748B]">
                    EXECUTION & RISK MECHANICS
                  </div>
                  {activeVault.mechanics.map((mech, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[#06080D]/60 border border-white/[0.05]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#CBD5E1]">{mech}</span>
                    </div>
                  ))}
                </div>

                {/* Audited 6-Month Realized Return Strip */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#64748B] mb-2.5">
                    <span>RECENT AUDITED MONTHLY NET RETURNS (NET OF FEES)</span>
                    <span className="text-[#10B981]">100% POSITIVE EPOCHS</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {activeVault.monthlyReturns.map((m) => (
                      <div
                        key={m.month}
                        className="p-2.5 rounded-xl bg-[#06080D]/80 border border-[#10B981]/20 text-center font-mono-tabular"
                      >
                        <div className="text-[10px] text-[#64748B] uppercase">{m.month}</div>
                        <div className="text-sm font-bold text-[#10B981] mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Telemetry Box, Venue Breakdown & Direct Actions */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#06080D]/85 border border-white/[0.08] space-y-6">
                <div className="grid grid-cols-2 gap-4 pb-5 border-b border-white/[0.07]">
                  <div>
                    <div className="text-[11px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                      TARGET NET APY
                    </div>
                    <div className="font-mono-tabular font-bold text-2xl sm:text-3xl text-[#10B981] mt-1">
                      {activeVault.targetApy}%
                    </div>
                    <div className="text-[11px] font-mono-tabular text-[#94A3B8] mt-0.5">
                      Historical Range: {activeVault.apyRange}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                      SORTINO / SHARPE
                    </div>
                    <div className="font-mono-tabular font-bold text-2xl sm:text-3xl text-[#F8FAFC] mt-1">
                      {activeVault.sortino}{' '}
                      <span className="text-base text-[#38BDF8]">/ {activeVault.sharpe}</span>
                    </div>
                    <div className="text-[11px] font-mono-tabular text-[#94A3B8] mt-0.5">
                      Max Drawdown: {activeVault.maxDrawdown}
                    </div>
                  </div>
                </div>

                {/* Live Venue Deployment Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className="text-[#94A3B8] uppercase tracking-[0.08em]">
                      LIVE VENUE LIQUIDITY WEIGHTS
                    </span>
                    <span className="text-[#38BDF8]">AUTO-REBALANCED</span>
                  </div>

                  {activeVault.venueBreakdown.map((vb) => (
                    <div key={vb.venue} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono-tabular">
                        <span className="text-[#F8FAFC] font-medium">{vb.venue}</span>
                        <span className="text-[#94A3B8]">
                          {vb.role} • <strong className="text-[#10B981]">{vb.share}%</strong>
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#38BDF8] transition-all duration-500"
                          style={{ width: `${vb.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={() => onOpenAllocationModal(100000, activeVault.id)}
                    className="btn-emerald-primary w-full py-3.5 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Allocate to {activeVault.code.split(' ')[0]}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#simulator"
                    onClick={() => onSelectStrategyForSimulator(activeVault.id)}
                    className="w-full py-3 px-4 rounded-xl text-xs font-mono-tabular font-medium text-[#CBD5E1] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center gap-2 transition-all"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Load {activeVault.targetApy}% APY Vault into Yield Simulator</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* PART 2: Benefits & Trader Comparison Matrix */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#10B981] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              STRUCTURAL ALPHA VS. MANUAL PERP TRADING
            </div>
            <h2 className="font-display font-bold tracking-[-0.03em] text-2xl sm:text-4xl text-[#F8FAFC] mb-3">
              Why Top Crypto Traders Become the House Instead of Playing It
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              In perpetual futures markets, retail traders pay billions in funding and spread fees every quarter. Allocating to Vectis places your capital on the institutional receiving side of that cashflow.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={100}>
          <div className="glass-panel rounded-2xl overflow-hidden border border-white/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#0D111A]/90 border-b border-white/[0.08] text-xs font-mono-tabular uppercase tracking-[0.1em]">
              <div className="lg:col-span-3 p-4 sm:p-5 text-[#64748B] font-semibold">
                EXECUTION DIMENSION
              </div>
              <div className="lg:col-span-4 p-4 sm:p-5 text-[#EF4444] font-semibold border-t lg:border-t-0 lg:border-l border-white/[0.06]">
                SOLO MANUAL / DIRECTIONAL TRADING
              </div>
              <div className="lg:col-span-5 p-4 sm:p-5 text-[#10B981] font-semibold bg-[#10B981]/[0.05] border-t lg:border-t-0 lg:border-l border-[#10B981]/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                VECTIS QUANTITATIVE VAULT ALLOCATION
              </div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {comparisonRows.map((row) => (
                <div
                  key={row.dimension}
                  className="grid grid-cols-1 lg:grid-cols-12 items-center text-sm hover:bg-white/[0.015] transition-colors"
                >
                  <div className="lg:col-span-3 p-4 sm:p-5 font-display font-semibold text-[#F8FAFC]">
                    {row.dimension}
                  </div>
                  <div className="lg:col-span-4 p-4 sm:p-5 text-[#94A3B8] border-t lg:border-t-0 lg:border-l border-white/[0.06] flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                    <span>{row.manualTrader}</span>
                  </div>
                  <div className="lg:col-span-5 p-4 sm:p-5 text-[#F8FAFC] bg-[#10B981]/[0.03] border-t lg:border-t-0 lg:border-l border-[#10B981]/15 flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{row.vectisQuant}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
