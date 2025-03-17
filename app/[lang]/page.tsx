import Link from 'next/link';
import { Metadata } from 'next';
import { Language, isValidLanguage } from '../config/languages';
import { serviceIds } from '../config/services';
import { gameIds } from '../config/games';
import { getServiceSlug, getServiceName, getGameSlug, getGameName, getTranslation, TranslationKey } from '../utils/translations';
import { generateHomeMetadata } from '../utils/metadata';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';
import ContentBlock from '../components/ContentBlock';

interface HomePageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  // Validate language
  if (!isValidLanguage(params.lang)) {
    return {};
  }
  
  // Generate metadata for the language
  return generateHomeMetadata(params.lang as Language);
}

export default function HomePage({ params }: HomePageProps) {
  // Validate language parameter
  if (!isValidLanguage(params.lang)) {
    return null;
  }
  
  const lang = params.lang as Language;
  const t = (key: TranslationKey) => getTranslation(key, lang);
  
  // Hero content based on language
  const heroTitle = lang === 'en' 
    ? 'Therapeutic Gaming Experiences for Mental Health'
    : 'Therapeutische Spielerfahrungen für psychische Gesundheit';
  
  const heroSubtitle = lang === 'en'
    ? 'Innovative psychology-based games designed to support mental wellbeing through engaging, evidence-based interactive experiences.'
    : 'Innovative, psychologiebasierte Spiele, die entwickelt wurden, um das psychische Wohlbefinden durch ansprechende, evidenzbasierte interaktive Erfahrungen zu unterstützen.';
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        lang={lang}
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaText={t('getStarted')}
        ctaLink={`/${lang}/${getServiceSlug('therapeutic', lang)}`}
        secondaryCtaText={t('learnMore')}
        secondaryCtaLink={`/${lang}/contact`}
        imageSrc="/images/Neuron.jpg"
        imageAlt="Neuron visualization representing mental health and gaming"
        overlayColor="bg-gradient-to-r from-primary-900/80 to-primary-800/60"
        size="large"
      />
      
      {/* Services Section */}
      <section className="section bg-neutral-50 dark:bg-neutral-900">
        <div className="container-custom">
          <SectionTitle
            title={t('ourServices')}
            subtitle={lang === 'en' 
              ? 'Explore our innovative therapeutic gaming services designed to support mental health and wellbeing.'
              : 'Entdecken Sie unsere innovativen therapeutischen Spieldienstleistungen, die entwickelt wurden, um die psychische Gesundheit und das Wohlbefinden zu unterstützen.'}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceIds.map((serviceId) => (
              <FeatureCard
                key={serviceId}
                lang={lang}
                title={getServiceName(serviceId, lang)}
                description={serviceId === 'therapeutic' 
                  ? (lang === 'en'
                    ? 'Innovative therapeutic gaming experiences designed to support mental health through engaging, evidence-based interactive content.'
                    : 'Innovative therapeutische Spielerfahrungen, die entwickelt wurden, um die psychische Gesundheit durch ansprechendes, evidenzbasiertes interaktives Inhalte zu unterstützen.')
                  : (lang === 'en'
                    ? 'Connect with others in our supportive community forums where you can share experiences and find peer support.'
                    : 'Verbinden Sie sich mit anderen in unseren unterstützenden Community-Foren, in denen Sie Erfahrungen austauschen und Peer-Support finden können.')}
                imageSrc={serviceId === 'therapeutic' 
                  ? '/images/gaming_controller.jpg' 
                  : '/images/gamer_on_laptop.jpg'}
                imageAlt={getServiceName(serviceId, lang)}
                link={`/${lang}/${getServiceSlug(serviceId, lang)}`}
                variant={serviceId === 'therapeutic' ? 'primary' : 'secondary'}
                imagePosition="background"
                aspectRatio="video"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Games Section */}
      <section className="section bg-white dark:bg-neutral-800">
        <div className="container-custom">
          <SectionTitle
            title={t('featuredGames')}
            subtitle={lang === 'en'
              ? 'Discover our range of psychology-based games designed to support different aspects of mental wellbeing.'
              : 'Entdecken Sie unsere Auswahl an psychologiebasierten Spielen, die entwickelt wurden, um verschiedene Aspekte des psychischen Wohlbefindens zu unterstützen.'}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameIds.map((gameId) => (
              <FeatureCard
                key={gameId}
                lang={lang}
                title={getGameName(gameId, lang)}
                description={gameId === 'puzzle' 
                  ? (lang === 'en'
                    ? 'Engage your working memory and reduce intrusive thoughts with our cognitive puzzle games.'
                    : 'Trainieren Sie Ihr Arbeitsgedächtnis und reduzieren Sie aufdringliche Gedanken mit unseren kognitiven Puzzlespielen.')
                  : gameId === 'narrative'
                  ? (lang === 'en'
                    ? 'Experience story-driven adventures that incorporate cognitive behavioral therapy techniques.'
                    : 'Erleben Sie geschichtenbasierte Abenteuer, die kognitive Verhaltenstherapietechniken integrieren.')
                  : gameId === 'relaxation'
                  ? (lang === 'en'
                    ? 'Find calm with guided breathing exercises and meditative challenges designed to reduce stress.'
                    : 'Finden Sie Ruhe mit geführten Atemübungen und meditativen Herausforderungen zur Stressreduktion.')
                  : (lang === 'en'
                    ? 'Test your knowledge with interactive quizzes that reinforce positive behaviors and mental health awareness.'
                    : 'Testen Sie Ihr Wissen mit interaktiven Quiz, die positives Verhalten und Bewusstsein für psychische Gesundheit fördern.')}
                imageSrc={gameId === 'puzzle' 
                  ? '/images/keyboard_with_glowing_LEDS.jpg'
                  : gameId === 'narrative'
                  ? '/images/gaming_chair_and_environment.jpg'
                  : gameId === 'relaxation'
                  ? '/images/smiley_art_on_floor.jpg'
                  : '/images/glowing_Computer_board.jpg'}
                imageAlt={getGameName(gameId, lang)}
                link={`/${lang}/games/${getGameSlug(gameId, lang)}`}
                variant="default"
                imagePosition="top"
                aspectRatio="square"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <ContentBlock
        title={t('howItWorks')}
        content={
          <div className="space-y-6">
            <p>
              {lang === 'en'
                ? 'Our platform combines psychological principles with engaging gaming experiences to create effective tools for mental wellbeing. Here\'s how it works:'
                : 'Unsere Plattform kombiniert psychologische Prinzipien mit ansprechenden Spielerfahrungen, um effektive Werkzeuge für das psychische Wohlbefinden zu schaffen. So funktioniert es:'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {lang === 'en' ? 'Choose Your Experience' : 'Wählen Sie Ihre Erfahrung'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Select from our range of therapeutic games based on your needs and preferences.'
                    : 'Wählen Sie aus unserer Palette therapeutischer Spiele basierend auf Ihren Bedürfnissen und Vorlieben.'}
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {lang === 'en' ? 'Engage Regularly' : 'Regelmäßig Teilnehmen'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Consistent engagement with our games helps build positive mental habits and coping strategies.'
                    : 'Regelmäßige Beschäftigung mit unseren Spielen hilft, positive mentale Gewohnheiten und Bewältigungsstrategien aufzubauen.'}
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {lang === 'en' ? 'Track Your Progress' : 'Verfolgen Sie Ihren Fortschritt'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Monitor your wellbeing journey and see how regular engagement improves your mental health.'
                    : 'Verfolgen Sie Ihre Wohlbefindensreise und sehen Sie, wie regelmäßige Teilnahme Ihre psychische Gesundheit verbessert.'}
                </p>
              </div>
            </div>
          </div>
        }
        imageSrc="/images/Neonlight_saying_play.jpg"
        imageAlt="Neon sign saying Play"
        imagePosition="background"
        backgroundColor="bg-primary-900"
        textColor="text-white"
      />
      
      {/* CTA Section */}
      <section className="section bg-white dark:bg-neutral-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {lang === 'en'
              ? 'Ready to improve your mental wellbeing?'
              : 'Bereit, Ihr psychisches Wohlbefinden zu verbessern?'}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Join our community today and discover how therapeutic gaming can support your mental health journey.'
              : 'Treten Sie noch heute unserer Community bei und entdecken Sie, wie therapeutisches Spielen Ihre psychische Gesundheitsreise unterstützen kann.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${lang}/${getServiceSlug('therapeutic', lang)}`} className="btn-primary">
              {t('getStarted')}
            </Link>
            <Link href={`/${lang}/contact`} className="btn-outline">
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Generate static params for all supported languages
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }];
}
