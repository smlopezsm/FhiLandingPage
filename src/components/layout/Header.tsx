import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = i18n.language.startsWith('es') ? 'es' : 'en';

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', nextLang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.challenge'), href: '#challenge' },
    { label: t('nav.solution'), href: '#solution' },
    { label: t('nav.prediction'), href: '#prediction' },
    { label: t('nav.team'), href: '#team' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#07100F]/90 backdrop-blur-md border-b border-[#21312D] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:underline"
          >
            <img
              src="/images/logo-fhi.png"
              alt="Fire History Interface"
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
            <span className="font-title text-base sm:text-lg font-bold tracking-tight text-[#EFF5ED]">
              FHI <span className="text-[#B8EE68] font-normal text-xs sm:text-sm font-mono">Fire History Interface</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#93A39C]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#EFF5ED] transition-colors focus:outline-none focus-visible:text-[#B8EE68]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs font-mono text-[#93A39C] hover:text-[#EFF5ED] border border-[#21312D] hover:border-[#B8EE68]/50 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B8EE68]"
              aria-label={`Switch to ${currentLang === 'en' ? 'Spanish' : 'English'}`}
            >
              {currentLang === 'en' ? 'ES' : 'EN'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#93A39C] hover:text-[#EFF5ED] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07100F] border-b border-[#21312D] px-6 py-4 space-y-3 text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-[#93A39C] hover:text-[#EFF5ED]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
