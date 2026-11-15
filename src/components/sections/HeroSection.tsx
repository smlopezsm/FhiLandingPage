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
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#1D322C] bg-[#040908] overflow-hidden"
    >
      {/* 3D Planet Background Visual (Integrated behind and to the right of the headline) */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -right-12 sm:-right-8 md:right-0 lg:-right-6 xl:right-2 w-full sm:w-[88%] md:w-[75%] lg:w-[62%] xl:w-[58%] h-[500px] sm:h-[600px] lg:h-[720px] pointer-events-auto z-0 select-none flex items-center justify-center lg:justify-end"
        aria-hidden="true"
      >
        <HeroPlanet3D />
      </div>

      {/* Localized Contrast Vignette Mask: Guarantees effortless editorial text legibility */}
      <div
        className="absolute inset-y-0 left-0 w-full sm:w-[85%] md:w-[72%] lg:w-[56%] z-10 pointer-events-none bg-gradient-to-r from-[#040908] via-[#040908]/92 via-50% to-transparent hidden sm:block"
        aria-hidden="true"
      />
      {/* Mobile Contrast Backdrop: Soft darkened overlay so mobile text remains perfectly crisp */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-[#040908]/75 sm:hidden"
        aria-hidden="true"
      />

      {/* Foreground Editorial Content: Agency Badge, Headline, Subheadline & Primary Dual CTAs */}
      <div className="relative z-20 max-w-6xl mx-auto w-full pointer-events-none">
        <div className="max-w-2xl lg:max-w-[560px] xl:max-w-[620px] space-y-6 sm:space-y-8 pointer-events-auto">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#B8EE68]">
              {t('hero.agency')}
            </div>
            <h1 className="font-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#EFF5ED] leading-[1.12]">
              {t('hero.headline')}
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#93A39C] leading-relaxed max-w-2xl">
              {t('hero.subheadline')}
            </p>
          </div>

          {/* Dual Action CTAs for Direct System Access */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
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
      </div>

      {/* Subtle Constellation Telemetry Legend */}
      <div className="hidden lg:flex items-center gap-4 absolute bottom-6 right-8 z-20 pointer-events-none font-mono text-[11px] text-[#93A39C]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#68D9D0]" />
          <span>Terra (MODIS)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#B8EE68]" />
          <span>Aqua (MODIS)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF9C55]" />
          <span>Suomi NPP (VIIRS)</span>
        </div>
        <span className="text-[#314640]">|</span>
        <span className="text-[#93A39C]/70">Drag to rotate</span>
      </div>
    </section>
  );
};
