import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { APPS_CONFIG, type AppConfig } from '../../config/apps';

interface FloatingAppLauncherProps {
  initialOpenApp?: 'observation' | 'prediction' | null;
  onCloseInitial?: () => void;
}

export const FloatingAppLauncher: React.FC<FloatingAppLauncherProps> = ({
  initialOpenApp,
  onCloseInitial,
}) => {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language.startsWith('es');

  const [activeModalApp, setActiveModalApp] = useState<AppConfig | null>(
    initialOpenApp ? APPS_CONFIG[initialOpenApp] : null
  );

  // Sync with prop when parent triggers opening
  React.useEffect(() => {
    if (initialOpenApp) {
      setActiveModalApp(APPS_CONFIG[initialOpenApp]);
    }
  }, [initialOpenApp]);

  const handleOpen = (appId: 'observation' | 'prediction') => {
    setActiveModalApp(APPS_CONFIG[appId]);
  };

  const handleClose = () => {
    setActiveModalApp(null);
    if (onCloseInitial) onCloseInitial();
  };

  return (
    <>
      {/* Floating Action Buttons Container (Bottom Dock on Mobile, Bottom-Right on Desktop) */}
      <aside
        aria-label={t('launcher.title')}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 flex flex-row items-center justify-end gap-2.5 sm:gap-3.5 select-none filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
      >
        {/* Button 1: Explore FHI (Observation System - Primary CTA) */}
        <button
          type="button"
          onClick={() => handleOpen('observation')}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[46px] sm:min-h-[50px] bg-[#B8EE68] hover:bg-[#C8F77B] text-[#071310] border border-[#B8EE68] shadow-[0_0_24px_rgba(184,238,104,0.35)] hover:shadow-[0_0_32px_rgba(184,238,104,0.5)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8EE68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100F] group"
          aria-haspopup="dialog"
          title={`${t('launcher.exploreObs')} (${t('launcher.comingSoon')})`}
        >
          {/* Signal Indicator Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#071310] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#071310]"></span>
          </span>

          <div className="flex flex-col text-left">
            <span className="font-title font-bold text-xs sm:text-sm text-[#071310] leading-tight flex items-center gap-1">
              {t('launcher.exploreObs')}
              <ArrowUpRight className="w-3.5 h-3.5 text-[#071310] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#071310]/80 tracking-tight hidden sm:block">
              {t('launcher.obsSubtitle')}
            </span>
          </div>
        </button>

        {/* Button 2: Fire Prediction App (Prediction - Secondary Companion CTA) */}
        <button
          type="button"
          onClick={() => handleOpen('prediction')}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[46px] sm:min-h-[50px] bg-[#0A1714]/95 hover:bg-[#0F241F] text-[#EFF5ED] border border-[#FF9C55]/70 hover:border-[#FF9C55] shadow-[0_0_20px_rgba(255,156,85,0.2)] hover:shadow-[0_0_28px_rgba(255,156,85,0.35)] backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9C55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100F] group"
          aria-haspopup="dialog"
          title={`${t('launcher.explorePred')} (${t('launcher.inDevelopment')})`}
        >
          {/* Thermal Indicator Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9C55] opacity-50"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9C55]"></span>
          </span>

          <div className="flex flex-col text-left">
            <span className="font-title font-semibold text-xs sm:text-sm text-[#EFF5ED] leading-tight flex items-center gap-1">
              {t('launcher.explorePred')}
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF9C55] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#93A39C] tracking-tight hidden sm:block">
              {t('launcher.predSubtitle')}
            </span>
          </div>
        </button>
      </aside>

      {/* Accessible Informative Modal for Coming Soon Launch */}
      {activeModalApp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="app-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-lg border border-[#21312D] bg-[#07100F] p-6 text-[#EFF5ED] shadow-2xl space-y-5 font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#21312D] pb-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#B8EE68] font-bold">
                  // {t('launcher.modalHeader')}
                </span>
                <h3 id="app-modal-title" className="font-title text-base sm:text-lg font-bold text-[#EFF5ED]">
                  {isSpanish ? activeModalApp.nameEs : activeModalApp.nameEn}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-1 border border-[#21312D] text-[#93A39C] hover:text-[#EFF5ED] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B8EE68]"
                aria-label={t('launcher.close')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status & Version */}
            <div className="flex items-center justify-between p-2.5 bg-[#0D1816] border border-[#21312D] text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FF9C55]" />
                <span className="font-semibold text-[#EFF5ED]">
                  {isSpanish ? activeModalApp.badgeEs : activeModalApp.badgeEn}
                </span>
              </div>
              <span className="text-[#93A39C] text-[11px]">{activeModalApp.version}</span>
            </div>

            {/* Description */}
            <p className="text-xs font-sans text-[#93A39C] leading-relaxed">
              {isSpanish ? activeModalApp.descriptionEs : activeModalApp.descriptionEn}
            </p>

            {/* Key Capabilities */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] text-[#687771] uppercase tracking-wider block">
                {isSpanish ? 'COMPONENTES TÉCNICOS' : 'TECHNICAL COMPONENTS'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(isSpanish ? activeModalApp.techEs : activeModalApp.techEn).map((tItem) => (
                  <span
                    key={tItem}
                    className="px-2 py-0.5 border border-[#21312D] bg-[#0A1412] text-[10px] text-[#EFF5ED]"
                  >
                    {tItem}
                  </span>
                ))}
              </div>
            </div>

            {/* Review Status Note */}
            <div className="p-3 border-l-2 border-[#B8EE68] bg-[#0D1816] text-[11px] text-[#93A39C] leading-normal flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B8EE68] shrink-0 mt-0.5" />
              <p>{t('launcher.reviewNote')}</p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end pt-2 border-t border-[#21312D]">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-[#B8EE68] hover:bg-[#CBF58C] text-[#07100F] font-mono text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B8EE68]"
              >
                {t('launcher.understandBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
