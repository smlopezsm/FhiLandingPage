import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingAppLauncher } from './components/layout/FloatingAppLauncher';
import { HeroSection } from './components/sections/HeroSection';
import { ChallengeSection } from './components/sections/ChallengeSection';
import { SolutionSection } from './components/sections/SolutionSection';
import { PredictionSection } from './components/sections/PredictionSection';
import { TeamSection } from './components/sections/TeamSection';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#040908] text-[#EFF5ED] flex flex-col relative selection:bg-[#B8EE68] selection:text-[#07100F] overflow-x-hidden">
      {/* Immersive Space & Earth Observation Living Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Deep Cosmic Void Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#09211C_0%,#05110E_45%,#030706_100%)]" />

        {/* Dynamic Living Exosphere Auroral Wave 1 (Behind Hero & Upper Content) */}
        <div className="absolute -top-32 left-[15%] w-[1100px] h-[750px] bg-[radial-gradient(ellipse_at_center,rgba(104,217,208,0.22)_0%,rgba(184,238,104,0.12)_40%,transparent_70%)] blur-3xl animate-aurora-1" />

        {/* Dynamic Living Exosphere Auroral Wave 2 (Counter-drift) */}
        <div className="absolute top-12 right-[10%] w-[1000px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(35,110,90,0.26)_0%,rgba(104,217,208,0.14)_45%,transparent_70%)] blur-3xl animate-aurora-2" />

        {/* Mid-Page Science Depth Glow (Behind Solution & Observation Matrix) */}
        <div className="absolute top-[42%] -left-[160px] w-[850px] h-[850px] bg-[radial-gradient(circle_at_center,rgba(32,100,82,0.22)_0%,rgba(184,238,104,0.06)_45%,transparent_70%)] blur-3xl animate-aurora-1" />

        {/* Thermal Hotspot Atmospheric Drift (Behind Prediction App) */}
        <div className="absolute top-[70%] -right-[160px] w-[750px] h-[750px] bg-[radial-gradient(circle_at_center,rgba(255,156,85,0.12)_0%,transparent_70%)] blur-3xl animate-aurora-2" />

        {/* Ultra-fine Cartographic Telemetry Grid Pattern */}
        <div className="absolute inset-0 pattern-grid opacity-[0.22]" />

        {/* Living Celestial Coordinates / Micro-Stars with subtle twinkle */}
        <div className="absolute inset-0 pattern-stars opacity-55 animate-twinkle" />
      </div>

      {/* Skip to Content for Accessibility */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#B8EE68] focus:text-[#07100F] focus:font-bold focus:rounded-lg focus:shadow-xl"
      >
        Skip to main content
      </a>

      {/* Main Navigation Header */}
      <Header />

      {/* Main Content: 4 Core Narrative Blocks + Hero */}
      <main id="main-content" className="flex-1 relative z-10">
        {/* Section A: Hero */}
        <HeroSection />

        {/* Section B: The NASA Challenge (01) */}
        <ChallengeSection />

        {/* Section C: Our Solution (02) */}
        <SolutionSection />

        {/* Section D: Fire Prediction App (03) */}
        <PredictionSection />

        {/* Section E: Our Team (04) */}
        <TeamSection />
      </main>

      {/* Section F: Minimalist Footer */}
      <Footer />

      {/* Persistent Two Floating App Launchers with Informative Modal */}
      <FloatingAppLauncher />
    </div>
  );
};

export default App;
