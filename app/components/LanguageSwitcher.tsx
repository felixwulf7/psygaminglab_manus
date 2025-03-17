'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Language, languages, availableLanguages } from '../config/languages';

interface LanguageSwitcherProps {
  currentLang: Language;
  className?: string;
}

export default function LanguageSwitcher({ currentLang, className = '' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Function to get the equivalent path in another language
  const getLanguagePath = (lang: Language) => {
    // Replace the language segment in the path
    return pathname.replace(`/${currentLang}/`, `/${lang}/`);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-1">{languages[currentLang].flag}</span>
        <span className="hidden sm:inline">{languages[currentLang].name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-md shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            {availableLanguages.map((lang) => (
              <Link
                key={lang}
                href={getLanguagePath(lang)}
                className={`flex items-center px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                  lang === currentLang ? 'bg-neutral-100 dark:bg-neutral-700' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2">{languages[lang].flag}</span>
                <span>{languages[lang].name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
