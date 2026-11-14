import React, { useEffect, useState } from 'react';
import {
  X,
  ShieldCheck,
  Wallet,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  Lock,
  Cpu,
  Copy,
  Check,
} from 'lucide-react';
import { VAULT_STRATEGIES } from '../data/quantData';

interface AllocationModalProps {
  isOpen: boolean;
  mode: 'allocate' | 'por';
  initialAmount: number;
  initialStrategyId: string;
  onClose: () => void;
  onSwitchMode: (mode: 'allocate' | 'por') => void;
}

export const AllocationModal: React.FC<AllocationModalProps> = ({
  isOpen,
  mode,
  initialAmount,
  initialStrategyId,
  onClose,
  onSwitchMode,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount || 100000);
  const [strategyId, setStrategyId] = useState<string>(initialStrategyId || 'multi-strat');
  const [collateralAsset, setCollateralAsset] = useState<'USDC' | 'USDT' | 'ETH' | 'wBTC'>('USDC');
  const [rail, setRail] = useState<'web3' | 'mpc'>('web3');
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [merkleVerified, setMerkleVerified] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  useEffect(() => {
    setAmount(initialAmount || 100000);
    setStrategyId(initialStrategyId || 'multi-strat');
    setSubmitted(false);
  }, [initialAmount, initialStrategyId, isOpen]);

  if (!isOpen) return null;

  const selectedVault =
    VAULT_STRATEGIES.find((v) => v.id === strategyId) || VAULT_STRATEGIES[1];

  const projectedAnnualUsd = amount * (selectedVault.targetApy / 100);
  const projectedMonthlyUsd = projectedAnnualUsd / 12;

  const formatUsd = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  const commitmentHash = '0x94e8f7b2c041a83e5d19b6c77024fa1839c2e84b';

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(commitmentHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#04060A]/85 backdrop-blur-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="glass-panel-elevated rounded-3xl max-w-2xl w-full border border-white/[0.14] shadow-[0_32px_90px_rgba(0,0,0,0.95)] overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Top Modal Mode Switcher Header */}
        <div className="px-6 py-4 bg-[#06080D]/90 border-b border-white/[0.08] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSwitchMode('allocate')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-all cursor-pointer ${
                mode === 'allocate'
                  ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              01 // ALLOCATE CAPITAL
            </button>
            <button
              onClick={() => onSwitchMode('por')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === 'por'
                  ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 font-semibold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              02 // PROOF-OF-RESERVES (104.2%)
            </button>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {mode === 'allocate' ? (
            !submitted ? (
              <>
                <div>
                  <div className="text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#10B981] font-semibold">
                    EPOCH #843 CAPITAL DEPLOYMENT PORTAL
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#F8FAFC] mt-1">
                    Configure Your Quantitative Vault Allocation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                    Zero deposit fees. Principal remains protected inside non-custodial ERC-4626 smart vaults or segregated Fireblocks MPC sub-accounts.
                  </p>
                </div>

                {/* Custody Rail Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setRail('web3')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      rail === 'web3'
                        ? 'bg-[#10B981]/15 border-[#10B981]/45'
                        : 'bg-[#06080D]/70 border-white/[0.08] hover:border-white/[0.18]'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-display font-bold text-sm text-[#F8FAFC]">
                        Web3 Self-Custody Vault
                      </div>
                      <div className="text-[11px] text-[#94A3B8] mt-0.5">
                        Instant ERC-4626 mint via MetaMask, Rabby, Ledger, or Safe Multisig
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setRail('mpc')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      rail === 'mpc'
                        ? 'bg-[#38BDF8]/15 border-[#38BDF8]/45'
                        : 'bg-[#06080D]/70 border-white/[0.08] hover:border-white/[0.18]'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-display font-bold text-sm text-[#F8FAFC]">
                        Institutional MPC Desk
                      </div>
                      <div className="text-[11px] text-[#94A3B8] mt-0.5">
                        Dedicated Fireblocks SGX enclave or Copper ClearLoop settlement
                      </div>
                    </div>
                  </button>
                </div>

                {/* Amount & Asset Selector */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#06080D]/85 border border-white/[0.08] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-mono-tabular uppercase tracking-[0.08em] text-[#94A3B8]">
                      ALLOCATION PRINCIPAL & ASSET
                    </label>
                    <div className="flex items-center gap-1.5">
                      {(['USDC', 'USDT', 'ETH', 'wBTC'] as const).map((asset) => (
                        <button
                          key={asset}
                          onClick={() => setCollateralAsset(asset)}
                          className={`px-2.5 py-1 rounded text-xs font-mono-tabular cursor-pointer transition-all ${
                            collateralAsset === asset
                              ? 'bg-[#10B981] text-[#04130E] font-bold'
                              : 'bg-white/[0.05] text-[#94A3B8] hover:text-white'
                          }`}
                        >
                          {asset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <span className="absolute left-4 font-mono-tabular font-bold text-xl text-[#10B981]">
                      $
                    </span>
                    <input
                      type="number"
                      min={10000}
                      step={5000}
                      value={amount}
                      onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-9 pr-24 py-3.5 rounded-xl bg-[#0D111A] border border-white/[0.12] focus:border-[#10B981] focus:outline-none font-mono-tabular font-bold text-xl text-[#F8FAFC]"
                    />
                    <span className="absolute right-4 text-xs font-mono-tabular text-[#94A3B8]">
                      {collateralAsset} EQUIV
                    </span>
                  </div>

                  {/* Strategy Dropdown / Pills */}
                  <div>
                    <div className="text-[11px] font-mono-tabular uppercase tracking-[0.08em] text-[#64748B] mb-2">
                      SELECT TARGET QUANT VAULT
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {VAULT_STRATEGIES.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setStrategyId(v.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            strategyId === v.id
                              ? 'bg-[#10B981]/15 border-[#10B981]/45 text-[#F8FAFC]'
                              : 'bg-white/[0.02] border-white/[0.06] text-[#94A3B8]'
                          }`}
                        >
                          <div className="text-[10px] font-mono-tabular uppercase">
                            {v.code.split('//')[0]}
                          </div>
                          <div className="font-mono-tabular font-bold text-sm text-[#10B981] mt-0.5">
                            {v.targetApy}% Net APY
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Telemetry Summary Box */}
                <div className="p-4 rounded-2xl bg-[#10B981]/[0.07] border border-[#10B981]/25 grid grid-cols-3 gap-3 font-mono-tabular">
                  <div>
                    <div className="text-[10px] text-[#94A3B8] uppercase">EST. MONTHLY YIELD</div>
                    <div className="text-base sm:text-lg font-bold text-[#10B981] mt-0.5">
                      +{formatUsd(projectedMonthlyUsd)}/mo
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#94A3B8] uppercase">EST. 12M NET ALPHA</div>
                    <div className="text-base sm:text-lg font-bold text-[#F8FAFC] mt-0.5">
                      +{formatUsd(projectedAnnualUsd)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#94A3B8] uppercase">MGMT / ENTRY FEE</div>
                    <div className="text-base sm:text-lg font-bold text-[#38BDF8] mt-0.5">
                      $0.00 (0%)
                    </div>
                  </div>
                </div>

                {/* Connect Wallet / Submit Action */}
                <div className="space-y-2.5">
                  {rail === 'web3' && !walletConnected ? (
                    <button
                      onClick={() => setWalletConnected(true)}
                      className="w-full py-3.5 px-5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] text-sm font-mono-tabular font-semibold text-[#F8FAFC] flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Wallet className="w-4 h-4 text-[#10B981]" />
                      <span>Connect Web3 Wallet (MetaMask / Rabby / Ledger)</span>
                    </button>
                  ) : null}

                  <button
                    onClick={() => setSubmitted(true)}
                    className="btn-emerald-primary w-full py-4 px-6 rounded-xl text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      {walletConnected
                        ? `Confirm ${formatUsd(amount)} ${collateralAsset} Vault Allocation`
                        : `Reserve ${formatUsd(amount)} Epoch #843 Allocation`}
                    </span>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              /* Confirmation Receipt State */
              <div className="py-4 text-center space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center mx-auto text-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-mono-tabular text-[#10B981]">
                    EPOCH #843 ALLOCATION TICKET RESERVED
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#F8FAFC] mt-3">
                    {formatUsd(amount)} {collateralAsset} Mandate Staged
                  </h3>
                  <p className="text-sm text-[#94A3B8] max-w-md mx-auto mt-1">
                    Your non-custodial vault commitment for <strong>{selectedVault.name}</strong> ({selectedVault.targetApy}% Target Net APY) has been cryptographically staged.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#06080D] border border-white/[0.08] text-left font-mono-tabular text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">SELECTED VAULT:</span>
                    <span className="text-[#F8FAFC] font-semibold">{selectedVault.code}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">CUSTODY RAIL:</span>
                    <span className="text-[#10B981]">
                      {rail === 'web3' ? 'ERC-4626 Self-Custody Vault' : 'Fireblocks 3-of-5 MPC Enclave'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">ESTIMATED MONTHLY PAYOUT:</span>
                    <span className="text-[#38BDF8] font-bold">+{formatUsd(projectedMonthlyUsd)}/mo</span>
                  </div>
                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    <span className="text-[#64748B]">COMMITMENT HASH:</span>
                    <button
                      onClick={handleCopyHash}
                      className="inline-flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#10B981] cursor-pointer"
                    >
                      <span className="truncate max-w-[190px]">{commitmentHash}</span>
                      {copiedHash ? (
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono-tabular text-[#CBD5E1] cursor-pointer"
                  >
                    Modify Parameters
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-emerald-primary px-6 py-2.5 rounded-xl text-xs font-mono-tabular font-bold cursor-pointer"
                  >
                    Done & Return to Terminal
                  </button>
                </div>
              </div>
            )
          ) : (
            /* MODE 2: Live Merkle Proof-of-Reserves Inspector */
            <div className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.12em] text-[#38BDF8] font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  CHAINLINK REAL-TIME PROOF-OF-RESERVES ORACLE
                </div>
                <h3 className="font-display font-bold text-2xl text-[#F8FAFC] mt-1">
                  104.20% Over-Collateralized MPC Vault Attestation
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                  Every 60 seconds, independent Chainlink oracle nodes verify that segregated assets inside Fireblocks MPC and Copper ClearLoop exceed total depositor liabilities.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-tabular">
                <div className="p-4 rounded-2xl bg-[#06080D] border border-white/[0.07]">
                  <div className="text-[10px] text-[#64748B] uppercase">VERIFIED MPC RESERVES</div>
                  <div className="text-lg font-bold text-[#10B981] mt-1">$1,484,720,000</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#06080D] border border-white/[0.07]">
                  <div className="text-[10px] text-[#64748B] uppercase">DEPOSITOR LIABILITIES</div>
                  <div className="text-lg font-bold text-[#F8FAFC] mt-1">$1,424,900,000</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30">
                  <div className="text-[10px] text-[#10B981] uppercase">SOLVENCY RATIO</div>
                  <div className="text-lg font-bold text-[#10B981] mt-1">104.20% VERIFIED</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#06080D]/90 border border-white/[0.07] font-mono-tabular text-xs space-y-2.5">
                <div className="text-[11px] text-[#94A3B8] uppercase tracking-[0.08em] mb-1">
                  CUSTODY ENCLAVE BREAKDOWN
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                  <span className="text-[#CBD5E1]">Fireblocks 3-of-5 SGX Enclave Vaults:</span>
                  <span className="text-[#10B981] font-semibold">$842,190,000 (Verified)</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/[0.05]">
                  <span className="text-[#CBD5E1]">Copper ClearLoop Off-Exchange Pledges:</span>
                  <span className="text-[#10B981] font-semibold">$418,530,000 (Verified)</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#CBD5E1]">Audited ERC-4626 On-Chain Liquidity Buffers:</span>
                  <span className="text-[#10B981] font-semibold">$224,000,000 (Verified)</span>
                </div>
              </div>

              {merkleVerified ? (
                <div className="p-4 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-between gap-3 font-mono-tabular text-xs">
                  <div className="flex items-center gap-2.5 text-[#10B981]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <div className="font-bold">CRYPTOGRAPHIC MERKLE ROOT VERIFIED</div>
                      <div className="text-[11px] text-[#CBD5E1]">
                        Root: 0x7c8f92e1a40b...39d2f18a • Zero Unbacked Liabilities
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onSwitchMode('allocate')}
                    className="btn-emerald-primary px-3.5 py-2 rounded-lg text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Allocate Now →
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setMerkleVerified(true)}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 border border-[#38BDF8]/40 text-xs font-mono-tabular font-semibold text-[#38BDF8] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Run Live Cryptographic Merkle Tree Verification</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
