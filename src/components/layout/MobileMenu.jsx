import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../hooks/useLanguage';
import { Logo } from '../ui/Logo';

export function MobileMenu({ isOpen, onClose }) {
  const { t } = useTranslation();
  const { language, switchLanguage, languages } = useLanguage();
  const { pathname } = useLocation();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on route change
  useEffect(() => { onClose(); }, [pathname, onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/approach', label: t('nav.approach') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-white transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Logo linkTo={null} />
          <button
            onClick={onClose}
            className="p-2 rounded-full text-text-medium hover:text-text-dark hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <ul className="space-y-2">
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`block py-4 text-2xl font-medium transition-colors ${
                    pathname === path ? 'text-coral' : 'text-text-dark hover:text-coral'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
          <p className="text-xs uppercase tracking-wide text-text-light mb-3 font-medium">
            {t('language.select')}
          </p>
          <div className="flex gap-4">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`text-sm font-semibold uppercase transition-colors ${
                  lang === language ? 'text-coral' : 'text-text-medium hover:text-text-dark'
                }`}
              >
                {t(`language.${lang}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
