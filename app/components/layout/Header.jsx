'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../../hooks/useTranslation';
import { Logo } from '../ui/Logo';
import { LanguageSelector } from './LanguageSelector';

const DARK_ROUTES = ['/contact'];

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const isDarkPage = DARK_ROUTES.includes(pathname);
  const useLightColors = isDarkPage;

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;

          setScrolled(currentScrollY > 50);

          if (currentScrollY > 100) {
            if (scrollDelta > 8) {
              setVisible(false);
            } else if (scrollDelta < -5) {
              setVisible(true);
            }
          } else {
            setVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = useLightColors ? '#ffffff' : '#0f172a';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4 md:py-6"
      style={{
        background: scrolled
          ? isDarkPage
            ? 'rgba(15, 23, 42, 0.95)'
            : 'rgba(255, 255, 255, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease, background 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo light={useLightColors} />

        <div className="flex items-center gap-6">
          <LanguageSelector variant={useLightColors ? 'light' : 'dark'} />

          {pathname !== '/contact' && (
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 text-sm font-medium"
              style={{ color: textColor }}
            >
              <span>{t('nav.contact')}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
