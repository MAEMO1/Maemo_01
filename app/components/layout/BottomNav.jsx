'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../hooks/useLanguage';

export function BottomNav() {
  const { t } = useTranslation();
  const { language, switchLanguage, languages } = useLanguage();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 100;

      setVisible(!scrollingDown);
      setLastScrollY(currentScrollY);

      // Close language menu on scroll
      if (scrollingDown) setLangMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close language menu on route change
  useEffect(() => {
    setLangMenuOpen(false);
  }, [pathname]);

  const navItems = [
    {
      path: '/',
      label: t('nav.home'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      path: '/contact',
      label: t('nav.contact'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  const nextLanguage = languages.find(l => l !== language) || languages[0];

  return (
    <>
      {/* Language popup menu */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 md:hidden ${
          langMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div
          className="flex gap-2 p-2 rounded-2xl"
          style={{
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                switchLanguage(lang);
                setLangMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold uppercase transition-all duration-200 min-h-[44px] min-w-[44px] ${
                lang === language
                  ? 'bg-white text-ink'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom navigation bar */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="px-4 pb-3 pt-2">
          <div
            className="flex items-center justify-around py-2 px-4"
            style={{
              background: 'linear-gradient(135deg, #e85d4c 0%, #d44a3a 100%)',
              borderRadius: '9999px',
              boxShadow: '0 4px 20px rgba(232, 93, 76, 0.4), 0 8px 32px rgba(0,0,0,0.15)',
              height: '56px',
            }}
          >
            {navItems.map(({ path, label, icon }) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className="flex flex-col items-center justify-center gap-0.5 px-4 py-1 rounded-full transition-all duration-200 min-w-[64px] min-h-[44px]"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color: 'white',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <div
                    className="transition-transform duration-200"
                    style={{ transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    {icon}
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wide opacity-90">
                    {label}
                  </span>
                </Link>
              );
            })}

            {/* Language toggle button */}
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex flex-col items-center justify-center gap-0.5 px-4 py-1 rounded-full transition-all duration-200 min-w-[64px] min-h-[44px]"
              style={{
                background: langMenuOpen ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
              }}
            >
              <div
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-white/80 text-xs font-bold transition-transform duration-200"
                style={{ transform: langMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                {language.toUpperCase().charAt(0)}
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wide opacity-90">
                {language.toUpperCase()}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
