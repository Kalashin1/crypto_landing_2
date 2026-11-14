import React, { useEffect, useState } from 'react';
import { ShieldCheck, ArrowUpRight, Menu, X, Activity, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenAllocationModal: (presetAmount?: number, presetStrategy?: string) => void;
  onOpenPorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAllocationModal,
  onOpenPorModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveTick, setLiveTick] = useState({
    btcFunding: 18.4,
    ethFunding: 23.6,
    solFunding: 34.2,
    latency: 0.38,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle kinetic telemetry micro-updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTick((prev) => ({
        btcFunding: +(prev.btcFunding + (Math.random() - 0.49) * 0.18).toFixed(1),
        ethFunding: +(prev.ethFunding + (Math.random() - 0.49) * 0.22).toFixed(1),
        solFunding: +(prev.solFunding + (Math.random() - 0.49) * 0.31).toFixed(1),
        latency: +Math.max(0.31, Math.min(0.45, prev.latency + (Math.random() - 0.5) * 0.02)).toFixed(2),
      }));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Performance', href: '#performance' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Simulator', href: '#simulator' },
    { label: 'Tiers', href: '#tiers' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Institutional Telemetry Ribbon */}
      <div className="bg-[#04060A]/95 border-b border-white/[0.06] backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-9 flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8]">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 text-[#10B981] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              ENGINE v4.8 ONLINE
            </span>
            <span className="text-white/15">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <span className="text-[#64748B]">EXEC LATENCY:</span>
              <span className="text-[#F8FAFC]">{liveTick.latency.toFixed(2)}ms</span>
            </span>
            <span className="hidden md:inline text-white/15">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <span className="text-[#64748B]">BTC-PERP BASIS:</span>
              <span className="text-[#10B981]">+{liveTick.btcFunding.toFixed(1)} bps</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 ml-2">
              <span className="text-[#64748B]">ETH-PERP DELTA-0:</span>
              <span className="text-[#10B981]">+{liveTick.ethFunding.toFixed(1)} bps</span>
            </span>
            <span className="hidden xl:inline-flex items-center gap-1.5 ml-2">
              <span className="text-[#64748B]">SOL-PERP MM:</span>
              <span className="text-[#38BDF8]">+{liveTick.solFunding.toFixed(1)} bps</span>
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPorModal}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#CBD5E1] hover:text-[#10B981] transition-colors cursor-pointer"
              title="Inspect Live Merkle Proof-of-Reserves"
            >
              <Lock className="w-3 h-3 text-[#10B981]" />
              <span>MPC CUSTODY:</span>
              <span className="text-[#10B981] font-semibold">104.2% VERIFIED</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Floating Glassmorphic Bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'py-2.5 px-3 sm:px-6' : 'py-3.5 px-3 sm:px-6'
        }`}
      >
        <nav
          aria-label="Primary Navigation"
          className={`max-w-[1280px] mx-auto rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
            scrolled
              ? 'bg-[#06080D]/85 backdrop-blur-xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.75)] py-3'
              : 'bg-[#0D111A]/65 backdrop-blur-lg border border-white/[0.07] py-3.5'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981]/20 via-[#0D111A] to-[#38BDF8]/20 border border-[#10B981]/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:border-[#10B981] transition-colors">
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6L14 23L24 6H19.2L14 15.2L8.8 6H4Z"
                    fill="url(#vectisGrad)"
                  />
                  <path
                    d="M11.5 6L14 10.5L16.5 6H11.5Z"
                    fill="#38BDF8"
                  />
                  <defs>
                    <linearGradient id="vectisGrad" x1="4" y1="6" x2="24" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#34D399" />
                      <stop offset="1" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold tracking-[-0.04em] text-lg text-[#F8FAFC] leading-none">
                    VECTIS
                  </span>
                  <span className="text-[10px] font-mono-tabular uppercase tracking-[0.14em] px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-semibold">
                    QUANT
                  </span>
                </div>
                <span className="text-[10px] font-mono-tabular text-[#64748B] tracking-[0.06em] mt-0.5 hidden sm:inline">
                  LIQUIDITY INFRASTRUCTURE
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04] transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Actions: Live PoR Pill + Allocate Capital CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onOpenPorModal}
                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono-tabular text-[#CBD5E1] transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>PoR: 104.2%</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </button>

              <button
                onClick={() => onOpenAllocationModal(100000, 'multi-strat')}
                className="btn-emerald-primary inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm tracking-tight cursor-pointer"
              >
                <span>Allocate Capital</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            {/* Mobile Drawer Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => onOpenAllocationModal(50000, 'multi-strat')}
                className="btn-emerald-primary px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Allocate
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[#F8FAFC]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-1.5 pb-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.05]"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPorModal();
                }}
                className="mt-1 flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-mono-tabular text-[#10B981]"
              >
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" />
                  Merkle Proof-of-Reserves Verified
                </span>
                <span className="font-semibold">104.2%</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
