'use client';

import { useTranslation } from '../../hooks/useTranslation';
import { Logo } from '../ui/Logo';
import { cn } from '../../utils/cn';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white overflow-hidden">
      {/* Main footer content */}
      <div
        className={cn(
          'border-t border-gray-100',
          'py-12 sm:py-16 px-4 sm:px-6 md:px-12',
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Logo and Tagline */}
            <div className="flex flex-col items-center md:items-start gap-2 sm:gap-3">
              <Logo linkTo={null} variant="dark" />
              <p className="text-xs sm:text-sm text-text-light text-center md:text-left">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Copyright */}
            <p className="text-xs sm:text-sm text-text-muted text-center md:text-right">
              {currentYear} {t('footer.copyright').split('maemo').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <strong className="font-bold">maemo</strong>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Giant logo at bottom - Jeton style with fixed overflow issue */}
      <div className="relative h-[150px] sm:h-[200px] md:h-[300px] flex items-end justify-center overflow-hidden">
        <span
          className="select-none lowercase text-center"
          style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            // Fixed: min value now scales with viewport to prevent overflow on small screens
            fontSize: 'clamp(min(140px, 45vw), 35vw, 400px)',
            letterSpacing: '-0.04em',
            fontWeight: 800,
            color: '#e85d4c',
            lineHeight: 0.8,
            transform: 'translateY(25%)',
          }}
        >
          maemo
        </span>
      </div>
    </footer>
  );
}
