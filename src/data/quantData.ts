export interface StrategyPairFeed {
  id: string;
  pair: string;
  strategyName: string;
  netApy: number;
  sharpe30d: number;
  latencyMs: number;
  maxDrawdown: string;
  fundingSpreadBps: number;
  dailyVolume: string;
  activeVenues: string[];
  chartPoints: {
    label: string;
    vectisReturn: number;
    benchmarkReturn: number;
    basisSpreadBps: number;
  }[];
  liveExecutions: {
    id: string;
    timestamp: string;
    legLong: string;
    legShort: string;
    sizeUsd: string;
    capturedBps: string;
    latency: string;
  }[];
}

export const STRATEGY_PAIR_FEEDS: StrategyPairFeed[] = [
  {
    id: 'btc-basis',
    pair: 'BTC-PERP // BASIS',
    strategyName: 'Cross-Venue Delta-Neutral Basis & Funding Harvester',
    netApy: 24.8,
    sharpe30d: 3.42,
    latencyMs: 0.38,
    maxDrawdown: '-0.84%',
    fundingSpreadBps: 18.4,
    dailyVolume: '$142.8M',
    activeVenues: ['Binance Institutional', 'dYdX v4', 'Deribit', 'Hyperliquid'],
    chartPoints: [
      { label: 'Jan', vectisReturn: 100.0, benchmarkReturn: 100.0, basisSpreadBps: 14.2 },
      { label: 'Feb', vectisReturn: 102.1, benchmarkReturn: 100.3, basisSpreadBps: 16.8 },
      { label: 'Mar', vectisReturn: 104.6, benchmarkReturn: 100.7, basisSpreadBps: 19.5 },
      { label: 'Apr', vectisReturn: 106.8, benchmarkReturn: 101.0, basisSpreadBps: 15.1 },
      { label: 'May', vectisReturn: 109.2, benchmarkReturn: 101.4, basisSpreadBps: 17.9 },
      { label: 'Jun', vectisReturn: 111.7, benchmarkReturn: 101.7, basisSpreadBps: 20.4 },
      { label: 'Jul', vectisReturn: 114.1, benchmarkReturn: 102.1, basisSpreadBps: 18.2 },
      { label: 'Aug', vectisReturn: 116.8, benchmarkReturn: 102.4, basisSpreadBps: 21.0 },
      { label: 'Sep', vectisReturn: 119.3, benchmarkReturn: 102.8, basisSpreadBps: 17.6 },
      { label: 'Oct', vectisReturn: 122.0, benchmarkReturn: 103.1, basisSpreadBps: 19.8 },
      { label: 'Nov', vectisReturn: 124.8, benchmarkReturn: 103.5, basisSpreadBps: 22.1 },
    ],
    liveExecutions: [
      {
        id: 'VX-99418',
        timestamp: '14:22:08.412',
        legLong: 'BUY SPOT @ Coinbase Prime',
        legShort: 'SHORT PERP @ dYdX v4',
        sizeUsd: '$480,000',
        capturedBps: '+19.4 bps',
        latency: '0.36ms',
      },
      {
        id: 'VX-99419',
        timestamp: '14:22:09.104',
        legLong: 'BUY SPOT @ Fireblocks Dark',
        legShort: 'SHORT PERP @ Binance VIP9',
        sizeUsd: '$1,250,000',
        capturedBps: '+21.8 bps',
        latency: '0.41ms',
      },
      {
        id: 'VX-99420',
        timestamp: '14:22:10.028',
        legLong: 'LONG DATED @ Deribit',
        legShort: 'SHORT PERP @ Hyperliquid',
        sizeUsd: '$310,000',
        capturedBps: '+17.2 bps',
        latency: '0.34ms',
      },
    ],
  },
  {
    id: 'eth-delta',
    pair: 'ETH-PERP // DELTA-0',
    strategyName: 'Liquid Staking Collateral + Perpetual Funding Arbitrage',
    netApy: 29.4,
    sharpe30d: 3.18,
    latencyMs: 0.42,
    maxDrawdown: '-1.12%',
    fundingSpreadBps: 23.6,
    dailyVolume: '$98.4M',
    activeVenues: ['Hyperliquid', 'Deribit', 'Bybit Institutional', 'dYdX v4'],
    chartPoints: [
      { label: 'Jan', vectisReturn: 100.0, benchmarkReturn: 100.0, basisSpreadBps: 18.1 },
      { label: 'Feb', vectisReturn: 102.5, benchmarkReturn: 100.4, basisSpreadBps: 21.4 },
      { label: 'Mar', vectisReturn: 105.4, benchmarkReturn: 100.8, basisSpreadBps: 24.0 },
      { label: 'Apr', vectisReturn: 108.1, benchmarkReturn: 101.2, basisSpreadBps: 19.8 },
      { label: 'May', vectisReturn: 111.0, benchmarkReturn: 101.6, basisSpreadBps: 22.7 },
      { label: 'Jun', vectisReturn: 113.9, benchmarkReturn: 102.0, basisSpreadBps: 25.2 },
      { label: 'Jul', vectisReturn: 116.8, benchmarkReturn: 102.4, basisSpreadBps: 21.9 },
      { label: 'Aug', vectisReturn: 119.9, benchmarkReturn: 102.8, basisSpreadBps: 24.5 },
      { label: 'Sep', vectisReturn: 122.8, benchmarkReturn: 103.2, basisSpreadBps: 23.1 },
      { label: 'Oct', vectisReturn: 126.1, benchmarkReturn: 103.6, basisSpreadBps: 26.4 },
      { label: 'Nov', vectisReturn: 129.4, benchmarkReturn: 104.0, basisSpreadBps: 27.8 },
    ],
    liveExecutions: [
      {
        id: 'VX-88201',
        timestamp: '14:22:07.882',
        legLong: 'MINT wstETH @ Lido Institutional',
        legShort: 'SHORT ETH-PERP @ Hyperliquid',
        sizeUsd: '$620,000',
        capturedBps: '+24.6 bps',
        latency: '0.43ms',
      },
      {
        id: 'VX-88202',
        timestamp: '14:22:08.991',
        legLong: 'BUY ETH-SPOT @ Kraken Prime',
        legShort: 'SHORT ETH-PERP @ Deribit',
        sizeUsd: '$890,000',
        capturedBps: '+22.1 bps',
        latency: '0.39ms',
      },
      {
        id: 'VX-88203',
        timestamp: '14:22:10.440',
        legLong: 'LONG PERP @ Vertex Edge',
        legShort: 'SHORT PERP @ Binance VIP9',
        sizeUsd: '$410,000',
        capturedBps: '+26.3 bps',
        latency: '0.41ms',
      },
    ],
  },
  {
    id: 'sol-statarb',
    pair: 'SOL-PERP // HFT-MM',
    strategyName: 'Sub-Millisecond Cross-DEX Order Book Market Making',
    netApy: 38.6,
    sharpe30d: 2.94,
    latencyMs: 0.31,
    maxDrawdown: '-1.68%',
    fundingSpreadBps: 34.2,
    dailyVolume: '$76.2M',
    activeVenues: ['Hyperliquid L1', 'dYdX v4 Chain', 'Drift Institutional', 'Binance'],
    chartPoints: [
      { label: 'Jan', vectisReturn: 100.0, benchmarkReturn: 100.0, basisSpreadBps: 26.0 },
      { label: 'Feb', vectisReturn: 103.4, benchmarkReturn: 100.4, basisSpreadBps: 29.5 },
      { label: 'Mar', vectisReturn: 107.1, benchmarkReturn: 100.9, basisSpreadBps: 33.1 },
      { label: 'Apr', vectisReturn: 110.6, benchmarkReturn: 101.3, basisSpreadBps: 30.8 },
      { label: 'May', vectisReturn: 114.5, benchmarkReturn: 101.8, basisSpreadBps: 35.4 },
      { label: 'Jun', vectisReturn: 118.2, benchmarkReturn: 102.2, basisSpreadBps: 32.9 },
      { label: 'Jul', vectisReturn: 122.1, benchmarkReturn: 102.7, basisSpreadBps: 36.7 },
      { label: 'Aug', vectisReturn: 126.3, benchmarkReturn: 103.1, basisSpreadBps: 34.0 },
      { label: 'Sep', vectisReturn: 130.2, benchmarkReturn: 103.6, basisSpreadBps: 38.2 },
      { label: 'Oct', vectisReturn: 134.4, benchmarkReturn: 104.0, basisSpreadBps: 35.9 },
      { label: 'Nov', vectisReturn: 138.6, benchmarkReturn: 104.5, basisSpreadBps: 39.4 },
    ],
    liveExecutions: [
      {
        id: 'VX-77109',
        timestamp: '14:22:08.110',
        legLong: 'BID FILL @ Hyperliquid L1',
        legShort: 'ASK FILL @ Binance Perp',
        sizeUsd: '$275,000',
        capturedBps: '+34.8 bps',
        latency: '0.29ms',
      },
      {
        id: 'VX-77110',
        timestamp: '14:22:09.305',
        legLong: 'MAKER BID @ dYdX v4',
        legShort: 'HEDGE SHORT @ Bybit VIP',
        sizeUsd: '$520,000',
        capturedBps: '+31.5 bps',
        latency: '0.32ms',
      },
      {
        id: 'VX-77111',
        timestamp: '14:22:10.619',
        legLong: 'JIT LIQUIDITY @ Drift v2',
        legShort: 'DELTA HEDGE @ Coinbase Intl',
        sizeUsd: '$190,000',
        capturedBps: '+37.2 bps',
        latency: '0.31ms',
      },
    ],
  },
];

