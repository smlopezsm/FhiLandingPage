import React from 'react';
import { useTranslation } from 'react-i18next';

export const PredictionInterfacePreview: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language.startsWith('es');

  return (
    <div className="w-full border border-[#21312D] bg-[#0A1613] select-none font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#21312D] bg-[#0D1B17] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF9C55]" />
          <span className="text-[#EFF5ED] font-semibold">
            {isSpanish ? 'Predicción de Incendios · Modelo Complementario' : 'Fire Prediction App · Companion System'}
          </span>
        </div>
        <span className="text-[#FF9C55] text-[11px] font-mono">
          {t('prediction.status')}
        </span>
      </div>

      {/* Interface Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
        {/* Risk Map (7 cols) */}
        <div className="md:col-span-7 p-5 flex items-center justify-center bg-[#07100F] border-b md:border-b-0 md:border-r border-[#21312D]">
          <div className="relative aspect-[4/3] w-full max-w-[280px] bg-[#0A1613] border border-[#21312D] p-3 flex items-center justify-center">
            <svg viewBox="0 0 200 180" className="w-full h-full" aria-hidden="true">
              {/* Argentina silhouette */}
              <path
                d="M 95 15 Q 120 30 130 65 Q 120 105 110 140 Q 102 170 98 175 Q 94 150 92 120 Q 88 80 95 15 Z"
                fill="#0E241E"
                stroke="#1D3E33"
                strokeWidth="1"
              />

              {/* Risk zone circles */}
              <circle cx="108" cy="80" r="22" fill="#FF9C55" fillOpacity="0.25" stroke="#FF9C55" strokeWidth="1" strokeDasharray="3 3" />
              <text x="108" y="83" textAnchor="middle" fill="#FF9C55" fontSize="7" fontFamily="DM Mono, monospace">
                {isSpanish ? 'ZONA 1 · RIESGO ALTO' : 'ZONE 1 · HIGH RISK'}
              </text>

              <circle cx="104" cy="115" r="18" fill="#FF6759" fillOpacity="0.3" stroke="#FF6759" strokeWidth="1" />
              <text x="104" y="118" textAnchor="middle" fill="#EFF5ED" fontSize="7" fontFamily="DM Mono, monospace">
                {isSpanish ? 'ZONA 2 · CRÍTICO' : 'ZONE 2 · CRITICAL'}
              </text>
            </svg>

            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[#687771]">
              {isSpanish ? 'Zonificación de Riesgo' : 'Risk Zoning Grid'}
            </div>
          </div>
        </div>

        {/* Environmental Indicators (5 cols) */}
        <div className="md:col-span-5 p-5 flex flex-col justify-between space-y-3 bg-[#0A1613] text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[#93A39C] text-[11px] block">
              {isSpanish ? 'Variables Ambientales' : 'Environmental Telemetry'}
            </span>
            <div className="text-[#EFF5ED] font-bold">
              {isSpanish ? 'Parámetros de Riesgo' : 'Vulnerability Metrics'}
            </div>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between p-2 bg-[#07100F] border border-[#21312D]">
              <span className="text-[#93A39C]">{isSpanish ? 'Humedad de Combustible' : 'Fuel Moisture'}</span>
              <span className="text-[#FF9C55] font-semibold">14% (Déficit)</span>
            </div>
            <div className="flex justify-between p-2 bg-[#07100F] border border-[#21312D]">
              <span className="text-[#93A39C]">{isSpanish ? 'Velocidad de Viento' : 'Wind Speed'}</span>
              <span className="text-[#EFF5ED] font-semibold">35 km/h</span>
            </div>
            <div className="flex justify-between p-2 bg-[#07100F] border border-[#21312D]">
              <span className="text-[#93A39C]">{isSpanish ? 'Índice de Peligro' : 'Danger Index'}</span>
              <span className="text-[#FF6759] font-semibold">{isSpanish ? 'Elevado' : 'Elevated'}</span>
            </div>
          </div>

          <div className="text-[11px] text-[#687771] pt-1">
            {isSpanish
              ? 'Modelado prospectivo de condiciones ambientales'
              : 'Forward-looking modeling of environmental conditions'}
          </div>
        </div>
      </div>

      {/* Caption Footnote */}
      <div className="px-4 py-2 border-t border-[#21312D] bg-[#07100F] text-xs text-[#93A39C]">
        {t('prediction.caption')}
      </div>
    </div>
  );
};
