'use client';

import { createContext, useState, useEffect, useCallback } from 'react';

const LANGUAGES = ['en', 'nl', 'fr'];
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'maemo-language';

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Start with default language for SSR
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setMounted(true);

    // Only use stored preference, don't auto-detect browser language
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES.includes(stored)) {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const switchLanguage = useCallback((lang) => {
    if (LANGUAGES.includes(lang)) {
      setLanguage(lang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}
