import Image from 'next/image';
import Link from 'next/link';
import { Language } from '../config/languages';

interface HeroProps {
  lang: Language;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageSrc: string;
  imageAlt: string;
  overlayColor?: string;
  textColor?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  imageSrc,
  imageAlt,
  overlayColor = 'bg-black/50',
  textColor = 'text-white',
  align = 'center',
  size = 'large',
}: HeroProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const sizeClasses = {
    small: 'py-12 md:py-16',
    medium: 'py-16 md:py-24',
    large: 'py-20 md:py-32',
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${overlayColor}`}></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 container-custom ${sizeClasses[size]}`}>
        <div className={`flex flex-col ${alignmentClasses[align]} max-w-3xl mx-auto ${align === 'center' ? 'mx-auto' : ''}`}>
          <h1 className={`${textColor} mb-4 leading-tight`}>{title}</h1>
          <p className={`${textColor} text-lg md:text-xl mb-8 max-w-2xl`}>{subtitle}</p>

          {(ctaText || secondaryCtaText) && (
            <div className={`flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
              {ctaText && ctaLink && (
                <Link href={ctaLink} className="btn-primary">
                  {ctaText}
                </Link>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <Link href={secondaryCtaLink} className="btn-outline bg-white/10 text-white border-white/20">
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
