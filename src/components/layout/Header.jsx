import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { Logo } from '../ui/Logo';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo light />

          <div className="flex items-center gap-3">
            <LanguageSelector />

            <Link
              to="/contact"
              className="hidden md:flex px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-primary hover:bg-white/90 transition-colors"
            >
              {t('nav.contact')}
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
