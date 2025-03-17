import { Metadata } from 'next';
import Link from 'next/link';
import { isValidLanguage } from '@/app/config/languages';
import { getTranslation, TranslationKey } from '@/app/utils/translations';

interface PlayGamesPageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: PlayGamesPageProps): Promise<Metadata> {
  // Validate language
  if (!isValidLanguage(params.lang)) {
    return {};
  }
  
  const title = params.lang === 'en' ? 'Play Therapeutic Games' : 'Therapeutische Spiele spielen';
  const description = params.lang === 'en' 
    ? 'Access our collection of therapeutic games designed to support mental wellbeing.'
    : 'Greifen Sie auf unsere Sammlung therapeutischer Spiele zu, die entwickelt wurden, um das psychische Wohlbefinden zu unterstützen.';
  
  return {
    title,
    description,
  };
}

export default function PlayGamesPage({ params }: PlayGamesPageProps) {
  // Validate language parameter
  if (!isValidLanguage(params.lang)) {
    return null;
  }
  
  const lang = params.lang as 'en' | 'de';
  const t = (key: TranslationKey) => {
    try {
      return getTranslation(key, lang);
    } catch {
      return key;
    }
  };
  
  // Game data with titles, descriptions, and file paths
  const games = [
    {
      id: 'mental-health-matching',
      title: lang === 'en' ? 'Mental Health Matching Game' : 'Psychische Gesundheit Matching-Spiel',
      description: lang === 'en' 
        ? 'Match pairs of cards to improve focus and memory while learning about mental health concepts.'
        : 'Ordnen Sie Kartenpaare zu, um Fokus und Gedächtnis zu verbessern und gleichzeitig etwas über Konzepte der psychischen Gesundheit zu lernen.',
      path: '/games/mental-health-matching-game.html',
      category: 'puzzle'
    },
    {
      id: 'mindful-starship',
      title: lang === 'en' ? 'Mindful Starship' : 'Achtsames Raumschiff',
      description: lang === 'en' 
        ? 'Navigate a starship through space while practicing mindfulness and focused attention.'
        : 'Navigieren Sie ein Raumschiff durch den Weltraum, während Sie Achtsamkeit und fokussierte Aufmerksamkeit üben.',
      path: '/games/mindful-starship.html',
      category: 'relaxation'
    },
    {
      id: 'mindful-snake',
      title: lang === 'en' ? 'Mindful Snake' : 'Achtsame Schlange',
      description: lang === 'en' 
        ? 'A calming twist on the classic snake game that encourages mindful focus and relaxation.'
        : 'Eine beruhigende Variante des klassischen Schlangenspiels, das achtsamen Fokus und Entspannung fördert.',
      path: '/games/mindful-snake (1).html',
      category: 'relaxation'
    },
    {
      id: 'psyjump',
      title: lang === 'en' ? 'PsyJump' : 'PsyJump',
      description: lang === 'en' 
        ? 'A jumping game that helps build resilience and focus through progressive challenges.'
        : 'Ein Sprungspiel, das durch progressive Herausforderungen hilft, Resilienz und Fokus aufzubauen.',
      path: '/games/psyjump.html',
      category: 'interactive'
    },
    {
      id: 'shooter-accepting-being-tired',
      title: lang === 'en' ? '3D Shooter: Accepting Being Tired' : '3D-Shooter: Müdigkeit akzeptieren',
      description: lang === 'en' 
        ? 'Learn to accept feelings of tiredness while engaging in an immersive 3D shooter experience.'
        : 'Lernen Sie, Müdigkeitsgefühle zu akzeptieren, während Sie in ein immersives 3D-Shooter-Erlebnis eintauchen.',
      path: '/games/3d_shooter_accepting_being_tired.html',
      category: 'narrative'
    },
    {
      id: 'shooter-performance-fear',
      title: lang === 'en' ? '3D Shooter: Dealing with Performance Fear' : '3D-Shooter: Umgang mit Leistungsangst',
      description: lang === 'en' 
        ? 'Confront and overcome performance anxiety through this therapeutic 3D shooter game.'
        : 'Konfrontieren und überwinden Sie Leistungsangst durch dieses therapeutische 3D-Shooter-Spiel.',
      path: '/games/3d_shooter_performance_fear.html',
      category: 'narrative'
    },
    {
      id: 'shooter-self-doubt',
      title: lang === 'en' ? '3D Shooter: Dealing with Self Doubt' : '3D-Shooter: Umgang mit Selbstzweifeln',
      description: lang === 'en' 
        ? 'Address feelings of self-doubt while engaging in an interactive 3D shooter experience.'
        : 'Gehen Sie auf Gefühle von Selbstzweifeln ein, während Sie ein interaktives 3D-Shooter-Erlebnis erleben.',
      path: '/games/3d_shooter_dealing_with_self_doubt.html',
      category: 'narrative'
    },
    {
      id: 'shooter-emotional-presence',
      title: lang === 'en' ? '3D Shooter: Emotional Presence' : '3D-Shooter: Emotionale Präsenz',
      description: lang === 'en' 
        ? 'Practice emotional awareness and presence through this engaging 3D shooter game.'
        : 'Üben Sie emotionales Bewusstsein und Präsenz durch dieses ansprechende 3D-Shooter-Spiel.',
      path: '/games/3d_shooter_emotional_presence.html',
      category: 'narrative'
    }
  ];

  // Group games by category
  const puzzleGames = games.filter(game => game.category === 'puzzle');
  const narrativeGames = games.filter(game => game.category === 'narrative');
  const relaxationGames = games.filter(game => game.category === 'relaxation');
  const interactiveGames = games.filter(game => game.category === 'interactive');

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {lang === 'en' ? 'Therapeutic Games Collection' : 'Sammlung therapeutischer Spiele'}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl">
            {lang === 'en' 
              ? 'Explore our collection of games designed to support mental wellbeing through engaging, interactive experiences.'
              : 'Entdecken Sie unsere Spielesammlung, die entwickelt wurde, um das psychische Wohlbefinden durch ansprechende, interaktive Erfahrungen zu unterstützen.'}
          </p>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {lang === 'en' ? 'Narrative Adventure Games' : 'Narrative Abenteuerspiele'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {narrativeGames.map((game) => (
                <div key={game.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-4">{game.description}</p>
                    <a 
                      href={game.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary inline-block"
                    >
                      {lang === 'en' ? 'Play Now' : 'Jetzt Spielen'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {lang === 'en' ? 'Relaxation & Mindfulness Games' : 'Entspannungs- & Achtsamkeitsspiele'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relaxationGames.map((game) => (
                <div key={game.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-4">{game.description}</p>
                    <a 
                      href={game.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary inline-block"
                    >
                      {lang === 'en' ? 'Play Now' : 'Jetzt Spielen'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {lang === 'en' ? 'Puzzle and Cognitive Games' : 'Puzzle- und Kognitive Spiele'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {puzzleGames.map((game) => (
                <div key={game.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-4">{game.description}</p>
                    <a 
                      href={game.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary inline-block"
                    >
                      {lang === 'en' ? 'Play Now' : 'Jetzt Spielen'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {lang === 'en' ? 'Interactive Quizzes & Challenges' : 'Interaktive Quiz & Herausforderungen'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {interactiveGames.map((game) => (
                <div key={game.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-4">{game.description}</p>
                    <a 
                      href={game.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary inline-block"
                    >
                      {lang === 'en' ? 'Play Now' : 'Jetzt Spielen'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-neutral-100 dark:bg-neutral-800">
        <div className="container-custom text-center">
          <Link href={`/${lang}`} className="btn-outline">
            {lang === 'en' ? 'Back to Home' : 'Zurück zur Startseite'}
          </Link>
        </div>
      </section>
    </main>
  );
}

// Generate static params for all supported languages
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }];
}
