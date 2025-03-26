import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Language, isValidLanguage } from '../../config/languages';
import { services, ServiceId, getServiceBySlug } from '../../config/services';
import { gameIds } from '../../config/games';
import { getServiceSlug, getGameSlug, getGameName, getTranslation, TranslationKey } from '../../utils/translations';
import { generateServiceMetadata } from '../../utils/metadata';
import Hero from '../../components/Hero';
import SectionTitle from '../../components/SectionTitle';
import FeatureCard from '../../components/FeatureCard';
import ContentBlock from '../../components/ContentBlock';

interface ServicePageProps {
  params: {
    lang: string;
    serviceSlug: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  // Validate language and service slug
  const lang = await params.lang;
  if (!isValidLanguage(lang)) {
    return {};
  }
  
  // Get service ID from slug
  const serviceId = getServiceBySlug(params.serviceSlug, lang as Language);
  
  // Return empty object if service ID is not found
  if (!serviceId) {
    return {};
  }
  
  // Generate metadata for the service
  return generateServiceMetadata(serviceId, lang as Language);
}

export default async function ServicePage({ params }: ServicePageProps) {
  // Validate language and service slug
  const lang = await params.lang;
  if (!isValidLanguage(lang)) {
    notFound();
  }
  
  const langCode = lang as Language;
  const t = (key: TranslationKey) => getTranslation(key, langCode);
  
  // Get service ID from slug
  const serviceId = getServiceBySlug(params.serviceSlug, langCode);
  
  // Redirect to 404 if service slug is invalid
  if (!serviceId) {
    notFound();
  }
  
  const service = services[serviceId];
  
  // Service-specific content
  const isTherapeutic = serviceId === 'therapeutic';
  
  // Hero image based on service
  const heroImage = isTherapeutic 
    ? '/images/gaming_controller.jpg'
    : '/images/gamer_on_laptop.jpg';
  
  // Hero overlay color based on service
  const overlayColor = isTherapeutic
    ? 'bg-gradient-to-r from-primary-900/80 to-primary-800/60'
    : 'bg-gradient-to-r from-secondary-900/80 to-secondary-800/60';
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        lang={langCode}
        title={service.names[langCode]}
        subtitle={service.descriptions[langCode]}
        ctaText={t('getStarted')}
        ctaLink={`/${langCode}/${getServiceSlug(serviceId, langCode)}/${getGameSlug('puzzle', langCode)}`}
        secondaryCtaText={t('contactUs')}
        secondaryCtaLink={`/${langCode}/contact`}
        imageSrc={heroImage}
        imageAlt={service.names[langCode]}
        overlayColor={overlayColor}
        size="large"
      />
      
      {/* Service Description Section */}
      <ContentBlock
        title={isTherapeutic 
          ? (langCode === 'en' ? 'Therapeutic Gaming for Mental Health' : 'Therapeutisches Spielen für psychische Gesundheit')
          : (langCode === 'en' ? 'Community Support for Mental Wellbeing' : 'Community-Unterstützung für psychisches Wohlbefinden')}
        content={
          <div className="space-y-4">
            <p>
              {isTherapeutic
                ? (langCode === 'en'
                  ? 'Our therapeutic gaming experiences combine psychological principles with engaging gameplay to create effective tools for mental wellbeing. Each game is designed with specific therapeutic goals in mind, backed by research and developed in collaboration with mental health professionals.'
                  : 'Unsere therapeutischen Spielerfahrungen kombinieren psychologische Prinzipien mit ansprechendem Gameplay, um effektive Werkzeuge für das psychische Wohlbefinden zu schaffen. Jedes Spiel wird mit spezifischen therapeutischen Zielen entwickelt, durch Forschung unterstützt und in Zusammenarbeit mit Fachleuten für psychische Gesundheit entwickelt.')
                : (langCode === 'en'
                  ? 'Our community forums provide a safe and supportive space for individuals to connect, share experiences, and find peer support. Moderated by trained professionals, our forums foster meaningful discussions about mental health and wellbeing in a judgment-free environment.'
                  : 'Unsere Community-Foren bieten einen sicheren und unterstützenden Raum für Einzelpersonen, um sich zu verbinden, Erfahrungen auszutauschen und Peer-Support zu finden. Moderiert von ausgebildeten Fachleuten fördern unsere Foren bedeutungsvolle Diskussionen über psychische Gesundheit und Wohlbefinden in einer urteilsfreien Umgebung.')}
            </p>
            <p>
              {isTherapeutic
                ? (langCode === 'en'
                  ? 'Through interactive gameplay, users can develop coping strategies, practice mindfulness, challenge negative thought patterns, and build resilience in an engaging and accessible format.'
                  : 'Durch interaktives Gameplay können Benutzer Bewältigungsstrategien entwickeln, Achtsamkeit üben, negative Denkmuster herausfordern und Widerstandsfähigkeit in einem ansprechenden und zugänglichen Format aufbauen.')
                : (langCode === 'en'
                  ? 'Community support plays a crucial role in mental health recovery and maintenance. Our forums are designed to complement professional care by providing peer connections, reducing isolation, and creating a sense of belonging.'
                  : 'Community-Unterstützung spielt eine entscheidende Rolle bei der Genesung und Aufrechterhaltung der psychischen Gesundheit. Unsere Foren sind darauf ausgelegt, professionelle Betreuung zu ergänzen, indem sie Peer-Verbindungen herstellen, Isolation reduzieren und ein Gefühl der Zugehörigkeit schaffen.')}
            </p>
          </div>
        }
        imageSrc={isTherapeutic ? '/images/Neuron.jpg' : '/images/smiley_art_on_floor.jpg'}
        imageAlt={service.names[langCode]}
        imagePosition="right"
        backgroundColor={isTherapeutic ? 'bg-primary-50 dark:bg-primary-950' : 'bg-secondary-50 dark:bg-secondary-950'}
      />
      
      {/* Benefits Section */}
      <section className="section bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <SectionTitle
            title={t('benefits')}
            subtitle={isTherapeutic
              ? (langCode === 'en'
                ? 'Discover the many ways our therapeutic gaming experiences can support your mental health journey.'
                : 'Entdecken Sie die vielen Möglichkeiten, wie unsere therapeutischen Spielerfahrungen Ihre psychische Gesundheitsreise unterstützen können.')
              : (langCode === 'en'
                ? 'Explore the advantages of joining our supportive community forums for mental wellbeing.'
                : 'Entdecken Sie die Vorteile, unseren unterstützenden Community-Foren für psychisches Wohlbefinden beizutreten.')}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-800 dark:text-primary-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {isTherapeutic
                  ? (langCode === 'en' ? 'Evidence-Based Approach' : 'Evidenzbasierter Ansatz')
                  : (langCode === 'en' ? 'Safe Environment' : 'Sichere Umgebung')}
              </h3>
              <p>
                {isTherapeutic
                  ? (langCode === 'en'
                    ? 'Our games are developed based on established psychological principles and therapeutic techniques.'
                    : 'Unsere Spiele werden auf der Grundlage etablierter psychologischer Prinzipien und therapeutischer Techniken entwickelt.')
                  : (langCode === 'en'
                    ? 'Our forums are carefully moderated to ensure a supportive, respectful, and judgment-free environment.'
                    : 'Unsere Foren werden sorgfältig moderiert, um eine unterstützende, respektvolle und urteilsfreie Umgebung zu gewährleisten.')}
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-800 dark:text-primary-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {isTherapeutic
                  ? (langCode === 'en' ? 'Accessible Anytime' : 'Jederzeit zugänglich')
                  : (langCode === 'en' ? '24/7 Support' : '24/7 Unterstützung')}
              </h3>
              <p>
                {isTherapeutic
                  ? (langCode === 'en'
                    ? 'Access therapeutic support whenever you need it, without waiting for appointments or traveling to a clinic.'
                    : 'Greifen Sie auf therapeutische Unterstützung zu, wann immer Sie sie benötigen, ohne auf Termine zu warten oder zu einer Klinik zu reisen.')
                  : (langCode === 'en'
                    ? 'Our community is active around the clock, providing support whenever you need it most.'
                    : 'Unsere Community ist rund um die Uhr aktiv und bietet Unterstützung, wann immer Sie sie am meisten benötigen.')}
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-800 dark:text-primary-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {isTherapeutic
                  ? (langCode === 'en' ? 'Engaging Experience' : 'Ansprechende Erfahrung')
                  : (langCode === 'en' ? 'Shared Experiences' : 'Geteilte Erfahrungen')}
              </h3>
              <p>
                {isTherapeutic
                  ? (langCode === 'en'
                    ? 'Our games are designed to be enjoyable and engaging, making therapeutic activities something you look forward to.'
                    : 'Unsere Spiele sind so konzipiert, dass sie unterhaltsam und ansprechend sind, wodurch therapeutische Aktivitäten zu etwas werden, auf das Sie sich freuen.')
                  : (langCode === 'en'
                    ? 'Connect with others who understand what you\'re going through and learn from their experiences and insights.'
                    : 'Verbinden Sie sich mit anderen, die verstehen, was Sie durchmachen, und lernen Sie aus ihren Erfahrungen und Erkenntnissen.')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Game Categories Section */}
      <section className="section bg-neutral-50 dark:bg-neutral-800">
        <div className="container-custom">
          <SectionTitle
            title={langCode === 'en' ? 'Explore Our Game Categories' : 'Entdecken Sie unsere Spielkategorien'}
            subtitle={langCode === 'en'
              ? `Discover how our ${service.names[langCode].toLowerCase()} can help with different aspects of mental wellbeing through various game types.`
              : `Entdecken Sie, wie unsere ${service.names[langCode].toLowerCase()} durch verschiedene Spieltypen bei verschiedenen Aspekten des psychischen Wohlbefindens helfen können.`}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gameIds.map((gameId) => (
              <FeatureCard
                key={gameId}
                lang={langCode}
                title={getGameName(gameId, langCode)}
                description={langCode === 'en'
                  ? `Explore our ${service.names[langCode].toLowerCase()} for ${getGameName(gameId, langCode).toLowerCase()} and discover how they can support your mental wellbeing.`
                  : `Entdecken Sie unsere ${service.names[langCode].toLowerCase()} für ${getGameName(gameId, langCode).toLowerCase()} und erfahren Sie, wie sie Ihr psychisches Wohlbefinden unterstützen können.`}
                imageSrc={gameId === 'puzzle' 
                  ? '/images/keyboard_with_glowing_LEDS.jpg'
                  : gameId === 'narrative'
                  ? '/images/gaming_chair_and_environment.jpg'
                  : gameId === 'relaxation'
                  ? '/images/smiley_art_on_floor.jpg'
                  : '/images/glowing_Computer_board.jpg'}
                imageAlt={getGameName(gameId, langCode)}
                link={`/${langCode}/${getServiceSlug(serviceId, langCode)}/${getGameSlug(gameId, langCode)}`}
                variant={isTherapeutic ? 'primary' : 'secondary'}
                imagePosition="left"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-white dark:bg-neutral-900">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {langCode === 'en'
              ? `Ready to experience our ${service.names[langCode].toLowerCase()}?`
              : `Bereit, unsere ${service.names[langCode].toLowerCase()} zu erleben?`}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {isTherapeutic
              ? (langCode === 'en'
                ? 'Start your mental wellbeing journey today with our engaging therapeutic games.'
                : 'Beginnen Sie noch heute Ihre Reise zum psychischen Wohlbefinden mit unseren ansprechenden therapeutischen Spielen.')
              : (langCode === 'en'
                ? 'Join our supportive community today and connect with others on their mental health journey.'
                : 'Treten Sie noch heute unserer unterstützenden Community bei und verbinden Sie sich mit anderen auf ihrer Reise zur psychischen Gesundheit.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${langCode}/${getServiceSlug(serviceId, langCode)}/${getGameSlug('puzzle', langCode)}`} className={isTherapeutic ? 'btn-primary' : 'btn-secondary'}>
              {t('getStarted')}
            </Link>
            <Link href={`/${langCode}/contact`} className="btn-outline">
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Generate static params for all supported languages and services
export function generateStaticParams() {
  const params: { lang: string; serviceSlug: string }[] = [];
  
  ['en', 'de'].forEach(lang => {
    Object.keys(services).forEach(serviceId => {
      params.push({
        lang,
        serviceSlug: services[serviceId as ServiceId].slugs[lang as Language],
      });
    });
  });
  
  return params;
}
