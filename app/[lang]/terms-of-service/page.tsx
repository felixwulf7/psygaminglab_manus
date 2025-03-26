import { Metadata } from 'next';
import Link from 'next/link';
import { Language, isValidLanguage } from '../../config/languages';
import { getTranslation, TranslationKey } from '../../utils/translations';

interface TermsOfServicePageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: TermsOfServicePageProps): Promise<Metadata> {
  // Validate language
  const lang = await params.lang;
  if (!isValidLanguage(lang)) {
    return {};
  }
  
  // Set metadata based on language
  const title = lang === 'en' ? 'Terms of Service' : 'Nutzungsbedingungen';
  const description = lang === 'en' 
    ? 'Terms of Service for PsyGamingLab'
    : 'Nutzungsbedingungen für PsyGamingLab';
  
  return {
    title,
    description,
  };
}

export default async function TermsOfServicePage({ params }: TermsOfServicePageProps) {
  // Validate language parameter
  const lang = await params.lang;
  if (!isValidLanguage(lang)) {
    return null;
  }
  
  const langCode = lang as Language;
  const t = (key: TranslationKey) => getTranslation(key, langCode);
  
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {langCode === 'en' ? 'Terms of Service' : 'Nutzungsbedingungen'}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl">
            {langCode === 'en' 
              ? 'Please read these terms carefully before using our platform.'
              : 'Bitte lesen Sie diese Bedingungen sorgfältig durch, bevor Sie unsere Plattform nutzen.'}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2>{langCode === 'en' ? 'Terms of Use' : 'Nutzungsbedingungen'}</h2>
              <p>
                {langCode === 'en'
                  ? 'These Terms of Service ("Terms") govern your access to and use of PsyGamingLab\'s website, services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.'
                  : 'Diese Nutzungsbedingungen ("Bedingungen") regeln Ihren Zugang zu und die Nutzung der Website, Dienste und Anwendungen von PsyGamingLab (zusammen die "Dienste"). Durch den Zugriff auf oder die Nutzung unserer Dienste erklären Sie sich mit diesen Bedingungen einverstanden.'}
              </p>
              
              <h3>{langCode === 'en' ? '1. Acceptance of Terms' : '1. Annahme der Bedingungen'}</h3>
              <p>
                {langCode === 'en'
                  ? 'By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.'
                  : 'Durch den Zugriff auf oder die Nutzung unserer Dienste erklären Sie sich mit diesen Bedingungen einverstanden. Wenn Sie diesen Bedingungen nicht zustimmen, dürfen Sie nicht auf die Dienste zugreifen oder diese nutzen.'}
              </p>
              
              <h3>{langCode === 'en' ? '2. Changes to Terms' : '2. Änderungen der Bedingungen'}</h3>
              <p>
                {langCode === 'en'
                  ? 'We may modify the Terms at any time, at our sole discretion. If we do so, we\'ll let you know either by posting the modified Terms on the Site or through other communications. It\'s important that you review the Terms whenever we modify them because if you continue to use the Services after we have posted modified Terms on the Site, you are indicating to us that you agree to be bound by the modified Terms.'
                  : 'Wir können die Bedingungen jederzeit nach eigenem Ermessen ändern. Wenn wir dies tun, werden wir Sie entweder durch Veröffentlichung der geänderten Bedingungen auf der Website oder durch andere Mitteilungen informieren. Es ist wichtig, dass Sie die Bedingungen überprüfen, wenn wir sie ändern, denn wenn Sie die Dienste weiterhin nutzen, nachdem wir geänderte Bedingungen auf der Website veröffentlicht haben, zeigen Sie uns damit an, dass Sie sich mit den geänderten Bedingungen einverstanden erklären.'}
              </p>
              
              <h3>{langCode === 'en' ? '3. Privacy Policy' : '3. Datenschutzrichtlinie'}</h3>
              <p>
                {langCode === 'en'
                  ? 'Please refer to our Privacy Policy for information on how we collect, use and disclose information from our users. You acknowledge and agree that your use of the Services is subject to our Privacy Policy.'
                  : 'Bitte beachten Sie unsere Datenschutzrichtlinie für Informationen darüber, wie wir Informationen von unseren Nutzern sammeln, verwenden und offenlegen. Sie bestätigen und stimmen zu, dass Ihre Nutzung der Dienste unserer Datenschutzrichtlinie unterliegt.'}
              </p>
              
              <h3>{langCode === 'en' ? '4. Disclaimer' : '4. Haftungsausschluss'}</h3>
              <p>
                {langCode === 'en'
                  ? 'The Services are provided for educational and self-help purposes only and are not intended to replace professional mental health care. We do not provide medical advice, diagnosis, or treatment. If you\'re experiencing a mental health crisis, please contact a qualified healthcare provider or emergency services immediately.'
                  : 'Die Dienste werden nur zu Bildungs- und Selbsthilfezwecken bereitgestellt und sollen professionelle psychische Gesundheitsversorgung nicht ersetzen. Wir bieten keine medizinische Beratung, Diagnose oder Behandlung an. Wenn Sie eine psychische Gesundheitskrise erleben, wenden Sie sich bitte sofort an einen qualifizierten Gesundheitsdienstleister oder Notdienst.'}
              </p>
              
              <h3>{langCode === 'en' ? '5. User Content' : '5. Benutzerinhalte'}</h3>
              <p>
                {langCode === 'en'
                  ? 'Our Services may allow you to create, upload, or share content. You retain all rights in, and are solely responsible for, the content you post to the Services. By making any content available through the Services, you grant us a non-exclusive, transferable, sublicensable, worldwide, royalty-free license to use, copy, modify, and display the content in connection with operating and providing the Services.'
                  : 'Unsere Dienste können es Ihnen ermöglichen, Inhalte zu erstellen, hochzuladen oder zu teilen. Sie behalten alle Rechte an den Inhalten, die Sie in den Diensten veröffentlichen, und sind allein dafür verantwortlich. Indem Sie Inhalte über die Dienste zur Verfügung stellen, gewähren Sie uns eine nicht-exklusive, übertragbare, unterlizenzierbare, weltweite, gebührenfreie Lizenz zur Nutzung, Kopie, Änderung und Anzeige der Inhalte im Zusammenhang mit dem Betrieb und der Bereitstellung der Dienste.'}
              </p>
              
              <h3>{langCode === 'en' ? '6. Termination' : '6. Kündigung'}</h3>
              <p>
                {langCode === 'en'
                  ? 'We may terminate or suspend your access to all or part of the Services, without notice, for any conduct that we, in our sole discretion, believe is in violation of any applicable law or is harmful to the interests of another user, a third-party, or us.'
                  : 'Wir können Ihren Zugang zu allen oder einem Teil der Dienste ohne Vorankündigung für jedes Verhalten kündigen oder aussetzen, das nach unserem alleinigen Ermessen gegen geltendes Recht verstößt oder den Interessen eines anderen Nutzers, eines Dritten oder uns schadet.'}
              </p>
              
              <h3>{langCode === 'en' ? '7. Contact Information' : '7. Kontaktinformationen'}</h3>
              <p>
                {langCode === 'en'
                  ? 'If you have any questions about these Terms, please contact us at: support@psygaminglab.com'
                  : 'Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte unter: support@psygaminglab.com'}
              </p>
              
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-8">
                {langCode === 'en'
                  ? 'Last updated: March 2024'
                  : 'Zuletzt aktualisiert: März 2024'}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back to Home */}
      <section className="py-8 bg-neutral-100 dark:bg-neutral-800">
        <div className="container-custom text-center">
          <Link href={`/${langCode}`} className="btn-outline">
            {langCode === 'en' ? 'Back to Home' : 'Zurück zur Startseite'}
          </Link>
        </div>
      </section>
    </div>
  );
}

// Generate static params for all supported languages
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }];
}
