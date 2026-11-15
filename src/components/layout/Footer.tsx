import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-transparent border-t border-[#1D322C] text-[#93A39C] pt-14 pb-12 px-4 sm:px-6 lg:px-8 text-xs font-sans relative z-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-[#1D322C]">
          {/* Col 1: Identity & Mission (md:col-span-5) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo-fhi.png"
                alt="Fire History Interface"
                className="h-7 w-7 shrink-0 rounded-full object-cover"
              />
              <span className="font-title text-base font-bold text-[#EFF5ED] tracking-tight">
                FHI <span className="text-[#93A39C] font-normal">· Fire History Interface</span>
              </span>
            </div>

            <p className="text-xs text-[#93A39C] leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#091714] border border-[#213530] text-[11px] font-mono text-[#B8EE68]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8EE68] animate-pulse-subtle" />
              <span>{t('hero.agency')}</span>
            </div>
          </div>

          {/* Col 2: Navigation Index (md:col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#EFF5ED] font-bold block">
              // {t('footer.navTitle')}
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#challenge" className="text-[#93A39C] hover:text-[#EFF5ED] hover:underline transition-colors flex items-center gap-1.5">
                  <span>{t('nav.challenge')}</span>
                </a>
              </li>
              <li>
                <a href="#solution" className="text-[#93A39C] hover:text-[#EFF5ED] hover:underline transition-colors flex items-center gap-1.5">
                  <span>{t('nav.solution')}</span>
                </a>
              </li>
              <li>
                <a href="#prediction" className="text-[#93A39C] hover:text-[#EFF5ED] hover:underline transition-colors flex items-center gap-1.5">
                  <span>{t('nav.prediction')}</span>
                </a>
              </li>
              <li>
                <a href="#team" className="text-[#93A39C] hover:text-[#EFF5ED] hover:underline transition-colors flex items-center gap-1.5">
                  <span>{t('nav.team')}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sensors & Official Challenge (md:col-span-4) */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#EFF5ED] font-bold block">
              // {t('footer.sensorsTitle')}
            </span>

            <ul className="space-y-2 text-xs font-mono text-[#93A39C]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#68D9D0]" />
                <span>{t('footer.modisSpec')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9C55]" />
                <span>{t('footer.viirsSpec')}</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://www.spaceappschallenge.org/2026/challenges/modis-and-viirs-hot-spots/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B8EE68] hover:text-[#CBF58C] hover:underline"
              >
                <span>{t('footer.challengeLink')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Disclaimer & Credits */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[#687771] pt-2">
          <p className="max-w-2xl leading-relaxed">
            {t('footer.disclaimer')}
          </p>

          <p className="shrink-0 font-mono text-[#93A39C]">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
