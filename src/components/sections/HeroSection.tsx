import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { HeroPlanet3D } from '../visual/HeroPlanet3D';

interface HeroSectionProps {
  onOpenLauncher?: (appId: 'observation' | 'prediction') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenLauncher }) => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      aria-label="FHI Hero"
      className="pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#1D322C] bg-transparent"
    >
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        {/* Editorial Heading & Subheading */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#B8EE68]">
            {t('hero.agency')}
          </div>
          <h1 className="font-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#EFF5ED] leading-[1.12]">
            {t('hero.headline')}
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#93A39C] leading-relaxed max-w-2xl">
            {t('hero.subheadline')}
          </p>

          {/* Dual Action CTAs for Direct System Access */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
            {/* Primary Action: Explore FHI System */}
            <button
              type="button"
              onClick={() => onOpenLauncher?.('observation')}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 min-h-[46px] bg-[#B8EE68] hover:bg-[#C8F77B] text-[#071310] font-title font-bold text-xs sm:text-sm border border-[#B8EE68] shadow-[0_0_24px_rgba(184,238,104,0.35)] hover:shadow-[0_0_32px_rgba(184,238,104,0.5)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8EE68] group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#071310] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#071310]"></span>
              </span>
              <span>{t('hero.ctaObservation')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#071310] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Secondary Action: Companion Fire Prediction App */}
            <button
              type="button"
              onClick={() => onOpenLauncher?.('prediction')}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 min-h-[46px] bg-[#0A1A16]/90 hover:bg-[#102B24] text-[#EFF5ED] border border-[#FF9C55]/70 hover:border-[#FF9C55] font-title font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,156,85,0.2)] hover:shadow-[0_0_28px_rgba(255,156,85,0.35)] backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9C55] group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9C55] opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9C55]"></span>
              </span>
              <span>{t('hero.ctaPrediction')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF9C55] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Protagonist Visual: 3D Earth with Orbiting MODIS & VIIRS Satellites */}
        <div className="w-full">
          <HeroPlanet3D />
        </div>
      </div>
    </section>
  );
};
