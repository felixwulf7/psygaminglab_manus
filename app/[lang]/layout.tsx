import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Language, isValidLanguage } from '../config/languages';
import { generateHomeMetadata } from '../utils/metadata';

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: LanguageLayoutProps): Promise<Metadata> {
  // Validate language
  if (!isValidLanguage(params.lang)) {
    return {};
  }
  
  // Generate metadata for the language
  return generateHomeMetadata(params.lang as Language);
}

export default function LanguageLayout({ children, params }: LanguageLayoutProps) {
  // Validate language parameter
  if (!isValidLanguage(params.lang)) {
    notFound();
  }
  
  const lang = params.lang as Language;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} />
      <main className="flex-grow">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}

// Generate static params for all supported languages
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }];
}
