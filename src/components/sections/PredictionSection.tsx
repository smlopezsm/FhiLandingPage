import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { PredictionInterfacePreview } from '../visual/PredictionInterfacePreview';

interface PredictionSectionProps {
  onOpenLauncher: (appId: 'observation' | 'prediction') => void;
}

export const PredictionSection: React.FC<PredictionSectionProps> = ({ onOpenLauncher }) => {
  const { t } = useTranslation();

  return (
    <section
      id="prediction"
      aria-label="Prediction App"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1D322C] bg-transparent"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Editorial Heading & Text */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-title text-2xl sm:text-4xl font-bold tracking-tight text-[#EFF5ED]">
            {t('prediction.title')}
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#93A39C] leading-relaxed">
            {t('prediction.paragraph1')}
          </p>

          <p className="font-sans text-sm sm:text-base text-[#93A39C] leading-relaxed">
            {t('prediction.paragraph2')}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenLauncher('prediction')}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#0C1E1A]/95 hover:bg-[#122B25] text-[#EFF5ED] border border-[#FF9C55]/80 hover:border-[#FF9C55] font-title font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,156,85,0.22)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9C55] group"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF9C55] animate-pulse-subtle" />
              <span>{t('prediction.cta')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF9C55] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Prediction Interface Visual Protagonist */}
        <div className="w-full">
          <PredictionInterfacePreview />
        </div>
      </div>
    </section>
  );
};