export interface VaultStrategySpec {
  id: string;
  code: string;
  name: string;
  tagline: string;
  targetApy: number;
  apyRange: string;
  sharpe: string;
  sortino: string;
  maxDrawdown: string;
  capacityRemaining: string;
  totalTvl: string;
  minEpochLock: string;
  deltaExposure: string;
  description: string;
  mechanics: string[];
  venueBreakdown: { venue: string; share: number; role: string }[];
  monthlyReturns: { month: string; value: string }[];
}

export const VAULT_STRATEGIES: VaultStrategySpec[] = [
  {
    id: 'basis-arb',
    code: 'VAULT-01 // DELTA-NEUTRAL',
    name: 'Perpetual Basis & Funding Rate Harvester',
    tagline: 'Zero directional market exposure. Collects structural perpetual funding payments and calendar futures basis across 14 institutional venues.',
    targetApy: 22.4,
    apyRange: '18.4% – 26.2%',
    sharpe: '3.68',
    sortino: '5.12',
    maxDrawdown: '-0.84%',
    capacityRemaining: '$14.2M',
    totalTvl: '$684.5M',
    minEpochLock: '7-Day Rolling Epoch',
    deltaExposure: '< 0.02% Net Delta',
    description:
      'Built for capital preservation with high risk-adjusted yield. The engine simultaneously holds custody-grade spot assets in MPC vaults while shorting equivalent notional perpetual futures on venues with the highest positive funding rates.',
    mechanics: [
      'Automated cross-exchange funding rate arbitrage rebalancing every 100ms',
      'Collateral remains off-exchange in Fireblocks MPC & Copper ClearLoop vaults',
      'Dynamic regime shift to reverse-cash-and-carry during negative funding windows',
    ],
    venueBreakdown: [
      { venue: 'Binance VIP9 (ClearLoop)', share: 34, role: 'Perpetual Short Hedge' },
      { venue: 'dYdX v4 AppChain', share: 28, role: 'Decentralized Perp Liquidity' },
      { venue: 'Hyperliquid L1', share: 22, role: 'High-Yield Funding Capture' },
      { venue: 'Deribit Institutional', share: 16, role: 'Quarterly Dated Basis' },
    ],
    monthlyReturns: [
      { month: 'Jun', value: '+1.92%' },
      { month: 'Jul', value: '+2.14%' },
      { month: 'Aug', value: '+1.78%' },
      { month: 'Sep', value: '+1.85%' },
      { month: 'Oct', value: '+2.31%' },
      { month: 'Nov', value: '+2.08%' },
    ],
  },
  {
    id: 'multi-strat',
    code: 'VAULT-02 // CORE COMPOSITE',
    name: 'Multi-Strategy Quantitative Liquidity Engine',
    tagline: 'Our flagship institutional allocation combining perpetual basis, cross-DEX market making, and statistical funding dispersion.',
    targetApy: 31.8,
    apyRange: '27.5% – 36.4%',
    sharpe: '3.42',
    sortino: '4.86',
    maxDrawdown: '-1.18%',
    capacityRemaining: '$8.6M',
    totalTvl: '$512.0M',
    minEpochLock: '14-Day Rolling Epoch',
    deltaExposure: '< 0.05% Net Delta',
    description:
      'Dynamically allocates capital across three uncorrelated quantitative sub-strategies based on real-time volatility surfaces, order-book depth imbalances, and cross-chain liquidity fragmentation.',
    mechanics: [
      'AI-weighted risk parity allocation across Basis (50%), Market Making (30%), Stat-Arb (20%)',
      'Sub-millisecond adverse selection protection using L3 order book microstructure signals',
      'Automated tail-risk convexity hedging via Deribit out-of-the-money volatility collars',
    ],
    venueBreakdown: [
      { venue: 'Hyperliquid & dYdX v4', share: 42, role: 'Maker Rebate & Spread Capture' },
      { venue: 'Binance & Coinbase Intl', share: 31, role: 'Instant Delta Neutralization' },
      { venue: 'Deribit Options Desk', share: 15, role: 'Gamma & Tail Protection' },
      { venue: 'CME Group / Institutional OTC', share: 12, role: 'Macro Basis Anchoring' },
    ],
    monthlyReturns: [
      { month: 'Jun', value: '+2.64%' },
      { month: 'Jul', value: '+2.89%' },
      { month: 'Aug', value: '+2.41%' },
      { month: 'Sep', value: '+2.72%' },
      { month: 'Oct', value: '+3.15%' },
      { month: 'Nov', value: '+2.94%' },
    ],
  },
  {
    id: 'hft-alpha',
    code: 'VAULT-03 // HIGH-FREQUENCY ALPHA',
    name: 'HFT Order-Book Microstructure & Volatility Arb',
    tagline: 'Engineered for experienced crypto traders seeking maximum non-directional alpha from market volatility and liquidation cascades.',
    targetApy: 38.6,
    apyRange: '34.0% – 48.5%',
    sharpe: '2.94',
    sortino: '4.35',
    maxDrawdown: '-1.92%',
    capacityRemaining: '$3.8M',
    totalTvl: '$228.4M',
    minEpochLock: '30-Day Institutional Epoch',
    deltaExposure: 'Delta-Hedged Every 50ms',
    description:
      'Thrives during high-volatility expansions and liquidation events. Captures wide bid-ask spreads, exchange liquidation rebates, and cross-venue price dislocations while maintaining strict automated drawdown circuit breakers.',
    mechanics: [
      'Co-located bare-metal execution clusters in Tokyo (TY3), London (LD4), and Zürich',
      'Liquidation absorption engine buying distressed order book wicks with instant cross-venue hedge',
      'Zero MEV leakage via private validator block-building channels',
    ],
    venueBreakdown: [
      { venue: 'Hyperliquid L1 Validator Node', share: 38, role: 'HFT Maker & Liquidation Capture' },
      { venue: 'dYdX v4 Co-located Node', share: 29, role: 'Zero-Gas Order Book Quoting' },
      { venue: 'Bybit & OKX Prime', share: 21, role: 'Cross-Exchange Stat-Arb' },
      { venue: 'Deribit Volatility Surface', share: 12, role: 'Dispersion Arbitrage' },
    ],
    monthlyReturns: [
      { month: 'Jun', value: '+3.18%' },
      { month: 'Jul', value: '+3.42%' },
      { month: 'Aug', value: '+2.95%' },
      { month: 'Sep', value: '+3.61%' },
      { month: 'Oct', value: '+4.08%' },
      { month: 'Nov', value: '+3.74%' },
    ],
  },
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  firm: string;
  allocatedAmount: string;
  realizedApy: string;
  tenure: string;
  verificationHash: string;
}

