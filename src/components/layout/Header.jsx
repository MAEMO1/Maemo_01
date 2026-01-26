import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { Logo } from '../ui/Logo';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';

// Routes with dark backgrounds at the top
const DARK_ROUTES = ['/contact'];

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if current route has dark background
  const isDarkPage = DARK_ROUTES.includes(location.pathname);

  // Use light colors when on dark page (always, since header stays dark-themed)
  const useLightColors = isDarkPage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic colors based on background
  const textColor = useLightColors ? '#ffffff' : '#1e293b';
  const textColorMuted = useLightColors ? 'rgba(255,255,255,0.7)' : '#64748b';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          padding: scrolled ? '1rem 1.5rem' : '1.5rem 1.5rem',
          background: scrolled
            ? isDarkPage
              ? 'rgba(17, 24, 39, 0.95)'
              : 'rgba(255, 255, 255, 0.9)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? isDarkPage
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,0,0,0.05)'
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo light={useLightColors} />

          <div className="flex items-center gap-6">
            <LanguageSelector variant={useLightColors ? 'light' : 'dark'} />

            <Link
              to="/contact"
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

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: textColor }}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
