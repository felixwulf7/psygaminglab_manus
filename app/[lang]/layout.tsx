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
  const lang = await params.lang;
  if (!isValidLanguage(lang)) {
    return {};
  }
  
  // Generate metadata for the language
  return generateHomeMetadata(lang as Language);
}

export default async function LanguageLayout({ children, params }: LanguageLayoutProps) {
  // Validate language parameter
  const lang = await params.lang;
  if (!isValidLanguage(lang)) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang as Language} />
      <main className="flex-grow">{children}</main>
      <Footer lang={lang as Language} />
    </div>
  );
}

// Generate static params for all supported languages
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }];
}
