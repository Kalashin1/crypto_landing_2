import React, { useState } from 'react';
import {
  Cpu,
  ShieldAlert,
  Scale,
  KeyRound,
  CheckCircle2,
  Zap,
  Lock,
  Layers,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const BentoFeaturesSection: React.FC = () => {
  const [selectedOrderSize, setSelectedOrderSize] = useState<'250k' | '1.5m' | '5m'>('1.5m');
  const [marketScenario, setMarketScenario] = useState<'bull' | 'bear' | 'crab'>('bull');

  const routingAllocations = {
    '250k': [
      { venue: 'Hyperliquid L1', pct: 45, latency: '0.29ms', rebate: '+1.8 bps' },
      { venue: 'dYdX v4 Chain', pct: 35, latency: '0.34ms', rebate: '+1.5 bps' },
      { venue: 'Binance VIP9', pct: 20, latency: '0.41ms', rebate: '+1.2 bps' },
    ],
    '1.5m': [
      { venue: 'Binance VIP9 (ClearLoop)', pct: 38, latency: '0.39ms', rebate: '+2.1 bps' },
      { venue: 'Hyperliquid L1', pct: 32, latency: '0.31ms', rebate: '+2.4 bps' },
      { venue: 'dYdX v4 Chain', pct: 18, latency: '0.35ms', rebate: '+1.7 bps' },
      { venue: 'Deribit Dark Pool', pct: 12, latency: '0.44ms', rebate: '+1.9 bps' },
    ],
    '5m': [
      { venue: 'Wintermute / Prime OTC', pct: 34, latency: '0.36ms', rebate: '+2.8 bps' },
      { venue: 'Binance VIP9 (ClearLoop)', pct: 30, latency: '0.40ms', rebate: '+2.3 bps' },
      { venue: 'Hyperliquid L1', pct: 21, latency: '0.32ms', rebate: '+2.5 bps' },
      { venue: 'Deribit Institutional', pct: 15, latency: '0.43ms', rebate: '+2.0 bps' },
    ],
  };

  const scenarioMetrics = {
    bull: {
      spotLeg: '+14.2% Spot Gain',
      perpLeg: '-14.2% Short Perp Offset',
      fundingCaptured: '+28.4% Annualized Funding',
      netDelta: '0.00% Price Risk',
    },
    crab: {
      spotLeg: '+0.4% Spot Change',
      perpLeg: '-0.4% Short Perp Offset',
      fundingCaptured: '+21.6% Basis + Maker Rebates',
      netDelta: '0.00% Price Risk',
    },
    bear: {
      spotLeg: '-19.5% Spot Decline',
      perpLeg: '+19.5% Short Perp Gain',
      fundingCaptured: '+24.1% Reverse Basis + Vol Arb',
      netDelta: '0.00% Price Risk',
    },
  };

  return (
    <section id="architecture" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#10B981] mb-4">
              <Layers className="w-3.5 h-3.5" />
              QUANTITATIVE EXECUTION ARCHITECTURE
            </div>
            <h2 className="font-display font-bold tracking-[-0.03em] text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-[#F8FAFC] mb-4">
              Institutional Infrastructure Built to{' '}
              <span className="text-emerald-cyan">Eliminate Retail Execution Drag.</span>
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Every basis point of slippage, funding bleed, and MEV extraction compounds against solo traders. Vectis turns the market microstructure in your favor with four proprietary execution layers.
            </p>
          </div>
        </ScrollReveal>

        {/* 12-Column Asymmetric Bento Grid: Top Row (7 / 5), Bottom Row (5 / 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CARD 1 (7 COLUMNS): Sub-Millisecond Smart Order Routing */}
          <ScrollReveal delayMs={40} className="lg:col-span-7 flex">
            <div className="glass-card-interactive rounded-2xl p-6 sm:p-8 w-full flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',
                }}
              />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#10B981] font-semibold">
                    <Cpu className="w-4 h-4" />
                    01 // SUB-MILLISECOND SMART ORDER ROUTING
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[11px] font-mono-tabular text-[#10B981]">
                    0.38ms MEDIAN FILL
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F8FAFC] tracking-[-0.02em] mb-2.5">
                  Co-Located Liquidity Splitting Across 28+ Venues
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6">
                  Our bare-metal execution clusters in Tokyo (TY3) and London (LD4) fragment institutional block orders across CEX order books and DEX app-chains simultaneously—capturing maker rebates instead of paying taker fees.
                </p>
              </div>

              {/* Interactive Order Size Splitter Visualizer */}
              <div className="rounded-xl bg-[#06080D]/85 border border-white/[0.07] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono-tabular text-[#94A3B8]">
                    TEST BLOCK ORDER ROUTING:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {(['250k', '1.5m', '5m'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedOrderSize(size)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono-tabular transition-all cursor-pointer ${
                          selectedOrderSize === size
                            ? 'bg-[#10B981] text-[#04130E] font-bold'
                            : 'bg-white/[0.05] text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        ${size.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {routingAllocations[selectedOrderSize].map((route) => (
                    <div key={route.venue} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono-tabular">
                        <span className="text-[#F8FAFC] font-medium">{route.venue}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#10B981]">{route.rebate} rebate</span>
                          <span className="text-[#38BDF8]">{route.latency}</span>
                          <span className="text-[#F8FAFC] font-bold w-9 text-right">
                            {route.pct}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#38BDF8] transition-all duration-500"
                          style={{ width: `${route.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CARD 2 (5 COLUMNS): Zero-Slippage MEV-Shielded Vaults */}
          <ScrollReveal delayMs={120} className="lg:col-span-5 flex">
            <div className="glass-card-interactive rounded-2xl p-6 sm:p-8 w-full flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#38BDF8] font-semibold">
                    <ShieldAlert className="w-4 h-4" />
                    02 // MEV-SHIELDED DARK RELAYS
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[11px] font-mono-tabular text-[#38BDF8]">
                    ZERO SANDWICHING
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F8FAFC] tracking-[-0.02em] mb-2.5">
                  Cryptographic Mempool Cloaking
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6">
                  On-chain rebalances bypass the public mempool entirely via encrypted Flashbots Protect and Jito validator channels—preventing predatory MEV bots from front-running vault execution.
                </p>
              </div>

              {/* MEV Comparison Telemetry Box */}
              <div className="rounded-xl bg-[#06080D]/85 border border-white/[0.07] p-4 space-y-3 font-mono-tabular text-xs">
                <div className="p-3 rounded-lg bg-[#EF4444]/[0.07] border border-[#EF4444]/25 flex items-center justify-between">
                  <div>
                    <div className="text-[#EF4444] font-semibold">PUBLIC DEX MEMPOOL</div>
                    <div className="text-[11px] text-[#94A3B8] mt-0.5">
                      Exposed to sandwich & front-run bots
                    </div>
                  </div>
                  <span className="text-[#EF4444] font-bold">-42.0 bps loss</span>
                </div>

                <div className="p-3 rounded-lg bg-[#10B981]/[0.1] border border-[#10B981]/35 flex items-center justify-between shadow-[0_0_24px_rgba(16,185,129,0.12)]">
                  <div>
                    <div className="text-[#10B981] font-semibold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      VECTIS PRIVATE BLOCK RELAY
                    </div>
                    <div className="text-[11px] text-[#CBD5E1] mt-0.5">
                      Direct validator inclusion + backrun rebate
                    </div>
                  </div>
                  <span className="text-[#10B981] font-bold">+4.2 bps rebate</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
                  <span>SANDWICH ATTACKS BLOCKED (30D):</span>
                  <span className="text-[#F8FAFC] font-semibold">14,892 / 14,892 (100%)</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CARD 3 (5 COLUMNS): Automated Delta-Neutral Yield Engine */}
          <ScrollReveal delayMs={180} className="lg:col-span-5 flex">
            <div className="glass-card-interactive rounded-2xl p-6 sm:p-8 w-full flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#10B981] font-semibold">
                    <Scale className="w-4 h-4" />
                    03 // DELTA-NEUTRAL ENGINE
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-[11px] font-mono-tabular text-[#CBD5E1]">
                    NET DELTA &lt; 0.02%
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F8FAFC] tracking-[-0.02em] mb-2.5">
                  Pure Alpha in Bull, Bear, or Crab Regimes
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-5">
                  Every long spot or LST collateral position is atomically paired with an equal short perpetual hedge. You earn continuous funding payments without directional drawdown.
                </p>
              </div>

              {/* Interactive Regime Stress-Tester */}
              <div className="rounded-xl bg-[#06080D]/85 border border-white/[0.07] p-4 font-mono-tabular">
                <div className="flex items-center justify-between gap-1 mb-3">
                  <span className="text-[11px] text-[#94A3B8]">MARKET REGIME:</span>
                  <div className="flex items-center gap-1">
                    {(
                      [
                        { id: 'bull', label: 'BULL +40%' },
                        { id: 'crab', label: 'SIDEWAYS' },
                        { id: 'bear', label: 'CRASH -35%' },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setMarketScenario(tab.id)}
                        className={`px-2 py-1 rounded text-[10px] transition-all cursor-pointer ${
                          marketScenario === tab.id
                            ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 font-semibold'
                            : 'bg-white/[0.04] text-[#64748B] hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded bg-white/[0.02]">
                    <span className="text-[#94A3B8]">Spot Collateral Leg:</span>
                    <span className="text-[#F8FAFC]">{scenarioMetrics[marketScenario].spotLeg}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded bg-white/[0.02]">
                    <span className="text-[#94A3B8]">Perpetual Hedge Leg:</span>
                    <span className="text-[#38BDF8]">{scenarioMetrics[marketScenario].perpLeg}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-2.5 rounded bg-[#10B981]/15 border border-[#10B981]/30">
                    <span className="text-[#10B981] font-semibold">Net Harvested Yield:</span>
                    <span className="text-[#10B981] font-bold">
                      {scenarioMetrics[marketScenario].fundingCaptured}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CARD 4 (7 COLUMNS): Multi-Party Computation (MPC) Non-Custodial Security */}
          <ScrollReveal delayMs={240} className="lg:col-span-7 flex">
            <div className="glass-card-interactive rounded-2xl p-6 sm:p-8 w-full flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
                }}
              />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#38BDF8] font-semibold">
                    <KeyRound className="w-4 h-4" />
                    04 // 3-OF-5 MPC NON-CUSTODIAL QUORUM
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[11px] font-mono-tabular text-[#10B981]">
                    ZERO CEX HOT WALLET RISK
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F8FAFC] tracking-[-0.02em] mb-2.5">
                  Bankruptcy-Remote Off-Exchange Settlement
                </h3>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6">
                  Your principal never sits inside centralized exchange wallets. Collateral is locked in multi-institutional MPC vaults where cryptographic trade settlement requires 3-of-5 independent hardware enclave signatures—and withdrawals can only route back to your whitelisted address.
                </p>
              </div>

              {/* 3-of-5 Quorum Architecture Diagram */}
              <div className="rounded-xl bg-[#06080D]/85 border border-white/[0.07] p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                  {[
                    {
                      shard: 'SHARD 01',
                      owner: 'Depositor Wallet',
                      status: 'Sovereign Key',
                      color: 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10',
                    },
                    {
                      shard: 'SHARD 02',
                      owner: 'Fireblocks SGX',
                      status: 'Hardware Enclave',
                      color: 'text-[#38BDF8] border-[#38BDF8]/30 bg-[#38BDF8]/10',
                    },
                    {
                      shard: 'SHARD 03',
                      owner: 'Copper ClearLoop',
                      status: 'Margin Pledge',
                      color: 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10',
                    },
                    {
                      shard: 'SHARD 04-05',
                      owner: 'Chainlink Guardian',
                      status: 'PoR Circuit Breaker',
                      color: 'text-[#CBD5E1] border-white/15 bg-white/[0.04]',
                    },
                  ].map((item) => (
                    <div
                      key={item.shard}
                      className={`p-3 rounded-lg border ${item.color} flex flex-col justify-between`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono-tabular opacity-80">
                        <span>{item.shard}</span>
                        <Lock className="w-3 h-3" />
                      </div>
                      <div className="font-display font-bold text-xs text-[#F8FAFC] mt-2">
                        {item.owner}
                      </div>
                      <div className="text-[10px] font-mono-tabular mt-0.5 opacity-90">
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-white/[0.06] text-[11px] font-mono-tabular text-[#94A3B8]">
                  <span className="inline-flex items-center gap-1.5 text-[#10B981]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Smart Contract Whitelist Enforcement Active
                  </span>
                  <span>SOC2 TYPE II • ISO 27001 CERTIFIED</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
