import { createContext, useState, useEffect, useCallback } from 'react';

const LANGUAGES = ['en', 'nl', 'fr'];
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'maemo-language';

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Initialize from localStorage or browser preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && LANGUAGES.includes(stored)) return stored;

      // Check browser language
      const browserLang = navigator.language.split('-')[0];
      if (LANGUAGES.includes(browserLang)) return browserLang;
    }

    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

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
