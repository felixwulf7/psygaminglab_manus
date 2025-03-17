import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Language, isValidLanguage } from '../../config/languages';
import Hero from '../../components/Hero';
import SectionTitle from '../../components/SectionTitle';

interface PrivacyPolicyPageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  // Validate language
  if (!isValidLanguage(params.lang)) {
    return {};
  }
  
  const lang = params.lang as Language;
  
  return {
    title: lang === 'en' ? 'Privacy Policy | PsyGamingLab' : 'Datenschutzrichtlinie | PsyGamingLab',
    description: lang === 'en' 
      ? 'Privacy Policy for PsyGamingLab. Learn how we collect, use, and protect your personal information.'
      : 'Datenschutzrichtlinie für PsyGamingLab. Erfahren Sie, wie wir Ihre persönlichen Daten sammeln, verwenden und schützen.',
  };
}

export default function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  // Validate language parameter
  if (!isValidLanguage(params.lang)) {
    notFound();
  }
  
  const lang = params.lang as Language;
  
  // Hero content based on language
  const heroTitle = lang === 'en' 
    ? 'Privacy Policy'
    : 'Datenschutzrichtlinie';
  
  const heroSubtitle = lang === 'en'
    ? 'Learn how we collect, use, and protect your personal information.'
    : 'Erfahren Sie, wie wir Ihre persönlichen Daten sammeln, verwenden und schützen.';
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        lang={lang}
        title={heroTitle}
        subtitle={heroSubtitle}
        imageSrc="/images/Neuron.jpg"
        imageAlt="Privacy Policy"
        overlayColor="bg-gradient-to-r from-primary-900/80 to-primary-800/60"
        size="small"
      />
      
      {/* Privacy Policy Content */}
      <section className="section bg-white dark:bg-neutral-900">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            title={heroTitle}
            subtitle={heroSubtitle}
          />
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Last updated: March 7, 2025</p>
            
            <h2>Introduction</h2>
            <p>
              PsyGamingLab (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            
            <h2>Collection of Your Information</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect via the website includes:
            </p>
            
            <h3>Personal Data</h3>
            <p>
              Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the website or when you choose to participate in various activities related to the website. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the website.
            </p>
            
            <h3>Derivative Data</h3>
            <p>
              Information our servers automatically collect when you access the website, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the website.
            </p>
            
            <h3>Financial Data</h3>
            <p>
              Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the website.
            </p>
            
            <h2>Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:
            </p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the website.</li>
              <li>Generate a personal profile about you to make future visits to the website more personalized.</li>
              <li>Increase the efficiency and operation of the website.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the website.</li>
              <li>Notify you of updates to the website.</li>
              <li>Offer new products, services, and/or recommendations to you.</li>
              <li>Perform other business activities as needed.</li>
              <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
              <li>Process payments and refunds.</li>
              <li>Request feedback and contact you about your use of the website.</li>
              <li>Resolve disputes and troubleshoot problems.</li>
              <li>Respond to product and customer service requests.</li>
              <li>Send you a newsletter.</li>
            </ul>
            
            <h2>Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            
            <h3>By Law or to Protect Rights</h3>
            <p>
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </p>
            
            <h3>Third-Party Service Providers</h3>
            <p>
              We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </p>
            
            <h3>Marketing Communications</h3>
            <p>
              With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.
            </p>
            
            <h3>Interactions with Other Users</h3>
            <p>
              If you interact with other users of the website, those users may see your name, profile photo, and descriptions of your activity.
            </p>
            
            <h3>Online Postings</h3>
            <p>
              When you post comments, contributions or other content to the website, your posts may be viewed by all users and may be publicly distributed outside the website in perpetuity.
            </p>
            
            <h2>Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
            
            <h2>Policy for Children</h2>
            <p>
              We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
            </p>
            
            <h2>Options Regarding Your Information</h2>
            <p>
              You may at any time review or change the information in your account or terminate your account by:
            </p>
            <ul>
              <li>Logging into your account settings and updating your account</li>
              <li>Contacting us using the contact information provided below</li>
            </ul>
            <p>
              Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
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
