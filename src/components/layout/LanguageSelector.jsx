import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../utils/cn';

export function LanguageSelector({ className = '', variant = 'light' }) {
  const { language, switchLanguage, languages } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-full',
          'text-sm font-medium',
          'transition-all duration-200',
          variant === 'light'
            ? 'text-white/80 hover:text-white hover:bg-white/10'
            : 'text-text-medium hover:text-text-dark hover:bg-gray-100'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {t(`language.${language}`)}
        <svg
          className={cn(
            'w-3.5 h-3.5 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 py-2',
            'bg-white rounded-xl shadow-lg border border-gray-100',
            'min-w-[100px] z-50',
            'animate-fade-in'
          )}
          role="listbox"
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                switchLanguage(lang);
                setIsOpen(false);
              }}
              className={cn(
                'w-full px-4 py-2 text-left',
                'text-sm font-medium',
                'transition-colors duration-200',
                lang === language
                  ? 'text-coral bg-coral/5'
                  : 'text-text-medium hover:text-text-dark hover:bg-gray-50'
              )}
              role="option"
              aria-selected={lang === language}
            >
              {t(`language.${lang}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
