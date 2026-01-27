'use client';

import { useMemo } from 'react';
import { useLanguage } from './useLanguage';
import en from '../i18n/en.json';
import nl from '../i18n/nl.json';
import fr from '../i18n/fr.json';

const translations = { en, nl, fr };

export function useTranslation() {
  const { language } = useLanguage();

  const t = useMemo(() => {
    const currentTranslations = translations[language] || translations.en;

    return (key, params = {}) => {
      // Support nested keys: "home.hero.tagline"
      const value = key.split('.').reduce(
        (obj, k) => obj?.[k],
        currentTranslations
      );

      if (value === undefined) {
        console.warn(`Translation missing: ${key}`);
        return key;
      }

      // Simple parameter interpolation: "Hello {{name}}"
      return Object.entries(params).reduce(
        (str, [param, val]) => str.replace(`{{${param}}}`, val),
        value
      );
    };
  }, [language]);

  return { t, language };
}