export const TRADER_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      'After seven years of manually trading perpetuals and bleeding six figures a year in funding fees during choppy regimes, moving 60% of our desk treasury into Vectis Vault-02 transformed our P&L curve. We now collect the funding spread automatically with a 3.4+ Sharpe and zero overnight liquidation anxiety.',
    author: 'Marcus Vance',
    role: 'Managing Partner & Head of Derivatives',
    firm: 'Kestrel Digital Capital',
    allocatedAmount: '$4.2M Allocated',
    realizedApy: '+31.4% Net Realized',
    tenure: '14 Epochs Active',
    verificationHash: '0x8f4c...e92a',
  },
  {
    id: 't-2',
    quote:
      'What convinced our risk committee was the off-exchange MPC settlement architecture. Our collateral stays inside segregated Fireblocks vaults with cryptographic Merkle proof verification every 60 seconds, while Vectis executes sub-millisecond basis arbitrage across dYdX and Binance VIP.',
    author: 'Elena Rostova, CFA',
    role: 'Chief Investment Officer',
    firm: 'Aethelgard Quant FoF',
    allocatedAmount: '$12.5M Allocated',
    realizedApy: '+25.8% Net Realized',
    tenure: '22 Epochs Active',
    verificationHash: '0x3a91...71b4',
  },
  {
    id: 't-3',
    quote:
      'During the August volatility cascade when retail longs lost $1.2B in 4 hours, our Vectis HFT Alpha allocation printed +3.8% in a single session by capturing dislocated perp spreads and liquidation rebates. It is genuine institutional infrastructure made accessible to sovereign crypto traders.',
    author: 'Devon K.',
    role: 'Founder & Former CME Market Maker',
    firm: 'Hyperion Perp Syndicate',
    allocatedAmount: '$850K Allocated',
    realizedApy: '+39.1% Net Realized',
    tenure: '9 Epochs Active',
    verificationHash: '0x6d12...c40f',
  },
];

