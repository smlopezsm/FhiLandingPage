import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera } from 'lucide-react';

export const TeamPhotoFrame: React.FC = () => {
  const { t } = useTranslation();
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <div className="w-full border border-[#21312D] bg-[#0A1613] select-none py-16 sm:py-24 px-6 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 border border-[#21312D] flex items-center justify-center text-[#93A39C]">
          <Camera className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-sm">
          <div className="text-sm font-semibold text-[#EFF5ED]">
            {t('team.photoPlaceholder.title')}
          </div>
          <p className="text-xs text-[#93A39C] leading-relaxed">
            {t('team.photoPlaceholder.note')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <figure className="w-full select-none space-y-3">
      {/* Clean Photo Container: No surrounding black margins, full-bleed to border */}
      <div className="w-full overflow-hidden border border-[#21312D] shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#040908]">
        <picture>
          <source srcSet="/images/team/team-photo.webp" type="image/webp" />
          <source srcSet="/images/team/team-photo.jpg" type="image/jpeg" />
          <img
            src="/images/team/team-photo.webp"
            alt={t('team.photoPlaceholder.caption')}
            onError={() => setImageFailed(true)}
            className="w-full h-auto block"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      {/* Single Non-Repeating Caption Underneath the Photo (Pie de Foto) */}
      <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono text-[#93A39C] px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B8EE68]" />
          <span className="text-[#EFF5ED] font-semibold">
            {t('team.photoPlaceholder.caption')}
          </span>
        </div>
        <span className="text-[#687771] text-[11px]">
          San Luis, Argentina · Parque de la Industria del Conocimiento (PIC)
        </span>
      </figcaption>
    </figure>
  );
};
