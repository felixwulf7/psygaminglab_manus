import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslation, TranslationKey } from '../../utils/translations';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  serviceName: string;
  gameName: string;
  imagePath: string;
  lang?: 'en' | 'de';
  ctaLink?: string;
  secondaryCtaLink?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  serviceName,
  gameName,
  imagePath,
  lang = 'en',
  ctaLink = '#',
  secondaryCtaLink = '#',
}) => {
  const t = (key: TranslationKey) => getTranslation(key, lang);
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imagePath}
          alt={`${serviceName} for ${gameName}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center mb-4">
            <span className="text-primary-400 font-medium">{serviceName}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-primary-400 font-medium">{gameName}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-gray-200 mb-8">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={ctaLink} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              {t('getStarted')}
            </Link>
            <Link href={secondaryCtaLink} className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition duration-300">
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
