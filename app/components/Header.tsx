'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { Language } from '../config/languages';
import { serviceIds } from '../config/services';
import { getServiceSlug, getServiceName, getTranslation, TranslationKey } from '../utils/translations';

interface HeaderProps {
  lang: Language;
}

export default function Header({ lang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const t = (key: TranslationKey) => getTranslation(key, lang);

  return (
    <header className="bg-white dark:bg-neutral-900 shadow-sm sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center">
          <div className="relative h-8 w-8 mr-2 bg-primary-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-lg md:text-xl">PsyGamingLab</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href={`/${lang}`}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(`/${lang}`)
                ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            {t('home')}
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                serviceIds.some(id => isActive(`/${lang}/${getServiceSlug(id, lang)}`))
                  ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {t('services')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-white dark:bg-neutral-800 rounded-md shadow-lg z-50 overflow-hidden">
              <div className="py-1">
                {serviceIds.map((serviceId) => (
                  <Link
                    key={serviceId}
                    href={`/${lang}/${getServiceSlug(serviceId, lang)}`}
                    className={`block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                      isActive(`/${lang}/${getServiceSlug(serviceId, lang)}`)
                        ? 'bg-neutral-100 dark:bg-neutral-700'
                        : ''
                    }`}
                  >
                    {getServiceName(serviceId, lang)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Play Games Link */}
          <Link
            href={`/${lang}/games/play`}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(`/${lang}/games/play`)
                ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            {lang === 'en' ? 'Play Games' : 'Spiele spielen'}
          </Link>

          {/* Create Custom Game Link */}
          <Link
            href={`/${lang}/games/create`}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(`/${lang}/games/create`)
                ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            {lang === 'en' ? 'Create Your Custom Game' : 'Erstellen Sie Ihr Spiel'}
          </Link>

          <Link
            href={`/${lang}/contact`}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(`/${lang}/contact`)
                ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            {t('contact')}
          </Link>

          <LanguageSwitcher currentLang={lang} className="ml-2" />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <LanguageSwitcher currentLang={lang} />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-neutral-900 shadow-lg">
          <Link
            href={`/${lang}`}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive(`/${lang}`)
                ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('home')}
          </Link>

          {/* Services in Mobile Menu */}
          <div className="px-3 py-2 rounded-md text-base font-medium text-neutral-500 dark:text-neutral-400">
            {t('services')}
          </div>
          <div className="pl-4 space-y-1 border-l-2 border-neutral-200 dark:border-neutral-700 ml-3">
            {serviceIds.map((serviceId) => (
              <Link
                key={serviceId}
                href={`/${lang}/${getServiceSlug(serviceId, lang)}`}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(`/${lang}/${getServiceSlug(serviceId, lang)}`)
                    ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {getServiceName(serviceId, lang)}
              </Link>
            ))}
          </div>

          {/* Play Games Link in Mobile Menu */}
          <Link
            href={`/${lang}/games/play`}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive(`/${lang}/games/play`)
                ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {lang === 'en' ? 'Play Games' : 'Spiele spielen'}
          </Link>

          {/* Create Custom Game Link in Mobile Menu */}
          <Link
            href={`/${lang}/games/create`}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive(`/${lang}/games/create`)
                ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {lang === 'en' ? 'Create Your Custom Game' : 'Erstellen Sie Ihr Spiel'}
          </Link>

          <Link
            href={`/${lang}/contact`}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive(`/${lang}/contact`)
                ? 'bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </header>
  );
}
