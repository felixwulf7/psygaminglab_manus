export const games = {
  puzzle: {
    id: 'puzzle',
    slugs: {
      en: 'puzzle-cognitive-games',
      de: 'puzzle-kognitive-spiele',
    },
    names: {
      en: 'Puzzle and Cognitive Games',
      de: 'Puzzle- und Kognitive Spiele',
    },
    descriptions: {
      en: 'Tetris-style games and cognitive challenges designed to help distract from intrusive thoughts, reduce cravings, and engage working memory through fun and challenging puzzles.',
      de: 'Tetris-ähnliche Spiele und kognitive Herausforderungen, die entwickelt wurden, um von aufdringlichen Gedanken abzulenken, Verlangen zu reduzieren und das Arbeitsgedächtnis durch unterhaltsame und herausfordernde Rätsel zu trainieren.',
    },
    metaDescriptions: {
      en: 'Explore our puzzle and cognitive games designed to engage working memory and provide distraction from intrusive thoughts.',
      de: 'Entdecken Sie unsere Puzzle- und kognitiven Spiele, die entwickelt wurden, um das Arbeitsgedächtnis zu trainieren und von aufdringlichen Gedanken abzulenken.',
    },
    keywords: {
      en: 'puzzle games, cognitive games, tetris therapy, working memory games, distraction techniques',
      de: 'Puzzlespiele, kognitive Spiele, Tetris-Therapie, Arbeitsgedächtnisspiele, Ablenkungstechniken',
    },
  },
  narrative: {
    id: 'narrative',
    slugs: {
      en: 'narrative-adventure-games',
      de: 'narrative-abenteuerspiele',
    },
    names: {
      en: 'Narrative Adventure Games',
      de: 'Narrative Abenteuerspiele',
    },
    descriptions: {
      en: 'Story-driven games that incorporate cognitive behavioral therapy techniques, allowing players to confront and reframe negative thoughts through engaging narratives and character development.',
      de: 'Geschichtenbasierte Spiele, die kognitive Verhaltenstherapietechniken integrieren und es den Spielern ermöglichen, negative Gedanken durch fesselnde Erzählungen und Charakterentwicklung zu konfrontieren und umzugestalten.',
    },
    metaDescriptions: {
      en: 'Immerse yourself in our narrative adventure games that incorporate CBT techniques to help reframe negative thoughts.',
      de: 'Tauchen Sie ein in unsere narrativen Abenteuerspiele, die KVT-Techniken integrieren, um negative Gedanken umzugestalten.',
    },
    keywords: {
      en: 'narrative games, adventure games, CBT games, therapeutic storytelling, mental health narratives',
      de: 'narrative Spiele, Abenteuerspiele, KVT-Spiele, therapeutisches Geschichtenerzählen, Erzählungen zur psychischen Gesundheit',
    },
  },
  relaxation: {
    id: 'relaxation',
    slugs: {
      en: 'relaxation-mindfulness-games',
      de: 'entspannungs-achtsamkeitsspiele',
    },
    names: {
      en: 'Relaxation & Mindfulness Games',
      de: 'Entspannungs- & Achtsamkeitsspiele',
    },
    descriptions: {
      en: 'Interactive games that encourage deep breathing, guided meditation, and mindfulness practices through calming visualizations and gentle, timed challenges designed to reduce stress and anxiety.',
      de: 'Interaktive Spiele, die tiefes Atmen, geführte Meditation und Achtsamkeitspraktiken durch beruhigende Visualisierungen und sanfte, zeitlich begrenzte Herausforderungen fördern, die entwickelt wurden, um Stress und Angst zu reduzieren.',
    },
    metaDescriptions: {
      en: 'Find calm with our relaxation and mindfulness games featuring guided breathing exercises and meditative challenges.',
      de: 'Finden Sie Ruhe mit unseren Entspannungs- und Achtsamkeitsspielen mit geführten Atemübungen und meditativen Herausforderungen.',
    },
    keywords: {
      en: 'relaxation games, mindfulness games, meditation apps, breathing exercises, stress reduction games',
      de: 'Entspannungsspiele, Achtsamkeitsspiele, Meditations-Apps, Atemübungen, Stressreduktionsspiele',
    },
  },
  interactive: {
    id: 'interactive',
    slugs: {
      en: 'interactive-quizzes-challenges',
      de: 'interaktive-quiz-herausforderungen',
    },
    names: {
      en: 'Interactive Quizzes & Challenges',
      de: 'Interaktive Quiz & Herausforderungen',
    },
    descriptions: {
      en: 'Quick, engaging games where users answer questions related to mental health topics, earning points or badges that reinforce positive behaviors and increase knowledge about psychological wellbeing.',
      de: 'Schnelle, ansprechende Spiele, bei denen Benutzer Fragen zu Themen der psychischen Gesundheit beantworten und Punkte oder Abzeichen verdienen, die positives Verhalten verstärken und das Wissen über psychologisches Wohlbefinden erweitern.',
    },
    metaDescriptions: {
      en: 'Test your knowledge with our interactive mental health quizzes and challenges that reward positive behaviors.',
      de: 'Testen Sie Ihr Wissen mit unseren interaktiven Quiz und Herausforderungen zur psychischen Gesundheit, die positives Verhalten belohnen.',
    },
    keywords: {
      en: 'mental health quizzes, psychological challenges, interactive learning, gamified education, health knowledge games',
      de: 'Quiz zur psychischen Gesundheit, psychologische Herausforderungen, interaktives Lernen, spielerische Bildung, Spiele zum Gesundheitswissen',
    },
  },
};

export type GameId = keyof typeof games;
export const gameIds = Object.keys(games) as GameId[];

export function getGameBySlug(slug: string, language: string): GameId | undefined {
  return gameIds.find(id => games[id].slugs[language as keyof typeof games[typeof id]['slugs']] === slug);
}
