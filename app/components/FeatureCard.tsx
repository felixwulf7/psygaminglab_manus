import Image from 'next/image';
import Link from 'next/link';
import { Language } from '../config/languages';
import { getTranslation, TranslationKey } from '../utils/translations';

interface FeatureCardProps {
  lang: Language;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  ctaText?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  imagePosition?: 'top' | 'left' | 'right' | 'background';
  aspectRatio?: 'auto' | 'square' | 'video' | 'wide';
}

export default function FeatureCard({
  lang,
  title,
  description,
  imageSrc,
  imageAlt,
  link,
  ctaText,
  variant = 'default',
  imagePosition = 'top',
  aspectRatio = 'auto',
}: FeatureCardProps) {
  const t = (key: TranslationKey) => getTranslation(key, lang);

  // Determine card styling based on variant
  const cardStyles = {
    default: 'bg-white dark:bg-neutral-800',
    primary: 'bg-primary-50 dark:bg-primary-900',
    secondary: 'bg-secondary-50 dark:bg-secondary-900',
    accent: 'bg-accent-50 dark:bg-accent-900',
  };

  // Determine button styling based on variant
  const buttonStyles = {
    default: 'btn-outline',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
  };

  // Determine aspect ratio
  const aspectRatioClasses = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
  };

  // Determine layout based on image position
  if (imagePosition === 'background') {
    return (
      <Link href={link} className="group block relative overflow-hidden rounded-lg shadow-md h-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
        </div>
        <div className="relative z-10 p-6 flex flex-col h-full justify-end">
          <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/80 mb-4 line-clamp-3">{description}</p>
          <span className="text-white font-medium inline-flex items-center">
            {ctaText || t('learnMore')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    );
  }

  // Horizontal layout (image left or right)
  if (imagePosition === 'left' || imagePosition === 'right') {
    return (
      <div className={`rounded-lg shadow-md overflow-hidden ${cardStyles[variant]} h-full`}>
        <div className={`flex flex-col md:flex-row ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-2/5 relative">
            <div className={`w-full h-full ${aspectRatioClasses[aspectRatio]}`}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="md:w-3/5 p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="mb-4 flex-grow">{description}</p>
            <Link href={link} className={buttonStyles[variant]}>
              {ctaText || t('learnMore')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default vertical layout (image top)
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${cardStyles[variant]} h-full flex flex-col`}>
      <div className={`relative ${aspectRatioClasses[aspectRatio]}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="mb-4 flex-grow">{description}</p>
        <Link href={link} className={buttonStyles[variant]}>
          {ctaText || t('learnMore')}
        </Link>
      </div>
    </div>
  );
}
