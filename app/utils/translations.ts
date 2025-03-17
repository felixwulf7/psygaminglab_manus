import { Language, defaultLanguage } from '../config/languages';
import { services, ServiceId } from '../config/services';
import { games, GameId } from '../config/games';

// Common translations
export const translations = {
  en: {
    home: 'Home',
    services: 'Services',
    games: 'Games',
    contact: 'Contact',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    readMore: 'Read More',
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    ourServices: 'Our Services',
    ourGames: 'Our Games',
    featuredGames: 'Featured Games',
    latestArticles: 'Latest Articles',
    testimonials: 'Testimonials',
    benefits: 'Benefits',
    howItWorks: 'How It Works',
    faq: 'Frequently Asked Questions',
    joinCommunity: 'Join Our Community',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    copyright: '© 2025 PsyGamingLab. All rights reserved.',
    emailAddress: 'Email Address',
    fullName: 'Full Name',
    message: 'Message',
    send: 'Send',
    subject: 'Subject',
    phoneNumber: 'Phone Number',
    address: 'Address',
    city: 'City',
    country: 'Country',
    postalCode: 'Postal Code',
    subscribe: 'Subscribe',
    newsletter: 'Newsletter',
    stayUpdated: 'Stay Updated',
    followUs: 'Follow Us',
    backToTop: 'Back to Top',
    searchPlaceholder: 'Search...',
    notFoundTitle: 'Page Not Found',
    notFoundText: 'The page you are looking for does not exist.',
    goBack: 'Go Back',
    goHome: 'Go Home',
  },
  de: {
    home: 'Startseite',
    services: 'Dienstleistungen',
    games: 'Spiele',
    contact: 'Kontakt',
    learnMore: 'Mehr erfahren',
    getStarted: 'Loslegen',
    readMore: 'Weiterlesen',
    contactUs: 'Kontaktieren Sie uns',
    aboutUs: 'Über uns',
    ourServices: 'Unsere Dienstleistungen',
    ourGames: 'Unsere Spiele',
    featuredGames: 'Ausgewählte Spiele',
    latestArticles: 'Neueste Artikel',
    testimonials: 'Erfahrungsberichte',
    benefits: 'Vorteile',
    howItWorks: 'Wie es funktioniert',
    faq: 'Häufig gestellte Fragen',
    joinCommunity: 'Treten Sie unserer Community bei',
    privacyPolicy: 'Datenschutzrichtlinie',
    termsOfService: 'Nutzungsbedingungen',
    copyright: '© 2025 PsyGamingLab. Alle Rechte vorbehalten.',
    emailAddress: 'E-Mail-Adresse',
    fullName: 'Vollständiger Name',
    message: 'Nachricht',
    send: 'Senden',
    subject: 'Betreff',
    phoneNumber: 'Telefonnummer',
    address: 'Adresse',
    city: 'Stadt',
    country: 'Land',
    postalCode: 'Postleitzahl',
    subscribe: 'Abonnieren',
    newsletter: 'Newsletter',
    stayUpdated: 'Bleiben Sie auf dem Laufenden',
    followUs: 'Folgen Sie uns',
    backToTop: 'Zurück nach oben',
    searchPlaceholder: 'Suchen...',
    notFoundTitle: 'Seite nicht gefunden',
    notFoundText: 'Die gesuchte Seite existiert nicht.',
    goBack: 'Zurück',
    goHome: 'Zur Startseite',
  },
};

// Type for translation keys
export type TranslationKey = keyof typeof translations.en;

// Get a translation by key and language
export function getTranslation(key: TranslationKey, lang: Language): string {
  return translations[lang][key] || translations[defaultLanguage][key];
}

// Get service name by ID and language
export function getServiceName(serviceId: ServiceId, lang: Language): string {
  return services[serviceId].names[lang] || services[serviceId].names[defaultLanguage];
}

// Get service slug by ID and language
export function getServiceSlug(serviceId: ServiceId, lang: Language): string {
  return services[serviceId].slugs[lang] || services[serviceId].slugs[defaultLanguage];
}

// Get game name by ID and language
export function getGameName(gameId: GameId, lang: Language): string {
  return games[gameId].names[lang] || games[gameId].names[defaultLanguage];
}

// Get game slug by ID and language
export function getGameSlug(gameId: GameId, lang: Language): string {
  return games[gameId].slugs[lang] || games[gameId].slugs[defaultLanguage];
}

// Get all service+game combinations for a language
export function getAllServiceGameCombinations(lang: Language) {
  const combinations = [];
  
  for (const serviceId of Object.keys(services) as ServiceId[]) {
    for (const gameId of Object.keys(games) as GameId[]) {
      combinations.push({
        serviceId,
        gameId,
        serviceSlug: getServiceSlug(serviceId, lang),
        gameSlug: getGameSlug(gameId, lang),
        serviceName: getServiceName(serviceId, lang),
        gameName: getGameName(gameId, lang),
      });
    }
  }
  
  return combinations;
}
