import { Metadata } from 'next';
import { Language, isValidLanguage } from '../../config/languages';
import { getTranslation, TranslationKey } from '../../utils/translations';
import { generateContactMetadata } from '../../utils/metadata';
import Hero from '../../components/Hero';
import SectionTitle from '../../components/SectionTitle';
import ContactForm from '../../components/ContactForm';

interface ContactPageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  // Validate language
  if (!isValidLanguage(params.lang)) {
    return {};
  }
  
  // Generate metadata for the contact page
  return generateContactMetadata(params.lang as Language);
}

export default function ContactPage({ params }: ContactPageProps) {
  // Validate language parameter
  if (!isValidLanguage(params.lang)) {
    return null;
  }
  
  const lang = params.lang as Language;
  const t = (key: TranslationKey) => getTranslation(key, lang);
  
  // Hero content based on language
  const heroTitle = lang === 'en' 
    ? 'Get in Touch'
    : 'Kontaktieren Sie uns';
  
  const heroSubtitle = lang === 'en'
    ? 'Have questions about our therapeutic gaming experiences? We\'d love to hear from you.'
    : 'Haben Sie Fragen zu unseren therapeutischen Spielerfahrungen? Wir würden gerne von Ihnen hören.';
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        lang={lang}
        title={heroTitle}
        subtitle={heroSubtitle}
        imageSrc="/images/keyboard_with_glowing_LEDS.jpg"
        imageAlt="Keyboard with glowing LEDs"
        overlayColor="bg-gradient-to-r from-secondary-900/80 to-secondary-800/60"
        size="medium"
      />
      
      {/* Contact Section */}
      <section className="section bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div>
              <SectionTitle
                title={t('contactUs')}
                subtitle={lang === 'en'
                  ? 'Fill out the form below and we\'ll get back to you as soon as possible.'
                  : 'Füllen Sie das untenstehende Formular aus und wir werden uns so schnell wie möglich bei Ihnen melden.'}
                align="left"
              />
              
              <ContactForm lang={lang} />
            </div>
            
            {/* About Me */}
            <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">{t('aboutUs')}</h2>
              
              <div className="flex items-center mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4">
                  <div className="absolute inset-0 bg-primary-800 flex items-center justify-center text-white text-2xl font-bold">
                    F
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Felix</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {lang === 'en' ? 'Developer from Leipzig' : 'Entwickler aus Leipzig'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p>
                  {lang === 'en'
                    ? 'Hello, I am Felix – a dedicated developer from Leipzig with a passion for making the world a better place through innovative programming and modern technologies. In addition to studying Business, I deeply engage in Psychology and Artificial Intelligence to better understand human behavior and data-driven processes, integrating these insights into forward-thinking software solutions.'
                    : 'Hallo, ich bin Felix – ein engagierter Entwickler aus Leipzig mit einer Leidenschaft dafür, die Welt durch innovative Programmierung und moderne Technologien zu einem besseren Ort zu machen. Neben meinem Wirtschaftsstudium beschäftige ich mich intensiv mit Psychologie und Künstlicher Intelligenz, um menschliches Verhalten und datengesteuerte Prozesse besser zu verstehen und diese Erkenntnisse in zukunftsorientierte Softwarelösungen zu integrieren.'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'I believe that challenges—even in the realm of mental health—make us stronger and inspire us to contribute creatively and sustainably. This conviction drives me to optimize complex systems and implement projects that are not only technologically advanced but also socially relevant.'
                    : 'Ich glaube, dass Herausforderungen – selbst im Bereich der psychischen Gesundheit – uns stärker machen und uns inspirieren, kreativ und nachhaltig beizutragen. Diese Überzeugung treibt mich an, komplexe Systeme zu optimieren und Projekte umzusetzen, die nicht nur technologisch fortschrittlich, sondern auch gesellschaftlich relevant sind.'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'With my interdisciplinary background, I combine economic insight, psychological understanding, and technical expertise to develop tailored digital solutions. I adhere to the highest quality standards—much like the renowned brands I program for.'
                    : 'Mit meinem interdisziplinären Hintergrund verbinde ich wirtschaftliche Einsicht, psychologisches Verständnis und technisches Fachwissen, um maßgeschneiderte digitale Lösungen zu entwickeln. Ich halte mich an höchste Qualitätsstandards – ähnlich wie die renommierten Marken, für die ich programmiere.'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'I look forward to using my skills and ideas to drive innovative projects and shape the future together.'
                    : 'Ich freue mich darauf, meine Fähigkeiten und Ideen einzusetzen, um innovative Projekte voranzutreiben und die Zukunft gemeinsam zu gestalten.'}
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="font-bold mb-4">{t('contactUs')}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-primary-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a href="mailto:felixwulf7@gmail.com" className="hover:text-primary-800 transition-colors">
                      felixwulf7@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 mt-0.5 text-primary-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Leipzig, Germany</span>
                  </div>
                </div>
              </div>
            </div>
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
