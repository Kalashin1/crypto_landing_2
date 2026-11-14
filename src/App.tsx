import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroTerminal } from './components/HeroTerminal';
import { SocialProofSection } from './components/SocialProofSection';
import { BentoFeaturesSection } from './components/BentoFeaturesSection';
import { ProductShowcaseSection } from './components/ProductShowcaseSection';
import { YieldCalculatorSection } from './components/YieldCalculatorSection';
import { TestimonialsAndPricingSection } from './components/TestimonialsAndPricingSection';
import { FaqAndCtaSection } from './components/FaqAndCtaSection';
import { AllocationModal } from './components/AllocationModal';

export function App() {
  const [simulatorStrategyId, setSimulatorStrategyId] = useState<string>('multi-strat');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'allocate' | 'por'>('allocate');
  const [modalInitialAmount, setModalInitialAmount] = useState<number>(100000);
  const [modalInitialStrategy, setModalInitialStrategy] = useState<string>('multi-strat');

  const handleOpenAllocationModal = (
    presetAmount: number = 100000,
    presetStrategy: string = 'multi-strat'
  ) => {
    setModalInitialAmount(presetAmount);
    setModalInitialStrategy(presetStrategy);
    setModalMode('allocate');
    setModalOpen(true);
  };

  const handleOpenPorModal = () => {
    setModalMode('por');
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#06080D] text-[#F8FAFC] relative selection:bg-[#10B981]/30 selection:text-[#10B981]">
      {/* Sticky Floating Glassmorphic Navbar + Live Funding Telemetry Ribbon */}
      <Navbar
        onOpenAllocationModal={handleOpenAllocationModal}
        onOpenPorModal={handleOpenPorModal}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Split 12-Col Hero + Interactive 3D-Tilted Live Execution Terminal */}
        <HeroTerminal onOpenAllocationModal={handleOpenAllocationModal} />

        {/* 2. Institutional Social Proof & Custody Topology Strip */}
        <SocialProofSection onOpenPorModal={handleOpenPorModal} />

        {/* 3. Core Quantitative Features (Asymmetric 12-Col Bento Grid) */}
        <BentoFeaturesSection />

        {/* 4. Interactive Product Showcase (Strategy Vaults) & Benefits Comparison Matrix */}
        <ProductShowcaseSection
          onSelectStrategyForSimulator={(strategyId) => setSimulatorStrategyId(strategyId)}
          onOpenAllocationModal={handleOpenAllocationModal}
        />

        {/* 5. Interactive Capital Allocation & Yield Simulator */}
        <YieldCalculatorSection
          selectedStrategyId={simulatorStrategyId}
          onStrategyChange={(id) => setSimulatorStrategyId(id)}
          onOpenAllocationModal={handleOpenAllocationModal}
        />

        {/* 6. Verified Trader Testimonials & 3-Tier Capital Allocation Schedule */}
        <TestimonialsAndPricingSection
          onOpenAllocationModal={handleOpenAllocationModal}
        />

        {/* 7. Technical Risk FAQ, Epoch #843 Final CTA Banner & Institutional Footer */}
        <FaqAndCtaSection
          onOpenAllocationModal={handleOpenAllocationModal}
          onOpenPorModal={handleOpenPorModal}
        />
      </main>

      {/* Interactive Capital Allocation & Proof-of-Reserves Modal */}
      <AllocationModal
        isOpen={modalOpen}
        mode={modalMode}
        initialAmount={modalInitialAmount}
        initialStrategyId={modalInitialStrategy}
        onClose={() => setModalOpen(false)}
        onSwitchMode={(newMode) => setModalMode(newMode)}
      />
    </div>
  );
}

export default App;
