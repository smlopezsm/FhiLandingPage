import React from 'react';
import { useTranslation } from 'react-i18next';

export const ScaleComparisonGraphic: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full border border-[#21312D] bg-[#0A1613] p-6 sm:p-8 space-y-4 select-none">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
        {/* MODIS 1 km footprint containing VIIRS 375 m sub-pixels */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 border-2 border-[#68D9D0] bg-[#68D9D0]/5 p-2 grid grid-cols-3 grid-rows-3 gap-1.5 shadow-sm">
          {/* Label on top */}
          <div className="absolute -top-3 left-3 px-2 py-0.5 bg-[#07100F] border border-[#68D9D0] text-[10px] font-mono font-bold text-[#68D9D0]">
            {t('challenge.modisLabel')}
          </div>

          {/* VIIRS sub-pixels */}
          {Array.from({ length: 9 }).map((_, idx) => {
            const isFireDetection = idx === 1 || idx === 4 || idx === 5;
            return (
              <div
                key={idx}
                className={`border text-[10px] font-mono flex items-center justify-center transition-colors ${
                  isFireDetection
                    ? 'border-[#FF9C55] bg-[#FF9C55]/20 text-[#EFF5ED] font-semibold'
                    : 'border-[#21312D] text-[#687771]'
                }`}
              >
                {isFireDetection ? 'VIIRS' : ''}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="space-y-3 text-xs font-mono max-w-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 border border-[#68D9D0] bg-[#68D9D0]/20" />
            <span className="text-[#EFF5ED]">{t('challenge.modisLabel')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 border border-[#FF9C55] bg-[#FF9C55]/20" />
            <span className="text-[#EFF5ED]">{t('challenge.viirsLabel')}</span>
          </div>
          <p className="text-[#93A39C] text-[11px] leading-relaxed pt-1">
            {t('challenge.scaleNote')}
          </p>
        </div>
      </div>
    </div>
  );
};