export interface AllocationTier {
  id: string;
  tierNumber: string;
  name: string;
  subtitle: string;
  minAllocation: string;
  minAmountNum: number;
  targetNetApy: string;
  managementFee: string;
  performanceFeeStandard: string;
  performanceFeeAnnual: string;
  redemptionWindow: string;
  highlighted?: boolean;
  badge?: string;
  features: string[];
  ctaLabel: string;
}

export const ALLOCATION_TIERS: AllocationTier[] = [
  {
    id: 'pro-trader',
    tierNumber: '01',
    name: 'Pro Trader',
    subtitle: 'For independent crypto traders & high-net-worth DeFi allocators seeking automated delta-neutral yield.',
    minAllocation: '$10,000',
    minAmountNum: 10000,
    targetNetApy: '18.4% – 26.2%',
    managementFee: '0.00%',
    performanceFeeStandard: '18%',
    performanceFeeAnnual: '14%',
    redemptionWindow: 'T+7 Weekly Epoch Liquidity',
    features: [
      'Full access to Vault-01 (Perpetual Basis & Funding Arb)',
      'Non-custodial Web3 Wallet connect (MetaMask, Rabby, Ledger)',
      'Real-time cryptographic Proof-of-Reserves verification',
      'Automated daily funding rate compounding in USDC / USDT',
      'Live Telegram & Webhook execution telemetry alerts',
    ],
    ctaLabel: 'Allocate as Pro Trader',
  },
  {
    id: 'quant-syndicate',
    tierNumber: '02',
    name: 'Quant Syndicate',
    subtitle: 'Full multi-strategy execution access with priority liquidity epochs and lower performance fee structure.',
    minAllocation: '$100,000',
    minAmountNum: 100000,
    targetNetApy: '27.5% – 38.6%',
    managementFee: '0.00%',
    performanceFeeStandard: '14%',
    performanceFeeAnnual: '10.5%',
    redemptionWindow: 'T+1 Priority Express Liquidity',
    highlighted: true,
    badge: 'MOST POPULAR FOR TRADERS',
    features: [
      'Unrestricted access to all 3 Quantitative Strategy Vaults',
      'Custom portfolio weightings across Basis, Market Making & HFT Alpha',
      'Segregated sub-account NAV tracking with read-only exchange API keys',
      'Automated portfolio margin hedging & tax-lot export CSV/API',
      'Direct priority line to Vectis Quantitative Execution Desk',
      'Zero deposit, withdrawal, or gas routing fees',
    ],
    ctaLabel: 'Join Quant Syndicate',
  },
  {
    id: 'institutional-prime',
    tierNumber: '03',
    name: 'Institutional Prime',
    subtitle: 'Bespoke algorithmic mandates for crypto funds, prop desks, family offices, and protocol treasuries.',
    minAllocation: '$1,000,000+',
    minAmountNum: 1000000,
    targetNetApy: 'Custom Mandate',
    managementFee: '0.00%',
    performanceFeeStandard: '10%',
    performanceFeeAnnual: '7.5%',
    redemptionWindow: 'T+0 Instant Intraday Settlement',
    features: [
      'Dedicated 3-of-5 Fireblocks MPC Vault & Copper ClearLoop custody',
      'Assets never leave your institutional custody perimeter',
      'Custom drawdown circuit-breakers & bespoke delta/vega bounds',
      'Co-located FIX 4.4 & ultra-low-latency WebSocket reporting stream',
      'Dedicated Quant Engineer & 24/7 Slack war-room channel',
      'SOC2 Type II & audited institutional compliance package',
    ],
    ctaLabel: 'Configure Prime Mandate',
  },
];

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  metricHighlight?: string;
}

