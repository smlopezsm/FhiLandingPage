import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { PredictionInterfacePreview } from '../visual/PredictionInterfacePreview';
import { EXTERNAL_LINKS } from '../../config/externalLinks';

interface PredictionSectionProps {
  onOpenLauncher?: (appId: 'observation' | 'prediction') => void;
}

export const PredictionSection: React.FC<PredictionSectionProps> = () => {
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
            <a
              href={EXTERNAL_LINKS.predict}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 min-h-[46px] bg-[#06120F]/90 hover:bg-[#0B1E19] active:bg-[#0E251F] text-[#EFF5ED] border border-[#263D36] hover:border-[#FF9C55]/70 font-title font-semibold text-xs sm:text-sm shadow-[0_2px_14px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_20px_rgba(255,156,85,0.2)] backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9C55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040908] group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9C55] opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9C55]"></span>
              </span>
              <span>{t('prediction.cta')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF9C55] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
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
