'use client';

import { useTranslation } from '../../hooks/useTranslation';
import { Logo } from '../ui/Logo';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo linkTo={null} variant="dark" />
            
            <p className="text-sm text-stone">
              {currentYear} {t('footer.copyright').split('maemo').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="font-semibold text-ink">maemo</span>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
