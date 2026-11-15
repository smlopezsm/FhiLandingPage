import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera } from 'lucide-react';

export const TeamPhotoFrame: React.FC = () => {
  const { t } = useTranslation();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const photoPath = '/images/team-photo.webp';

  useEffect(() => {
    const img = new Image();
    img.src = photoPath;
    img.onload = () => {
      setImageLoaded(true);
      setImageFailed(false);
    };
    img.onerror = () => {
      setImageFailed(true);
      setImageLoaded(false);
    };
  }, [photoPath]);

  return (
    <div className="w-full border border-[#21312D] bg-[#0A1613] select-none">
      {imageLoaded && !imageFailed ? (
        /* Actual Group Photograph */
        <div className="p-3 sm:p-4">
          <img
            src={photoPath}
            alt="Team FHI (Fire History Interface) · NASA Space Apps Challenge 2026"
            className="w-full h-auto object-cover max-h-[550px] border border-[#21312D]"
          />
          <div className="pt-2.5 text-xs text-[#93A39C] font-mono">
            {t('team.photoPlaceholder.caption')}
          </div>
        </div>
      ) : (
        /* Clean Editorial Placeholder */
        <div className="py-16 sm:py-24 px-6 flex flex-col items-center justify-center text-center space-y-4 bg-[#07100F]">
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

          <div className="text-[11px] font-mono text-[#687771] pt-1">
            Target: /images/team-photo.webp
          </div>
        </div>
      )}
    </div>
  );
};
