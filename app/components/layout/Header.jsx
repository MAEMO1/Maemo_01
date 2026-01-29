'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../../hooks/useTranslation';
import { Logo } from '../ui/Logo';
import { LanguageSelector } from './LanguageSelector';

// Routes with dark backgrounds at the top
const DARK_ROUTES = ['/contact'];

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Check if current route has dark background
  const isDarkPage = DARK_ROUTES.includes(pathname);

  // Use light colors when on dark page
  const useLightColors = isDarkPage;

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;

          // Update scrolled state for glassmorphism
          setScrolled(currentScrollY > 50);

          // Silent Gatekeeper: hide on scroll down, show on scroll up
          // Only trigger after scrolling past 100px to avoid jitter at top
          if (currentScrollY > 100) {
            if (scrollDelta > 8) {
              // Scrolling down - hide header
              setVisible(false);
            } else if (scrollDelta < -5) {
              // Scrolling up - show header
              setVisible(true);
            }
          } else {
            // Always show at top of page
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

  // Dynamic colors based on background
  const textColor = useLightColors ? '#ffffff' : '#1e293b';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all ${
          scrolled
            ? 'px-4 sm:px-6 py-3 sm:py-4'
            : 'px-4 sm:px-6 py-4 sm:py-6'
        }`}
        style={{
          background: scrolled
            ? isDarkPage
              ? 'rgba(15, 23, 42, 0.85)'
              : 'rgba(255, 255, 255, 0.8)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? isDarkPage
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.04)'
            : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transitionProperty: 'transform, background, backdrop-filter, padding, border',
          transitionDuration: visible ? '0.3s' : '0.4s',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo light={useLightColors} />

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Language selector - hidden on mobile (handled by BottomNav) */}
            <div className="hidden md:block">
              <LanguageSelector variant={useLightColors ? 'light' : 'dark'} />
            </div>

            {/* Contact link - hidden on mobile (handled by BottomNav) */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 text-sm font-medium transition-all duration-300"
              style={{
                color: textColor,
                letterSpacing: '0.1em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e85d4c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = textColor;
              }}
            >
              <span>{t('nav.contact')}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
