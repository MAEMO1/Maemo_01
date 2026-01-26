import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../utils/cn';

export function LanguageSelector({ className = '', variant = 'dark' }) {
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
          'flex items-center gap-1.5 px-2 py-1.5',
          'text-sm',
          'transition-all duration-300',
          variant === 'light'
            ? 'text-white/80 hover:text-white'
            : 'text-slate-500 hover:text-slate-800'
        )}
        style={{ letterSpacing: '0.05em' }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {language.toUpperCase()}
        <svg
          className={cn(
            'w-3 h-3 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 py-1.5',
            'bg-white rounded-lg',
            'min-w-[80px] z-50'
          )}
          style={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
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
                'text-sm',
                'transition-colors duration-200',
                lang === language
                  ? 'text-slate-800'
                  : 'text-slate-400 hover:text-slate-800'
              )}
              style={{ letterSpacing: '0.05em' }}
              role="option"
              aria-selected={lang === language}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
