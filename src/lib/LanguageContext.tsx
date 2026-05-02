"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Lang, TranslationKey, getTranslation } from './translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bn');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && (saved === 'bn' || saved === 'en')) {
      setLangState(saved);
    } else {
      // No user preference — fetch default from site config
      fetch('/data/site-config.json')
        .then(res => res.json())
        .then(config => {
          const defaultLang = config.defaultLanguage as Lang;
          if (defaultLang === 'bn' || defaultLang === 'en') {
            setLangState(defaultLang);
          }
        })
        .catch(() => {}); // silently fall back to 'bn'
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  }, []);

  const t = useCallback((key: TranslationKey) => {
    return getTranslation(lang, key);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
