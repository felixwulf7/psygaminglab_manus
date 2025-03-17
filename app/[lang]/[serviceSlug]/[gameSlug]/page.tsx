import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, services, ServiceId } from '@/app/config/services';
import { getGameBySlug, games, GameId } from '@/app/config/games';
import { getTranslation, TranslationKey, getServiceSlug } from '@/app/utils/translations';
import { generateServiceGameMetadata } from '@/app/utils/metadata';
import { 
  getFeatureTitle, 
  getFeatureContent, 
  getBenefitTitle, 
  getBenefitContent, 
  getStepTitle, 
  getStepContent,
  getServiceGameImage
} from '@/app/utils/serviceGameHelpers';

// Components
import { HeroSection } from '@/app/components/service-game/HeroSection';
import { FeatureSection } from '@/app/components/service-game/FeatureSection';
import { BenefitsSection } from '@/app/components/service-game/BenefitsSection';
import { StepsSection } from '@/app/components/service-game/StepsSection';
import { CallToAction } from '@/app/components/service-game/CallToAction';

// Icons for benefits
import { 
  BrainIcon, 
  HeartIcon, 
  MeditationIcon, 
  BookOpenIcon, 
  UsersIcon, 
  ChatBubbleIcon, 
  ClockIcon, 
  PuzzleIcon 
} from '@/app/components/service-game/icons';

// Types
type PageProps = {
  params: {
    lang: string;
    serviceSlug: string;
    gameSlug: string;
  };
};

// Generate static params for all service+game combinations
export async function generateStaticParams() {
  const params: { lang: string; serviceSlug: string; gameSlug: string }[] = [];
  
  // Languages
  const languages = ['en', 'de'];
  
  // For each language, generate all service+game combinations
  languages.forEach(lang => {
    Object.keys(services).forEach(serviceId => {
      const serviceSlug = services[serviceId as ServiceId].slugs[lang as 'en' | 'de'];
      
      Object.keys(games).forEach(gameId => {
        const gameSlug = games[gameId as GameId].slugs[lang as 'en' | 'de'];
        
        params.push({
          lang,
          serviceSlug,
          gameSlug
        });
      });
    });
  });
  
  return params;
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, serviceSlug, gameSlug } = params;
  
  // Get service and game IDs from slugs
  const serviceId = getServiceBySlug(serviceSlug, lang);
  const gameId = getGameBySlug(gameSlug, lang);
  
  if (!serviceId || !gameId) {
    return {};
  }
  
  return generateServiceGameMetadata(serviceId, gameId, lang as 'en' | 'de');
}

