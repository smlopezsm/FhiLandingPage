import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, FileText } from 'lucide-react';
import clsx from 'clsx';
import { EXTERNAL_LINKS } from '../../config/externalLinks';
import { getDocumentationUrl } from '../../config/docs';

interface FloatingAppLauncherProps {
  initialOpenApp?: 'observation' | 'prediction' | null;
  onCloseInitial?: () => void;
}

export const FloatingAppLauncher: React.FC<FloatingAppLauncherProps> = () => {
  const { t, i18n } = useTranslation();

  // Dynamic documentation URL based on current language (EN fallback for unrecognized)
  const docUrl = getDocumentationUrl(i18n.language);

  // Visibility state for the two application buttons (only shown after scrolling past the Hero)
  const [showAppButtons, setShowAppButtons] = useState<boolean>(false);

  // IntersectionObserver: monitor Hero visibility to reveal app buttons ONLY after passing the Hero
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      // Graceful fallback for test or SSR environments without DOM intersection
      setShowAppButtons(true);
      return;
    }

    const heroElement = document.getElementById('hero');
    if (!heroElement) {
      // If hero element is absent (e.g. isolated unit test), default to visible
      setShowAppButtons(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // While hero is in view, entry.isIntersecting is true (app buttons hidden)
        // Once user scrolls past the hero, !entry.isIntersecting and boundingClientRect.top < 0
        const isPastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setShowAppButtons(isPastHero);
      },
      {
        threshold: 0,
        rootMargin: '-30px 0px 0px 0px',
      }
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* -------------------------------------------------------------------- */}
      {/* 1. Permanent Bilingual PDF Documentation Button (Fixed Bottom-Left) */}
      {/* -------------------------------------------------------------------- */}
      <aside
        aria-label={t('documentation.ariaLabel')}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
      >
        <a
          href={docUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[46px] bg-[#0A1714]/95 hover:bg-[#102B24] text-[#EFF5ED] border border-[#21312D] hover:border-[#B8EE68]/70 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8EE68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100F] group"
          aria-label={t('documentation.button')}
        >
          <FileText className="w-4 h-4 text-[#B8EE68] transition-transform group-hover:scale-110" />
          <span className="font-title font-semibold text-xs sm:text-sm text-[#EFF5ED] leading-none">
            {t('documentation.button')}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#93A39C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </aside>

      {/* -------------------------------------------------------------------- */}
      {/* 2. Application Access Launchers (Fixed Bottom-Right, After Hero)     */}
      {/* -------------------------------------------------------------------- */}
      <aside
        aria-label={t('launcher.title')}
        aria-hidden={!showAppButtons}
        className={clsx(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 select-none filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.7)] transition-all duration-300 motion-reduce:transition-none motion-reduce:transform-none",
          showAppButtons
            ? "opacity-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 translate-y-4 invisible pointer-events-none"
        )}
      >
        {/* Button 1: Explore Fire History Interface (Dominant Primary Action) */}
        <a
          href={EXTERNAL_LINKS.fhi}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showAppButtons ? 0 : -1}
          className="flex-initial flex items-center justify-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3.5 min-h-[48px] sm:min-h-[52px] bg-[#B8EE68] hover:bg-[#C8F77B] active:bg-[#A8DE58] text-[#071310] border-2 border-[#B8EE68] shadow-[0_4px_24px_rgba(184,238,104,0.35)] hover:shadow-[0_6px_32px_rgba(184,238,104,0.5)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8EE68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100F] group"
          title={t('launcher.exploreObs')}
        >
          {/* Signal Indicator Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#071310] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#071310]"></span>
          </span>

          <span className="font-title font-bold text-xs sm:text-sm text-[#071310] leading-tight tracking-tight flex items-center gap-1.5">
            {t('launcher.exploreObs')}
            <ArrowUpRight className="w-4 h-4 text-[#071310] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>

        {/* Button 2: Fire Prediction App (Secondary Companion CTA - Compact Outline Surface) */}
        <a
          href={EXTERNAL_LINKS.predict}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showAppButtons ? 0 : -1}
          className="flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2 min-h-[44px] bg-[#06120F]/95 hover:bg-[#0B1E19] active:bg-[#0E251F] text-[#CAD5CE] hover:text-[#EFF5ED] border border-[#213832] hover:border-[#FF9C55]/60 shadow-[0_2px_12px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9C55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100F] group"
          title={t('launcher.explorePred')}
        >
          {/* Thermal Indicator Dot */}
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9C55]/85"></span>
          </span>

          <span className="font-title font-medium text-[11px] sm:text-xs text-[#CAD5CE] group-hover:text-[#EFF5ED] leading-tight flex items-center gap-1.5">
            {t('launcher.explorePred')}
            <ArrowUpRight className="w-3 h-3 text-[#93A39C] transition-colors group-hover:text-[#FF9C55] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </aside>
    </>
  );
};
