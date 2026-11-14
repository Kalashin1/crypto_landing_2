import React, { useEffect, useState } from 'react';
import { TECHNICAL_FAQS } from '../data/quantData';
import {
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Lock,
  HelpCircle,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FaqAndCtaSectionProps {
  onOpenAllocationModal: (presetAmount?: number, presetStrategy?: string) => void;
  onOpenPorModal: () => void;
}

export const FaqAndCtaSection: React.FC<FaqAndCtaSectionProps> = ({
  onOpenAllocationModal,
  onOpenPorModal,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string>(TECHNICAL_FAQS[0].id);
  const [quickAmount, setQuickAmount] = useState<string>('100,000');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(4 * 3600 + 38 * 60 + 19);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 60 ? prev - 1 : 4 * 3600 + 38 * 60 + 19));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = String(Math.floor(secondsRemaining / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsRemaining % 60).padStart(2, '0');

  const handleQuickDeploy = () => {
    const numeric = Number(quickAmount.replace(/[^0-9]/g, '')) || 100000;
    onOpenAllocationModal(Math.max(10000, numeric), 'multi-strat');
  };

  return (
    <>
      {/* SECTION 1: Technical & Risk FAQ Accordion */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#070A10]">
        <div className="max-w-[820px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/25 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#38BDF8] mb-4">
                <HelpCircle className="w-3.5 h-3.5" />
                DUE DILIGENCE & RISK ARCHITECTURE FAQ
              </div>
              <h2 className="font-display font-bold tracking-[-0.03em] text-3xl sm:text-4xl text-[#F8FAFC] mb-3">
                Engineered for Scrutiny
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                Direct answers on off-exchange MPC custody, delta-neutral mechanics, black-swan stress protection, and epoch redemptions.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-3.5">
            {TECHNICAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              return (
                <ScrollReveal key={faq.id} delayMs={idx * 60}>
                  <div
                    className={`rounded-2xl transition-all duration-300 border ${
                      isOpen
                        ? 'glass-panel-elevated border-[#10B981]/40 shadow-[0_16px_40px_rgba(0,0,0,0.7)]'
                        : 'bg-[#0D111A]/65 border-white/[0.07] hover:border-white/[0.15]'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono-tabular uppercase tracking-[0.12em] text-[#10B981] font-semibold block">
                          {faq.category}
                        </span>
                        <h3 className="font-display font-bold text-base sm:text-lg text-[#F8FAFC] leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 mt-1 ${
                          isOpen
                            ? 'bg-[#10B981]/20 text-[#10B981] rotate-180'
                            : 'bg-white/[0.05] text-[#94A3B8]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/[0.06] space-y-4">
                        <p className="text-sm sm:text-base text-[#94A3B8] leading-[1.7]">
                          {faq.answer}
                        </p>
                        {faq.metricHighlight && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-mono-tabular text-[#10B981]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{faq.metricHighlight}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: High-Impact Conversion CTA Banner */}
      <section className="relative py-20 sm:py-28 border-t border-white/[0.06] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="glass-panel-elevated rounded-3xl p-7 sm:p-12 lg:p-14 border border-[#10B981]/35 relative overflow-hidden">
              {/* Ambient Radial Backlights */}
              <div
                className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%)',
                  filter: 'blur(35px)',
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left 7 Cols */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#06080D]/85 border border-[#10B981]/35 text-xs font-mono-tabular">
                    <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="text-[#CBD5E1]">EPOCH #843 ALLOCATION WINDOW CLOSES IN:</span>
                    <span className="text-[#10B981] font-bold">
                      {hrs}h : {mins}m : {secs}s
                    </span>
                  </div>

                  <h2 className="font-display font-bold tracking-[-0.035em] text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.08] text-[#F8FAFC]">
                    Deploy Idle Crypto into{' '}
                    <span className="text-emerald-cyan">Audited Institutional Liquidity.</span>
                  </h2>

                  <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-2xl">
                    Join 1,840+ quantitative traders, prop desks, and crypto treasuries earning delta-neutral yield with 0.00% management fees and full off-exchange MPC custody.
                  </p>

                  {/* Remaining Epoch Capacity Progress Bar */}
                  <div className="max-w-lg pt-1">
                    <div className="flex items-center justify-between text-xs font-mono-tabular mb-2">
                      <span className="text-[#94A3B8]">EPOCH #843 VAULT CAPACITY FILLED:</span>
                      <span className="text-[#10B981] font-semibold">
                        $21.2M / $25.0M ($3.8M Remaining)
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#06080D] border border-white/[0.08] overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#38BDF8]"
                        style={{ width: '84.8%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right 5 Cols: Quick Capital Deployment Card */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#06080D]/90 border border-white/[0.1] space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
                    <span>INSTANT VAULT COMMITMENT</span>
                    <span className="text-[#10B981] flex items-center gap-1">
                      <Lock className="w-3 h-3" /> ERC-4626 / MPC
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="quick-capital-input"
                      className="block text-[11px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B] mb-1.5"
                    >
                      ENTER ALLOCATION AMOUNT (USDC / USDT / ETH EQUIV.)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 font-mono-tabular font-bold text-lg text-[#10B981]">
                        $
                      </span>
                      <input
                        id="quick-capital-input"
                        type="text"
                        value={quickAmount}
                        onChange={(e) => setQuickAmount(e.target.value)}
                        className="w-full pl-9 pr-20 py-3.5 rounded-xl bg-[#0D111A] border border-white/[0.12] focus:border-[#10B981] focus:outline-none font-mono-tabular font-bold text-lg text-[#F8FAFC]"
                      />
                      <span className="absolute right-3.5 px-2 py-1 rounded bg-white/[0.06] text-[11px] font-mono-tabular text-[#CBD5E1]">
                        USDC
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleQuickDeploy}
                    className="btn-emerald-primary w-full py-4 px-6 rounded-xl text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Allocate into Epoch #843</span>
                    <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
                  </button>

                  <button
                    onClick={onOpenPorModal}
                    className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono-tabular text-[#CBD5E1] flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                    <span>Verify Live 104.2% Proof-of-Reserves Hash</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: Institutional Footer */}
      <footer className="border-t border-white/[0.08] bg-[#04060A] pt-16 pb-12 text-xs text-[#64748B]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
            {/* Brand & Live Status (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[#10B981]" />
                </div>
                <span className="font-display font-bold text-lg text-[#F8FAFC] tracking-tight">
                  VECTIS <span className="text-[#10B981] font-mono-tabular text-xs">QUANT</span>
                </span>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
                Institutional delta-neutral liquidity vaults, sub-millisecond cross-exchange arbitrage, and bankruptcy-remote MPC custody for sovereign crypto traders.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D111A] border border-white/[0.07] font-mono-tabular text-[11px] text-[#CBD5E1]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>ALL 28 EXECUTION VENUES OPERATIONAL (0.38ms)</span>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-2 space-y-2.5">
              <div className="font-mono-tabular uppercase tracking-[0.1em] text-[#F8FAFC] font-semibold mb-3">
                STRATEGY VAULTS
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#architecture" className="hover:text-[#10B981] transition-colors">
                    Vault-01: Perp Basis Arb
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-[#10B981] transition-colors">
                    Vault-02: Core Multi-Strat
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-[#10B981] transition-colors">
                    Vault-03: HFT Microstructure
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="hover:text-[#10B981] transition-colors">
                    Yield & Alpha Simulator
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-2.5">
              <div className="font-mono-tabular uppercase tracking-[0.1em] text-[#F8FAFC] font-semibold mb-3">
                SECURITY & VERIFICATION
              </div>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={onOpenPorModal}
                    className="hover:text-[#10B981] transition-colors cursor-pointer text-left"
                  >
                    Live Chainlink Proof-of-Reserves
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenPorModal}
                    className="hover:text-[#10B981] transition-colors cursor-pointer text-left"
                  >
                    Trail of Bits & OpenZeppelin Audits
                  </button>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-[#10B981] transition-colors">
                    Fireblocks 3-of-5 MPC Enclave Spec
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-[#10B981] transition-colors">
                    Copper ClearLoop Off-Exchange Docs
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-2.5">
              <div className="font-mono-tabular uppercase tracking-[0.1em] text-[#F8FAFC] font-semibold mb-3">
                INSTITUTIONAL DESK
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Co-located Execution Clusters: Tokyo (Equinix TY3) • London (LD4) • Zürich (ZH4)
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenAllocationModal(250000, 'multi-strat')}
                  className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-[#10B981]/20 border border-white/[0.1] hover:border-[#10B981]/40 text-[#F8FAFC] font-mono-tabular text-xs transition-all cursor-pointer"
                >
                  Open Allocation Portal →
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#64748B]">
            <div>
              © {new Date().getFullYear()} Vectis Quantitative Liquidity Ltd. All rights reserved.
            </div>
            <div className="max-w-2xl text-left sm:text-right leading-relaxed">
              Quantitative performance telemetry reflects audited historical net vault returns after execution costs. Past Sharpe ratios and funding rate spreads do not guarantee future epoch performance.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
