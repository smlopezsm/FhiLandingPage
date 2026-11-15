import React from 'react';
import { useTranslation } from 'react-i18next';

export const PlatformInterfacePreview: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language.startsWith('es');

  const months = isSpanish
    ? ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
    : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const sampleYears = [
    { year: '2001', counts: [120, 80, 45, 30, 20, 15, 60, 240, 480, 310, 190, 140], estimated: true },
    { year: '2005', counts: [150, 95, 60, 40, 25, 20, 90, 380, 720, 410, 230, 160], estimated: true },
    { year: '2010', counts: [210, 130, 80, 50, 30, 25, 110, 510, 980, 560, 320, 220], estimated: true },
    { year: '2015', counts: [190, 115, 75, 45, 30, 25, 130, 520, 940, 530, 290, 195], estimated: false },
    { year: '2020', counts: [410, 280, 190, 120, 80, 60, 280, 1680, 2450, 1120, 680, 420], estimated: false },
    { year: '2024', counts: [220, 140, 85, 55, 35, 30, 140, 620, 1050, 590, 310, 210], estimated: false },
  ];

  return (
    <div className="w-full border border-[#21312D] bg-[#0A1613] select-none">
      {/* Top Application Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#21312D] bg-[#0D1B17] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B8EE68]" />
          <span className="text-[#EFF5ED] font-semibold">FHI (Fire History Interface) · Observación y Análisis</span>
        </div>
        <span className="text-[#93A39C] text-[11px] hidden sm:inline">Argentina · MODIS & VIIRS</span>
      </div>

      {/* Interface Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left: 3D Satellite Map (6 cols) */}
        <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-[#21312D] p-5 flex flex-col justify-between bg-[#07100F]">
          <div className="flex items-center justify-between text-xs font-mono text-[#93A39C]">
            <span>Visor Geoespacial 3D</span>
            <span className="text-[#B8EE68]">Focos Activos</span>
          </div>

          {/* Map Graphic */}
          <div className="relative aspect-square max-w-[280px] mx-auto my-3 flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-[#21312D] bg-gradient-to-tr from-[#07100F] via-[#0E241E] to-[#163D31] relative overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-85" aria-hidden="true">
                {/* Continent silhouette */}
                <path
                  d="M 90 20 Q 115 35 130 65 Q 140 100 125 140 Q 110 175 102 195 Q 95 170 90 135 Q 85 90 90 20 Z"
                  fill="#0E211B"
                  stroke="#1D3830"
                  strokeWidth="1"
                />
                {/* Argentina highlight */}
                <path
                  d="M 95 105 Q 110 115 115 135 Q 110 160 104 190 Q 98 170 96 140 Q 94 120 95 105 Z"
                  fill="#183E34"
                  stroke="#B8EE68"
                  strokeWidth="1.2"
                />
                {/* Fire spots */}
                <circle cx="102" cy="125" r="3" fill="#FF6759" />
                <circle cx="108" cy="132" r="2.5" fill="#FF9C55" />
                <circle cx="100" cy="115" r="2" fill="#FF6759" />
                <circle cx="104" cy="148" r="2" fill="#FF9C55" />
              </svg>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#687771] flex justify-between">
            <span>Proyección Esférica</span>
            <span>Escala Armonizada</span>
          </div>
        </div>

        {/* Right: Historical Matrix & Anomalies (6 cols) */}
        <div className="lg:col-span-6 p-5 flex flex-col justify-between space-y-4 bg-[#0A1613]">
          {/* Anomaly Indicator */}
          <div className="space-y-1.5 border-b border-[#21312D] pb-3 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#93A39C]">Diagnóstico de Anomalía</span>
              <span className="text-[#B8EE68]">Normal (Percentil 48%)</span>
            </div>
            <div className="h-2 w-full bg-[#111E1B] border border-[#21312D] flex">
              <div className="w-1/4 bg-[#68D9D0]/30" />
              <div className="w-1/4 bg-[#B8EE68]" />
              <div className="w-1/4 bg-[#FF9C55]" />
              <div className="w-1/4 bg-[#FF6759]" />
            </div>
          </div>

          {/* Historical Matrix Table */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-[#93A39C]">
              <span>Matriz Mensual (2000–2026)</span>
              <span className="text-[10px] text-[#687771]">Rayado = Estimado</span>
            </div>

            <div className="overflow-x-auto border border-[#21312D] bg-[#07100F]">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="border-b border-[#21312D] text-[#687771]">
                    <th className="p-1 text-left font-mono font-normal">Año</th>
                    {months.map((m) => (
                      <th key={m} className="p-1 text-center font-mono font-normal">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleYears.map((row) => (
                    <tr key={row.year} className="border-b border-[#21312D]/40">
                      <td className="p-1 font-bold text-[#93A39C] font-mono">{row.year}</td>
                      {row.counts.map((val, idx) => (
                        <td
                          key={idx}
                          className={`p-1 text-center font-mono text-[9px] ${
                            row.estimated
                              ? 'pattern-estimado text-[#EFF5ED]/80'
                              : val > 1000
                              ? 'bg-[#FF6759]/30 text-[#EFF5ED] font-bold'
                              : val > 400
                              ? 'bg-[#FF9C55]/20 text-[#EFF5ED]'
                              : 'text-[#93A39C]'
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#687771] pt-1">
            Diferenciación explícita de observaciones directas y estimaciones
          </div>
        </div>
      </div>

      {/* Caption Footnote */}
      <div className="px-4 py-2 border-t border-[#21312D] bg-[#07100F] text-xs text-[#93A39C] font-sans">
        {t('solution.caption')}
      </div>
    </div>
  );
};
