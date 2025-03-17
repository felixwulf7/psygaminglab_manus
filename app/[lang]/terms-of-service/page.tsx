import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Language, isValidLanguage } from '../../config/languages';
import Hero from '../../components/Hero';
import SectionTitle from '../../components/SectionTitle';

interface TermsOfServicePageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: TermsOfServicePageProps): Promise<Metadata> {
  // Validate language
  if (!isValidLanguage(params.lang)) {
    return {};
  }
  
  const lang = params.lang as Language;
  
  return {
    title: lang === 'en' ? 'Terms of Service | PsyGamingLab' : 'Nutzungsbedingungen | PsyGamingLab',
    description: lang === 'en' 
      ? 'Terms of Service for PsyGamingLab. Learn about the terms and conditions that govern your use of our services.'
      : 'Nutzungsbedingungen für PsyGamingLab. Erfahren Sie mehr über die Bedingungen, die Ihre Nutzung unserer Dienste regeln.',
  };
}

export default function TermsOfServicePage({ params }: TermsOfServicePageProps) {
  // Validate language parameter
  if (!isValidLanguage(params.lang)) {
    notFound();
  }
  
  const lang = params.lang as Language;
  
  // Hero content based on language
  const heroTitle = lang === 'en' 
    ? 'Terms of Service'
    : 'Nutzungsbedingungen';
  
  const heroSubtitle = lang === 'en'
    ? 'Please read these terms carefully before using our services.'
    : 'Bitte lesen Sie diese Bedingungen sorgfältig durch, bevor Sie unsere Dienste nutzen.';
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        lang={lang}
        title={heroTitle}
        subtitle={heroSubtitle}
        imageSrc="/images/gaming_chair_and_environment.jpg"
        imageAlt="Terms of Service"
        overlayColor="bg-gradient-to-r from-secondary-900/80 to-secondary-800/60"
        size="small"
      />
      
      {/* Terms of Service Content */}
      <section className="section bg-white dark:bg-neutral-900">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            title={heroTitle}
            subtitle={heroSubtitle}
          />
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Last updated: March 7, 2025</p>
            
            <h2>Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and PsyGamingLab (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of the PsyGamingLab website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the &quot;Site&quot;).
            </p>
            <p>
              You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
            </p>
            
            <h2>Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws.
            </p>
            
            <h2>User Representations</h2>
            <p>
              By using the Site, you represent and warrant that:
            </p>
            <ol>
              <li>All registration information you submit will be true, accurate, current, and complete;</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service;</li>
              <li>You are not a minor in the jurisdiction in which you reside;</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise;</li>
              <li>You will not use the Site for any illegal or unauthorized purpose;</li>
              <li>Your use of the Site will not violate any applicable law or regulation.</li>
            </ol>
            
            <h2>Disclaimer</h2>
            <p>
              THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            
            <h2>Limitations of Liability</h2>
            <p>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            
            <h2>Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&apos; fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Site; (3) breach of these Terms of Service; (4) any breach of your representations and warranties set forth in these Terms of Service; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Site with whom you connected via the Site.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about these Terms of Service, please contact us at:
            </p>
            <p>
              PsyGamingLab<br />
              Leipzig, Germany<br />
              Email: felixwulf7@gmail.com
            </p>
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
