import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { PlatformInterfacePreview } from '../visual/PlatformInterfacePreview';
import { EXTERNAL_LINKS } from '../../config/externalLinks';

interface SolutionSectionProps {
  onOpenLauncher?: (appId: 'observation' | 'prediction') => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = () => {
  const { t } = useTranslation();

  return (
    <section
      id="solution"
      aria-label="Our Solution"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1D322C] bg-transparent"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Editorial Heading & Text */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-title text-2xl sm:text-4xl font-bold tracking-tight text-[#EFF5ED]">
            {t('solution.title')}
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#93A39C] leading-relaxed">
            {t('solution.paragraph1')}
          </p>

          <p className="font-sans text-sm sm:text-base text-[#93A39C] leading-relaxed">
            {t('solution.paragraph2')}
          </p>

          <div className="pt-2">
            <a
              href={EXTERNAL_LINKS.fhi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#B8EE68] hover:bg-[#C8F77B] text-[#071310] font-title font-bold text-xs sm:text-sm border border-[#B8EE68] shadow-[0_0_20px_rgba(184,238,104,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8EE68] group"
            >
              <span>{t('solution.cta')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#071310] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Real Interface Visual Protagonist */}
        <div className="w-full">
          <PlatformInterfacePreview />
        </div>
      </div>
    </section>
  );
};