// Page component
export default function ServiceGamePage({ params }: PageProps) {
  const { lang, serviceSlug, gameSlug } = params;
  
  // Get service and game IDs from slugs
  const serviceId = getServiceBySlug(serviceSlug, lang);
  const gameId = getGameBySlug(gameSlug, lang);
  
  // If service or game not found, return 404
  if (!serviceId || !gameId) {
    notFound();
  }
  
  const service = services[serviceId];
  const game = games[gameId];
  
  // Get translations with fallback for missing keys
  const t = (key: string) => {
    // Define custom translations that aren't in the main translation file
    const customTranslations: Record<string, Record<string, string>> = {
      en: {
        discover: 'Discover',
        how: 'how',
        combined_with: 'combined with',
        can_improve: 'can improve',
        mental_wellbeing: 'mental wellbeing',
        key_benefits: 'Key Benefits',
        benefits_subtitle: 'Experience these powerful advantages when you engage with our platform',
        how_it_works: 'How It Works',
        steps_subtitle: 'Follow these simple steps to get started on your wellness journey',
        ready_to_start: 'Ready to Start Your Journey?',
        cta_content: 'Contact us today to learn more about how our services can help you achieve better mental wellbeing.'
      },
      de: {
        discover: 'Entdecken Sie',
        how: 'wie',
        combined_with: 'kombiniert mit',
        can_improve: 'verbessern kann',
        mental_wellbeing: 'psychisches Wohlbefinden',
        key_benefits: 'Hauptvorteile',
        benefits_subtitle: 'Erleben Sie diese leistungsstarken Vorteile, wenn Sie mit unserer Plattform interagieren',
        how_it_works: 'Wie es funktioniert',
        steps_subtitle: 'Folgen Sie diesen einfachen Schritten, um Ihre Wellness-Reise zu beginnen',
        ready_to_start: 'Bereit, Ihre Reise zu beginnen?',
        cta_content: 'Kontaktieren Sie uns noch heute, um mehr darüber zu erfahren, wie unsere Dienstleistungen Ihnen helfen können, ein besseres psychisches Wohlbefinden zu erreichen.'
      }
    };
    
    // Try to get the translation from the main translations
    try {
      return getTranslation(key as TranslationKey, lang as 'en' | 'de');
    } catch {
      // If not found, try to get it from custom translations
      return customTranslations[lang]?.[key] || key;
    }
  };
  
  // Generate page title and subtitle
  const pageTitle = `${service.names[lang as 'en' | 'de']} for ${game.names[lang as 'en' | 'de']}`;
  const pageSubtitle = `${t('discover')} ${t('how')} ${service.names[lang as 'en' | 'de'].toLowerCase()} ${t('combined_with')} ${game.names[lang as 'en' | 'de'].toLowerCase()} ${t('can_improve')} ${t('mental_wellbeing')}.`;
  
  // Get image for the hero section
  const heroImage = getServiceGameImage(serviceId, gameId);
  
  // Generate benefits with icons
  const benefits = [
    {
      title: getBenefitTitle(serviceId, gameId, 0, lang),
      content: getBenefitContent(serviceId, gameId, 0, lang),
      icon: serviceId === 'therapeutic' ? 
        (gameId === 'puzzle' ? <BrainIcon /> : 
         gameId === 'narrative' ? <HeartIcon /> : 
         gameId === 'relaxation' ? <MeditationIcon /> : 
         <BookOpenIcon />) : 
        (gameId === 'puzzle' ? <PuzzleIcon /> : 
         gameId === 'narrative' ? <ChatBubbleIcon /> : 
         gameId === 'relaxation' ? <ClockIcon /> : 
         <UsersIcon />)
    },
    {
      title: getBenefitTitle(serviceId, gameId, 1, lang),
      content: getBenefitContent(serviceId, gameId, 1, lang),
      icon: serviceId === 'therapeutic' ? 
        (gameId === 'puzzle' ? <MeditationIcon /> : 
         gameId === 'narrative' ? <BookOpenIcon /> : 
         gameId === 'relaxation' ? <HeartIcon /> : 
         <BrainIcon />) : 
        (gameId === 'puzzle' ? <UsersIcon /> : 
         gameId === 'narrative' ? <PuzzleIcon /> : 
         gameId === 'relaxation' ? <ChatBubbleIcon /> : 
         <ClockIcon />)
    },
    {
      title: getBenefitTitle(serviceId, gameId, 2, lang),
      content: getBenefitContent(serviceId, gameId, 2, lang),
      icon: serviceId === 'therapeutic' ? 
        (gameId === 'puzzle' ? <BookOpenIcon /> : 
         gameId === 'narrative' ? <BrainIcon /> : 
         gameId === 'relaxation' ? <ClockIcon /> : 
         <HeartIcon />) : 
        (gameId === 'puzzle' ? <ChatBubbleIcon /> : 
         gameId === 'narrative' ? <ClockIcon /> : 
         gameId === 'relaxation' ? <UsersIcon /> : 
         <PuzzleIcon />)
    }
  ];
  
  // Generate steps
  const steps = [
    {
      title: getStepTitle(serviceId, gameId, 0, lang),
      content: getStepContent(serviceId, gameId, 0, lang)
    },
    {
      title: getStepTitle(serviceId, gameId, 1, lang),
      content: getStepContent(serviceId, gameId, 1, lang)
    },
    {
      title: getStepTitle(serviceId, gameId, 2, lang),
      content: getStepContent(serviceId, gameId, 2, lang)
    },
    {
      title: getStepTitle(serviceId, gameId, 3, lang),
      content: getStepContent(serviceId, gameId, 3, lang)
    },
    {
      title: getStepTitle(serviceId, gameId, 4, lang),
      content: getStepContent(serviceId, gameId, 4, lang)
    }
  ];
  
  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title={pageTitle}
        subtitle={pageSubtitle}
        serviceName={service.names[lang as 'en' | 'de']}
        gameName={game.names[lang as 'en' | 'de']}
        imagePath={heroImage}
        lang={lang as 'en' | 'de'}
        ctaLink={`/${lang}/contact`}
        secondaryCtaLink={`/${lang}/${getServiceSlug(serviceId, lang as 'en' | 'de')}`}
      />
      
      {/* Feature Sections */}
      <FeatureSection
        title={getFeatureTitle(serviceId, gameId, 0, lang)}
        content={getFeatureContent(serviceId, gameId, 0, lang)}
        imagePath={getServiceGameImage(serviceId === 'therapeutic' ? 'community' : 'therapeutic', gameId)}
        imageAlt={`${service.names[lang as 'en' | 'de']} with ${game.names[lang as 'en' | 'de']}`}
      />
      
      {/* Benefits Section */}
      <BenefitsSection
        title={t('key_benefits')}
        subtitle={t('benefits_subtitle')}
        benefits={benefits}
      />
      
      {/* Feature Section (Reversed) */}
      <FeatureSection
        title={getFeatureTitle(serviceId, gameId, 1, lang)}
        content={getFeatureContent(serviceId, gameId, 1, lang)}
        imagePath={getServiceGameImage(serviceId, gameId === 'puzzle' ? 'narrative' : gameId === 'narrative' ? 'relaxation' : gameId === 'relaxation' ? 'interactive' : 'puzzle')}
        imageAlt={`${service.names[lang as 'en' | 'de']} with ${game.names[lang as 'en' | 'de']}`}
        reverse={true}
      />
      
      {/* Steps Section */}
      <StepsSection
        title={t('how_it_works')}
        subtitle={t('steps_subtitle')}
        steps={steps}
      />
      
      {/* Call to Action */}
      <CallToAction
        title={t('ready_to_start')}
        content={t('cta_content')}
        buttonText={t('get_started')}
        buttonLink={`/${lang}/contact`}
        bgImage={getServiceGameImage(serviceId === 'therapeutic' ? 'community' : 'therapeutic', gameId === 'puzzle' ? 'narrative' : gameId === 'narrative' ? 'relaxation' : gameId === 'relaxation' ? 'interactive' : 'puzzle')}
      />
    </main>
  );
}
