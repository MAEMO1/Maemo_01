import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { Logo } from '../ui/Logo';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          padding: scrolled ? '1rem 1.5rem' : '1.5rem 1.5rem',
          background: scrolled
            ? 'rgba(255, 255, 255, 0.9)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-6">
            <LanguageSelector />

            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 text-sm font-medium transition-all duration-300"
              style={{
                color: '#1e293b',
                letterSpacing: '0.1em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e85d4c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#1e293b';
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
              style={{ color: '#1e293b' }}
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
