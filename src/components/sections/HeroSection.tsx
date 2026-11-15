import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { HeroPlanet3D } from '../visual/HeroPlanet3D';
import { EXTERNAL_LINKS } from '../../config/externalLinks';

interface HeroSectionProps {
  onOpenLauncher?: (appId: 'observation' | 'prediction') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
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

          {/* Dual Action CTAs: Strict Hierarchy (Primary FHI vs Secondary Companion Predict) */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 pt-1 sm:pt-2">
            {/* Primary Action: Explore FHI System (Dominant visual anchor) */}
            <a
              href={EXTERNAL_LINKS.fhi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 min-h-[52px] sm:min-h-[56px] bg-[#B8EE68] hover:bg-[#C8F77B] active:bg-[#A8DE58] text-[#071310] font-title font-bold text-sm sm:text-base border-2 border-[#B8EE68] shadow-[0_4px_24px_rgba(184,238,104,0.32)] hover:shadow-[0_6px_32px_rgba(184,238,104,0.48)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8EE68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040908] group"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#071310] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#071310]"></span>
              </span>
              <span>{t('hero.ctaObservation')}</span>
              <ArrowUpRight className="w-4.5 h-4.5 text-[#071310] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Secondary Action: Companion Fire Prediction App (Discreet outline/dark surface) */}
            <a
              href={EXTERNAL_LINKS.predict}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[44px] bg-[#06120F]/85 hover:bg-[#0B1E19] active:bg-[#0E251F] text-[#CAD5CE] hover:text-[#EFF5ED] border border-[#213832] hover:border-[#FF9C55]/60 font-title font-medium text-xs sm:text-sm shadow-[0_2px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9C55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040908] group"
            >
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9C55]/85"></span>
              </span>
              <span>{t('hero.ctaPrediction')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#93A39C] transition-colors group-hover:text-[#FF9C55] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
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
