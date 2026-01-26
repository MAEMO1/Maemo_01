import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../utils/cn';

export function InvitationMessage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Invitation Badge */}
      <div
        className={cn(
          'inline-block px-6 py-3 mb-8 rounded-full',
          'bg-coral/10',
          'opacity-0 animate-fade-in-up'
        )}
      >
        <span className="text-sm uppercase tracking-wide text-coral font-semibold">
          {t('contact.invitation')}
        </span>
      </div>

      {/* Message */}
      <p
        className={cn(
          'text-lg md:text-xl',
          'text-text-medium leading-relaxed mb-8',
          'opacity-0 animate-fade-in-up'
        )}
        style={{ animationDelay: '100ms' }}
      >
        {t('contact.message')}
      </p>

      {/* Disclaimer */}
      <p
        className={cn(
          'text-sm text-text-muted italic mb-12',
          'opacity-0 animate-fade-in-up'
        )}
        style={{ animationDelay: '200ms' }}
      >
        {t('contact.disclaimer')}
      </p>

      {/* Contact Card */}
      <div
        className={cn(
          'bg-gray-50 rounded-3xl p-8 md:p-12',
          'opacity-0 animate-fade-in-up'
        )}
        style={{ animationDelay: '300ms' }}
      >
        {/* Email */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-text-muted font-semibold mb-3">
            {t('contact.emailLabel')}
          </p>
          <a
            href={`mailto:${t('contact.email')}`}
            className={cn(
              'font-bold text-2xl md:text-3xl text-coral',
              'hover:text-coral-dark transition-colors duration-300'
            )}
          >
            {t('contact.email')}
          </a>
        </div>

        {/* Location */}
        <div>
          <p className="text-xs uppercase tracking-wide text-text-muted font-semibold mb-3">
            Location
          </p>
          <p className="text-xl text-text-dark font-medium">
            {t('contact.location')}
          </p>
        </div>
      </div>
    </div>
  );
}
