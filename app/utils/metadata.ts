import { Metadata } from 'next';
import { Language, languages } from '../config/languages';
import { services, ServiceId } from '../config/services';
import { games, GameId } from '../config/games';
import { getServiceSlug, getGameSlug } from './translations';

// Base URL for the website (would be replaced with actual domain in production)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://psygaminglab.com';

// Generate alternate language URLs for hreflang tags
export function generateAlternateLanguageUrls(path: string, currentLang: Language) {
  const alternates: { [key: string]: string } = {};
  
  Object.keys(languages).forEach((lang) => {
    if (lang !== currentLang) {
      // Replace the language segment in the path
      const alternatePath = path.replace(`/${currentLang}/`, `/${lang}/`);
      alternates[lang] = `${baseUrl}${alternatePath}`;
    }
  });
  
  return alternates;
}

// Generate metadata for the homepage
export function generateHomeMetadata(lang: Language): Metadata {
  const title = lang === 'en' 
    ? 'PsyGamingLab - Therapeutic Gaming Experiences'
    : 'PsyGamingLab - Therapeutische Spielerfahrungen';
  
  const description = lang === 'en'
    ? 'Innovative therapeutic and gamified experiences for mental health and wellbeing. Explore our psychology-based games and community support.'
    : 'Innovative therapeutische und spielerische Erfahrungen für psychische Gesundheit und Wohlbefinden. Entdecken Sie unsere psychologiebasierten Spiele und Community-Unterstützung.';
  
  const keywords = lang === 'en'
    ? 'therapeutic gaming, mental health games, psychology games, gamified therapy, mindfulness games, cognitive games'
    : 'therapeutisches Spielen, Spiele für psychische Gesundheit, Psychologiespiele, spielerische Therapie, Achtsamkeitsspiele, kognitive Spiele';
  
  const alternates = generateAlternateLanguageUrls(`/${lang}`, lang);
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}`,
      siteName: 'PsyGamingLab',
      locale: lang === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Generate metadata for service pages
export function generateServiceMetadata(serviceId: ServiceId, lang: Language): Metadata {
  const service = services[serviceId];
  const title = `${service.names[lang]} | PsyGamingLab`;
  const description = service.metaDescriptions[lang];
  const keywords = service.keywords[lang];
  const slug = getServiceSlug(serviceId, lang);
  const path = `/${lang}/${slug}`;
  const alternates = generateAlternateLanguageUrls(path, lang);
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: 'PsyGamingLab',
      locale: lang === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Generate metadata for game pages
export function generateGameMetadata(gameId: GameId, lang: Language): Metadata {
  const game = games[gameId];
  const title = `${game.names[lang]} | PsyGamingLab`;
  const description = game.metaDescriptions[lang];
  const keywords = game.keywords[lang];
  const slug = getGameSlug(gameId, lang);
  const path = `/${lang}/games/${slug}`;
  const alternates = generateAlternateLanguageUrls(path, lang);
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: 'PsyGamingLab',
      locale: lang === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Generate metadata for service+game combination pages
export function generateServiceGameMetadata(serviceId: ServiceId, gameId: GameId, lang: Language): Metadata {
  const service = services[serviceId];
  const game = games[gameId];
  
  const title = `${service.names[lang]} for ${game.names[lang]} | PsyGamingLab`;
  
  const description = lang === 'en'
    ? `Explore our ${service.names[lang].toLowerCase()} designed specifically for ${game.names[lang].toLowerCase()}. Improve your mental wellbeing through engaging, evidence-based interactive content.`
    : `Entdecken Sie unsere ${service.names[lang].toLowerCase()}, die speziell für ${game.names[lang].toLowerCase()} entwickelt wurden. Verbessern Sie Ihr psychisches Wohlbefinden durch ansprechendes, evidenzbasiertes interaktives Inhalte.`;
  
  const keywords = `${service.keywords[lang]}, ${game.keywords[lang]}`;
  
  const serviceSlug = getServiceSlug(serviceId, lang);
  const gameSlug = getGameSlug(gameId, lang);
  const path = `/${lang}/${serviceSlug}/${gameSlug}`;
  const alternates = generateAlternateLanguageUrls(path, lang);
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: 'PsyGamingLab',
      locale: lang === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Generate metadata for contact page
export function generateContactMetadata(lang: Language): Metadata {
  const title = lang === 'en' 
    ? 'Contact Us | PsyGamingLab'
    : 'Kontaktieren Sie uns | PsyGamingLab';
  
  const description = lang === 'en'
    ? 'Get in touch with PsyGamingLab. Contact our team for inquiries about our therapeutic gaming experiences and mental health services.'
    : 'Nehmen Sie Kontakt mit PsyGamingLab auf. Kontaktieren Sie unser Team für Anfragen zu unseren therapeutischen Spielerfahrungen und Dienstleistungen für psychische Gesundheit.';
  
  const keywords = lang === 'en'
    ? 'contact PsyGamingLab, therapeutic gaming contact, mental health services contact, psychology games support'
    : 'Kontakt PsyGamingLab, Kontakt therapeutisches Spielen, Kontakt Dienstleistungen für psychische Gesundheit, Unterstützung für Psychologiespiele';
  
  const path = `/${lang}/contact`;
  const alternates = generateAlternateLanguageUrls(path, lang);
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: 'PsyGamingLab',
      locale: lang === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
