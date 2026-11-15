import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { ScaleComparisonGraphic } from '../visual/ScaleComparisonGraphic';

export const ChallengeSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="challenge"
      aria-label="The Challenge"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1D322C] bg-transparent"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Editorial Heading & Text (Sitting directly on background, max 2 paragraphs) */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-title text-2xl sm:text-4xl font-bold tracking-tight text-[#EFF5ED]">
            {t('challenge.title')}
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#93A39C] leading-relaxed">
            {t('challenge.paragraph1')}
          </p>

          <p className="font-sans text-sm sm:text-base text-[#93A39C] leading-relaxed">
            {t('challenge.paragraph2')}
          </p>

          <div className="pt-2">
            <a
              href="https://www.spaceappschallenge.org/2026/challenges/modis-and-viirs-hot-spots/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B8EE68] hover:underline"
            >
              <span>{t('challenge.officialLink')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Single Clear Visual Comparison */}
        <div className="w-full">
          <ScaleComparisonGraphic />
        </div>
      </div>
    </section>
  );
};
