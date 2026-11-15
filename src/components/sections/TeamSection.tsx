import React from 'react';
import { useTranslation } from 'react-i18next';
import { TeamPhotoFrame } from '../visual/TeamPhotoFrame';

interface TeamMember {
  name: string;
  role: string;
}

export const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  const members = (t('team.members', { returnObjects: true }) || []) as TeamMember[];

  return (
    <section
      id="team"
      aria-label={t('team.title')}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1D322C] bg-transparent"
    >
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        {/* Editorial Heading & Text (Directly on background) */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-title text-2xl sm:text-4xl font-bold tracking-tight text-[#EFF5ED]">
            {t('team.title')}
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#93A39C] leading-relaxed">
            {t('team.description')}
          </p>
        </div>

        {/* Clean Typographic Team Roster: 6 Interdisciplinary Members */}
        {Array.isArray(members) && members.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="border-t border-[#1D322C] pt-3.5 space-y-1"
              >
                <div className="font-title font-semibold text-base sm:text-lg text-[#EFF5ED] tracking-tight">
                  {member.name}
                </div>
                <div className="font-sans text-xs sm:text-sm text-[#93A39C] leading-snug">
                  {member.role}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Photo Frame Protagonist */}
        <div className="w-full pt-2">
          <TeamPhotoFrame />
        </div>
      </div>
    </section>
  );
};