export const TECHNICAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'CUSTODY & SOLVENCY',
    question: 'How is my capital protected against exchange insolvency or counterparty default?',
    answer:
      'Vectis never stores idle client principal in centralized exchange hot wallets. All collateral is held inside bankruptcy-remote, Multi-Party Computation (MPC) vaults powered by Fireblocks and Copper ClearLoop. Exchanges only receive cryptographic off-exchange margin pledges while your underlying USDC, BTC, or ETH remains securely segregated on-chain and verified every 60 seconds via Chainlink Proof-of-Reserves.',
    metricHighlight: '104.2% Over-Collateralized Off-Exchange MPC Custody',
  },
  {
    id: 'faq-2',
    category: 'STRATEGY MECHANICS',
    question: 'How do Vectis vaults generate 20%–38%+ APY regardless of whether crypto prices go up or down?',
    answer:
      'Unlike directional trading or passive holding, Vectis operates market-neutral quantitative engines. In Vault-01, every $1 of spot exposure is paired with an exact -$1 short perpetual position, neutralizing price risk (Net Delta < 0.02%). Yield is generated from structural perpetual funding payments paid by leveraged traders, cross-exchange price basis convergence, and maker rebates from providing order book liquidity.',
    metricHighlight: '0.014 Beta to BTC Price Direction Since Inception',
  },
  {
    id: 'faq-3',
    category: 'RISK MANAGEMENT',
    question: 'What happens during extreme black-swan market crashes or negative funding rate regimes?',
    answer:
      'Our risk engine monitors real-time order-book depth, margin utilization, and funding velocity at 1-millisecond intervals. If perpetual funding turns persistently negative, the engine automatically rotates into reverse-cash-and-carry (short spot via institutional borrow / long discounted perpetual) and deploys volatility dispersion collars on Deribit—turning market panic into high-spread maker arbitrage.',
    metricHighlight: 'Max Historical Drawdown: -1.18% Across 38 Months',
  },
  {
    id: 'faq-4',
    category: 'LIQUIDITY & REDEMPTIONS',
    question: 'What are the lockup terms and how quickly can I withdraw my principal and accrued yield?',
    answer:
      'You retain full sovereignty over your capital. Pro Trader allocations settle on a rolling 7-day liquidity epoch, Quant Syndicate members enjoy T+1 express redemptions, and Institutional Prime accounts have T+0 intraday settlement. In addition, an on-chain Emergency Unwind function allows any depositor to trigger direct smart-contract settlement at any time.',
    metricHighlight: '100% On-Time Redemptions • $0 Withdrawal Fees',
  },
  {
    id: 'faq-5',
    category: 'FEE ALIGNMENT',
    question: 'Why does Vectis charge a 0% management fee, and how are performance fees calculated?',
    answer:
      'We believe traditional 2% management fees misalign incentives. Vectis charges 0.00% management, deposit, or withdrawal fees. We only earn a performance fee (10% to 18% depending on tier) on net new high-water-mark profits generated for your account at the close of each epoch. If a strategy does not generate positive net alpha, you pay zero fees.',
    metricHighlight: 'Strict High-Water-Mark Performance Alignment',
  },
  {
    id: 'faq-6',
    category: 'ONBOARDING',
    question: 'Can I allocate directly from a self-custody Web3 wallet as an individual crypto trader?',
    answer:
      'Yes. Individual crypto traders can connect directly via MetaMask, Rabby, WalletConnect, Ledger, or Safe multisig to deposit USDC, USDT, wBTC, or ETH into our audited ERC-4626 tokenized vault contracts. Institutional allocators and prop desks can also onboard via segregated Fireblocks vaults or direct USDC treasury wire.',
    metricHighlight: 'Instant Web3 ERC-4626 Vault Minting or Institutional MPC',
  },
];
