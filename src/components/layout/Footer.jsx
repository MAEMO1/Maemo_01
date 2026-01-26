import { useTranslation } from '../../hooks/useTranslation';
import { Logo } from '../ui/Logo';
import { cn } from '../../utils/cn';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-t border-gray-100',
        'py-16 px-6 md:px-12 pb-32',
        'bg-white'
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Logo linkTo={null} variant="dark" />
            <p className="text-sm text-text-light">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-muted">
            {currentYear} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
