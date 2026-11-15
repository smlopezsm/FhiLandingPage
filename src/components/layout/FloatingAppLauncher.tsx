import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, FileText } from 'lucide-react';
import clsx from 'clsx';
import { EXTERNAL_LINKS } from '../../config/externalLinks';
import { DOCUMENTATION_PDF_URL } from '../../config/docs';

interface FloatingAppLauncherProps {
  initialOpenApp?: 'observation' | 'prediction' | null;
  onCloseInitial?: () => void;
}

export const FloatingAppLauncher: React.FC<FloatingAppLauncherProps> = () => {
  const { t } = useTranslation();

  // Visibility state for the two application buttons (only shown after scrolling past the Hero)
  const [showAppButtons, setShowAppButtons] = useState<boolean>(false);

  // Transient notice for when Documentation PDF is clicked before being configured
  const [showDocNotice, setShowDocNotice] = useState<boolean>(false);
  const docNoticeTimerRef = useRef<number | null>(null);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (docNoticeTimerRef.current) {
        window.clearTimeout(docNoticeTimerRef.current);
      }
    };
  }, []);

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

  const handleDocClick = () => {
    if (!DOCUMENTATION_PDF_URL) {
      setShowDocNotice(true);
      if (docNoticeTimerRef.current) {
        window.clearTimeout(docNoticeTimerRef.current);
      }
      docNoticeTimerRef.current = window.setTimeout(() => {
        setShowDocNotice(false);
      }, 3500);
    }
  };

  return (
    <>
      {/* -------------------------------------------------------------------- */}
      {/* 1. Permanent PDF Documentation Button (Fixed Bottom-Left Corner)     */}
      {/* -------------------------------------------------------------------- */}
      <aside
        aria-label={t('documentation.ariaLabel')}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
      >
        {DOCUMENTATION_PDF_URL ? (
          <a
            href={DOCUMENTATION_PDF_URL}
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
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={handleDocClick}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[46px] bg-[#0A1714]/95 hover:bg-[#102B24] text-[#EFF5ED] border border-[#21312D] hover:border-[#B8EE68]/70 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8EE68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100F] group"
              aria-label={`${t('documentation.button')} - ${t('documentation.comingSoon')}`}
              title={`${t('documentation.button')} (${t('documentation.comingSoon')})`}
            >
              <FileText className="w-4 h-4 text-[#B8EE68] transition-transform group-hover:scale-110" />
              <span className="font-title font-semibold text-xs sm:text-sm text-[#EFF5ED] leading-none">
                {t('documentation.button')}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#93A39C] bg-[#142621] px-1.5 py-0.5 border border-[#1D322C]">
                {t('documentation.comingSoon')}
              </span>
            </button>

            {/* Accessible Status Notice when clicked prior to PDF publication */}
            {showDocNotice && (
              <div
                role="status"
                aria-live="polite"
                className="absolute bottom-full left-0 mb-2 whitespace-nowrap px-3 py-1.5 bg-[#07100F] border border-[#21312D] text-[11px] font-mono text-[#B8EE68] shadow-2xl pointer-events-none animate-in fade-in duration-200"
              >
                // {t('documentation.tooltip')}
              </div>
            )}
          </div>
        )}
      </aside>

      {/* -------------------------------------------------------------------- */}
      {/* 2. Application Access Launchers (Fixed Bottom-Right, After Hero)     */}
      {/* -------------------------------------------------------------------- */}
      <aside
        aria-label={t('launcher.title')}
        aria-hidden={!showAppButtons}
        className={clsx(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5 sm:gap-3.5 select-none filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.7)] transition-all duration-300 motion-reduce:transition-none motion-reduce:transform-none",
          showAppButtons
            ? "opacity-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 translate-y-4 invisible pointer-events-none"
        )}
      >
        {/* Button 1: Explore Fire History Interface (Observation System - Primary CTA) */}
        <a
          href={EXTERNAL_LINKS.fhi}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showAppButtons ? 0 : -1}
          className="flex-initial flex items-center justify-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[46px] sm:min-h-[50px] bg-[#B8EE68] hover:bg-[#C8F77B] text-[#071310] border border-[#B8EE68] shadow-[0_0_24px_rgba(184,238,104,0.35)] hover:shadow-[0_0_32px_rgba(184,238,104,0.5)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8EE68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100F] group"
          title={t('launcher.exploreObs')}
        >
          {/* Signal Indicator Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#071310] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#071310]"></span>
          </span>

          <span className="font-title font-bold text-xs sm:text-sm text-[#071310] leading-tight flex items-center gap-1.5">
            {t('launcher.exploreObs')}
            <ArrowUpRight className="w-3.5 h-3.5 text-[#071310] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>

        {/* Button 2: Fire Prediction App (Prediction - Secondary Companion CTA) */}
        <a
          href={EXTERNAL_LINKS.predict}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showAppButtons ? 0 : -1}
          className="flex-initial flex items-center justify-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[46px] sm:min-h-[50px] bg-[#0A1714]/95 hover:bg-[#0F241F] text-[#EFF5ED] border border-[#FF9C55]/70 hover:border-[#FF9C55] shadow-[0_0_20px_rgba(255,156,85,0.2)] hover:shadow-[0_0_28px_rgba(255,156,85,0.35)] backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9C55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100F] group"
          title={t('launcher.explorePred')}
        >
          {/* Thermal Indicator Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9C55] opacity-50"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9C55]"></span>
          </span>

          <span className="font-title font-semibold text-xs sm:text-sm text-[#EFF5ED] leading-tight flex items-center gap-1.5">
            {t('launcher.explorePred')}
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF9C55] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </aside>
    </>
  );
};
