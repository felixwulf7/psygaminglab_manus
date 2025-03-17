export const services = {
  therapeutic: {
    id: 'therapeutic',
    slugs: {
      en: 'therapeutic-experiences',
      de: 'therapeutische-erfahrungen',
    },
    names: {
      en: 'Therapeutic and Gamified Experiences',
      de: 'Therapeutische und Spielerische Erfahrungen',
    },
    descriptions: {
      en: 'Innovative therapeutic gaming experiences designed to support mental health and wellbeing through engaging, evidence-based interactive content.',
      de: 'Innovative therapeutische Spielerfahrungen, die entwickelt wurden, um die psychische Gesundheit und das Wohlbefinden durch ansprechendes, evidenzbasiertes interaktives Inhalte zu unterstützen.',
    },
    metaDescriptions: {
      en: 'Discover our therapeutic gaming experiences designed to improve mental health through engaging, evidence-based interactive content.',
      de: 'Entdecken Sie unsere therapeutischen Spielerfahrungen, die entwickelt wurden, um die psychische Gesundheit durch ansprechendes, evidenzbasiertes interaktives Inhalte zu verbessern.',
    },
    keywords: {
      en: 'therapeutic gaming, mental health games, psychology games, digital therapy, gamified therapy',
      de: 'therapeutisches Spielen, Spiele für psychische Gesundheit, Psychologiespiele, digitale Therapie, spielerische Therapie',
    },
  },
  community: {
    id: 'community',
    slugs: {
      en: 'community-forums',
      de: 'community-foren',
    },
    names: {
      en: 'Community Forums and Peer Support',
      de: 'Community-Foren und Peer-Support',
    },
    descriptions: {
      en: 'Connect with others in our supportive community forums where you can share experiences, find peer support, and engage in meaningful discussions about mental health and wellbeing.',
      de: 'Verbinden Sie sich mit anderen in unseren unterstützenden Community-Foren, in denen Sie Erfahrungen austauschen, Peer-Support finden und an bedeutungsvollen Diskussionen über psychische Gesundheit und Wohlbefinden teilnehmen können.',
    },
    metaDescriptions: {
      en: 'Join our supportive community forums for peer support and discussions about mental health, gaming, and wellbeing.',
      de: 'Treten Sie unseren unterstützenden Community-Foren bei, um Peer-Support und Diskussionen über psychische Gesundheit, Spielen und Wohlbefinden zu erhalten.',
    },
    keywords: {
      en: 'mental health community, peer support, psychology forums, gaming community, wellbeing discussions',
      de: 'Community für psychische Gesundheit, Peer-Support, Psychologie-Foren, Gaming-Community, Wohlbefinden-Diskussionen',
    },
  },
};

export type ServiceId = keyof typeof services;
export const serviceIds = Object.keys(services) as ServiceId[];

export function getServiceBySlug(slug: string, language: string): ServiceId | undefined {
  return serviceIds.find(id => services[id].slugs[language as keyof typeof services[typeof id]['slugs']] === slug);
}
