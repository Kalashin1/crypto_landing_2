import React, { useState } from 'react';
import {
  TRADER_TESTIMONIALS,
  ALLOCATION_TIERS,
} from '../data/quantData';
import {
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Quote,
  Award,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface TestimonialsAndPricingSectionProps {
  onOpenAllocationModal: (presetAmount: number, presetStrategy?: string) => void;
}

export const TestimonialsAndPricingSection: React.FC<TestimonialsAndPricingSectionProps> = ({
  onOpenAllocationModal,
}) => {
  const [annualCommitment, setAnnualCommitment] = useState<boolean>(true);

  return (
    <>
      {/* SECTION 1: Verified Trader & Capital Allocator Testimonials */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.06] bg-[#070A11]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#10B981] mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ON-CHAIN VERIFIED ALLOCATOR TESTIMONIALS
                </div>
                <h2 className="font-display font-bold tracking-[-0.03em] text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-[#F8FAFC]">
                  Trusted by Derivatives Desks,{' '}
                  <span className="text-emerald-cyan">Perp Whales & Quant Funds.</span>
                </h2>
              </div>
              <div className="text-xs font-mono-tabular text-[#94A3B8] px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                INSTITUTIONAL RETENTION RATE:{' '}
                <strong className="text-[#10B981]">98.4% ACROSS 38 EPOCHS</strong>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TRADER_TESTIMONIALS.map((item, idx) => (
              <ScrollReveal key={item.id} delayMs={idx * 90} className="flex">
                <div className="glass-card-interactive rounded-2xl p-6 sm:p-8 flex flex-col justify-between w-full relative">
                  <div>
                    {/* Top Realized Alpha & On-chain Attestation Strip */}
                    <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-white/[0.07] font-mono-tabular text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] font-semibold">
                        {item.realizedApy}
                      </span>
                      <span className="text-[#64748B] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        VAULT TX: {item.verificationHash}
                      </span>
                    </div>

                    <Quote className="w-7 h-7 text-[#10B981]/30 mb-3" />

                    <p className="text-[#CBD5E1] text-sm sm:text-base leading-[1.7] mb-6">
                      “{item.quote}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <div>
                      <div className="font-display font-bold text-base text-[#F8FAFC]">
                        {item.author}
                      </div>
                      <div className="text-xs text-[#94A3B8] mt-0.5">
                        {item.role} • <span className="text-[#F8FAFC]">{item.firm}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono-tabular">
                      <div className="text-xs font-bold text-[#38BDF8]">{item.allocatedAmount}</div>
                      <div className="text-[10px] text-[#64748B] mt-0.5">{item.tenure}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Capital Allocation Tiers (Pricing & Fee Schedule) */}
      <section
        id="tiers"
        className="relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden"
      >
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.05) 55%, transparent 75%)',
            filter: 'blur(45px)',
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#10B981] mb-4">
                <Award className="w-3.5 h-3.5" />
                ZERO MANAGEMENT FEE • PURE PERFORMANCE ALIGNMENT
              </div>
              <h2 className="font-display font-bold tracking-[-0.03em] text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-[#F8FAFC] mb-4">
                Capital Allocation Tiers
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed mb-8">
                We charge <strong className="text-[#F8FAFC]">0.00% management, deposit, or withdrawal fees</strong> across all tiers. Vectis only earns a performance share on net new high-water-mark alpha generated for your account.
              </p>

              {/* Commitment Fee Rebate Toggle */}
              <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-[#0D111A] border border-white/[0.08]">
                <button
                  onClick={() => setAnnualCommitment(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-tabular transition-all cursor-pointer ${
                    !annualCommitment
                      ? 'bg-white/[0.1] text-[#F8FAFC] font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Flexible Rolling Epoch
                </button>
                <button
                  onClick={() => setAnnualCommitment(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-tabular transition-all cursor-pointer flex items-center gap-2 ${
                    annualCommitment
                      ? 'bg-[#10B981] text-[#04130E] font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <span>Annual Mandate Lock</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      annualCommitment
                        ? 'bg-[#04130E]/20 text-[#04130E]'
                        : 'bg-[#10B981]/15 text-[#10B981]'
                    }`}
                  >
                    25% FEE REBATE
                  </span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* 3-Column Glassmorphic Allocation Tiers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {ALLOCATION_TIERS.map((tier, idx) => {
              const isHighlighted = Boolean(tier.highlighted);
              const displayedPerfFee = annualCommitment
                ? tier.performanceFeeAnnual
                : tier.performanceFeeStandard;

              return (
                <ScrollReveal key={tier.id} delayMs={idx * 100} className="flex">
                  <div
                    className={`rounded-3xl p-6 sm:p-8 w-full flex flex-col justify-between relative transition-all duration-300 ${
                      isHighlighted
                        ? 'glass-panel-elevated border-2 border-[#10B981]/60 shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_45px_rgba(16,185,129,0.18)] lg:-translate-y-2'
                        : 'glass-card-interactive border border-white/[0.08]'
                    }`}
                  >
                    {isHighlighted && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#10B981] to-[#38BDF8] text-[#04130E] text-[11px] font-mono-tabular font-bold uppercase tracking-[0.12em] flex items-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.5)] whitespace-nowrap">
                        <Sparkles className="w-3 h-3" />
                        {tier.badge}
                      </div>
                    )}

                    <div>
                      {/* Tier Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono-tabular uppercase tracking-[0.14em] text-[#10B981] font-semibold">
                          TIER {tier.tierNumber} // {tier.name.toUpperCase()}
                        </span>
                        <span className="text-[11px] font-mono-tabular px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[#CBD5E1]">
                          {tier.redemptionWindow}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC] mb-2">
                        {tier.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                        {tier.subtitle}
                      </p>

                      {/* Minimum Allocation & Target Net APY Box */}
                      <div className="p-4 rounded-2xl bg-[#06080D]/85 border border-white/[0.07] mb-6">
                        <div className="grid grid-cols-2 gap-4 pb-3.5 mb-3.5 border-b border-white/[0.06]">
                          <div>
                            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                              MINIMUM CAPITAL
                            </div>
                            <div className="font-mono-tabular font-bold text-xl sm:text-2xl text-[#F8FAFC] mt-0.5">
                              {tier.minAllocation}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B]">
                              TARGET NET APY
                            </div>
                            <div className="font-mono-tabular font-bold text-xl sm:text-2xl text-[#10B981] mt-0.5">
                              {tier.targetNetApy}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono-tabular">
                          <span className="text-[#94A3B8]">
                            Mgmt Fee: <strong className="text-[#F8FAFC]">{tier.managementFee}</strong>
                          </span>
                          <span className="text-[#94A3B8]">
                            Perf Share:{' '}
                            <strong className="text-[#38BDF8]">{displayedPerfFee}</strong>
                            {annualCommitment && (
                              <span className="line-through text-[#64748B] ml-1.5 text-[11px]">
                                {tier.performanceFeeStandard}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Features Checklist */}
                      <div className="space-y-3 mb-8">
                        <div className="text-[11px] font-mono-tabular uppercase tracking-[0.1em] text-[#64748B]">
                          INCLUDED INFRASTRUCTURE & ACCESS
                        </div>
                        {tier.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tier Action Button */}
                    <button
                      onClick={() =>
                        onOpenAllocationModal(
                          tier.minAmountNum,
                          tier.id === 'pro-trader'
                            ? 'basis-arb'
                            : tier.id === 'quant-syndicate'
                            ? 'multi-strat'
                            : 'hft-alpha'
                        )
                      }
                      className={`w-full py-3.5 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isHighlighted
                          ? 'btn-emerald-primary'
                          : 'bg-white/[0.06] hover:bg-[#10B981] text-[#F8FAFC] hover:text-[#04130E] border border-white/[0.12] hover:border-[#10B981]'
                      }`}
                    >
                      <span>{tier.ctaLabel}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
