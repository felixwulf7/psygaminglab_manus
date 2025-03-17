export const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    dir: 'ltr',
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    dir: 'ltr',
  },
};

export type Language = keyof typeof languages;
export const defaultLanguage: Language = 'en';
export const availableLanguages = Object.keys(languages) as Language[];

export function isValidLanguage(lang: string): lang is Language {
  return availableLanguages.includes(lang as Language);
}
