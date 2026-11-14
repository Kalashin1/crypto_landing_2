import React from 'react';
import { ShieldCheck, Lock, Activity, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SocialProofSectionProps {
  onOpenPorModal: () => void;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ onOpenPorModal }) => {
  const partners = [
    {
      name: 'FIREBLOCKS MPC',
      role: 'CUSTODY INFRASTRUCTURE',
      svg: (
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
          <path d="M14 3L25 22H3L14 3Z" stroke="currentColor" strokeWidth="2.2" />
          <path d="M14 10L19.5 19.5H8.5L14 10Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'CHAINLINK PoR',
      role: 'RESERVE ORACLE',
      svg: (
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
          <polygon
            points="14,2 24,8 24,20 14,26 4,20 4,8"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <circle cx="14" cy="14" r="3.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'dYdX v4 CHAIN',
      role: 'PERP LIQUIDITY',
      svg: (
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
          <path d="M5 22L23 6M5 6L12 12.5M16 15.5L23 22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'HYPERLIQUID L1',
      role: 'CO-LOCATED NODE',
      svg: (
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
          <path
            d="M8 6C4.5 9.5 4.5 18.5 8 22C11.5 18.5 16.5 9.5 20 6C23.5 9.5 23.5 18.5 20 22"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: 'DERIBIT PRIME',
      role: 'VOLATILITY & BASIS',
      svg: (
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
          <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2.2" />
          <path d="M9 14H19M14 9V19" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      ),
    },
    {
      name: 'COPPER CLEARLOOP',
      role: 'OFF-EXCHANGE SETTLEMENT',
      svg: (
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
          <circle cx="11" cy="14" r="6" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="17" cy="14" r="6" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      ),
    },
    {
      name: 'WINTERMUTE OTC',
      role: 'DEEP BLOCK LIQUIDITY',
      svg: (
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
          <path d="M3 8L9 20L14 11L19 20L25 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'TRAIL OF BITS',
      role: 'SMART CONTRACT AUDIT',
      svg: (
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
          <path d="M14 3L23 7V14C23 19.5 19.2 23.8 14 25C8.8 23.8 5 19.5 5 14V7L14 3Z" stroke="currentColor" strokeWidth="2.2" />
          <path d="M10 14L13 17L18 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 border-y border-white/[0.06] bg-[#080B12]/80">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono-tabular uppercase tracking-[0.14em] text-[#10B981] font-semibold">
                INSTITUTIONAL SETTLEMENT & CUSTODY TOPOLOGY
              </span>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                Direct co-located execution pipes, off-exchange MPC settlement, and real-time cryptographic reserve verification.
              </p>
            </div>
            <button
              onClick={onOpenPorModal}
              className="self-start md:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono-tabular text-[#CBD5E1] hover:text-[#10B981] transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Inspect Live Merkle Attestation</span>
              <span className="text-[#10B981]">→</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Monochrome Vector Partner Grid (opacity 0.45 -> 1.0 on hover) */}
        <ScrollReveal delayMs={80}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group px-3.5 py-3.5 rounded-xl bg-[#0D111A]/60 border border-white/[0.05] hover:border-white/[0.15] flex flex-col items-start justify-between gap-2.5 opacity-50 hover:opacity-100 transition-all duration-300 cursor-default"
              >
                <div className="text-[#F8FAFC] group-hover:text-[#10B981] transition-colors">
                  {partner.svg}
                </div>
                <div>
                  <div className="font-display font-bold text-xs tracking-tight text-[#F8FAFC]">
                    {partner.name}
                  </div>
                  <div className="text-[9px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B] mt-0.5">
                    {partner.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* 4 Institutional Trust Pillars */}
        <ScrollReveal delayMs={160}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/[0.06]">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.05]">
              <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 border border-[#10B981]/25 flex items-center justify-center text-[#10B981] shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono-tabular font-bold text-base text-[#F8FAFC]">
                  100% Off-Exchange Principal
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
                  Zero idle assets on CEX hot wallets. Segregated inside bankruptcy-remote MPC vaults.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.05]">
              <div className="w-9 h-9 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/25 flex items-center justify-center text-[#38BDF8] shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono-tabular font-bold text-base text-[#F8FAFC]">
                  $48.6B+ Routed Volume
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
                  Executed across 28 spot, perpetual, and options venues with 99.998% engine uptime.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.05]">
              <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 border border-[#10B981]/25 flex items-center justify-center text-[#10B981] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono-tabular font-bold text-base text-[#F8FAFC]">
                  38 Consecutive Green Months
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
                  Market-neutral execution engineered to harvest volatility in bull, bear, and crab cycles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.05]">
              <div className="w-9 h-9 rounded-lg bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-center text-[#818CF8] shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono-tabular font-bold text-base text-[#F8FAFC]">
                  Triple-Audited Smart Vaults
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
                  ERC-4626 vault architecture verified by Trail of Bits, OpenZeppelin, and Zellic.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
