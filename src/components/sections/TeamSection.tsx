import React from 'react';
import { useTranslation } from 'react-i18next';
import { TeamPhotoFrame } from '../visual/TeamPhotoFrame';

export const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="team"
      aria-label="Our Team"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1D322C] bg-transparent"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Editorial Heading & Text (Directly on background) */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-title text-2xl sm:text-4xl font-bold tracking-tight text-[#EFF5ED]">
            {t('team.title')}
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#93A39C] leading-relaxed">
            {t('team.description')}
          </p>
        </div>

        {/* Team Photo Frame Protagonist */}
        <div className="w-full">
          <TeamPhotoFrame />
        </div>
      </div>
    </section>
  );
};
