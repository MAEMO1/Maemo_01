'use client';

import { LanguageProvider } from './context/LanguageContext';
import { useLenis } from './hooks/useLenis';

function LenisWrapper({ children }) {
  useLenis();
  return children;
}

export function Providers({ children }) {
  return (
    <LanguageProvider>
      <LenisWrapper>
        {children}
      </LenisWrapper>
    </LanguageProvider>
  );
}
