import Image from 'next/image';
import { ReactNode } from 'react';

interface ContentBlockProps {
  title: string;
  content: string | ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right' | 'background' | 'none';
  backgroundColor?: string;
  textColor?: string;
  withIcon?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function ContentBlock({
  title,
  content,
  imageSrc,
  imageAlt = '',
  imagePosition = 'left',
  backgroundColor = 'bg-white dark:bg-neutral-900',
  textColor = 'text-neutral-900 dark:text-white',
  withIcon = false,
  icon,
  fullWidth = false,
}: ContentBlockProps) {
  // Content with background image
  if (imagePosition === 'background' && imageSrc) {
    return (
      <section className={`relative ${fullWidth ? '' : 'py-16 md:py-24'}`}>
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className={`relative z-10 ${fullWidth ? '' : 'container-custom'}`}>
          <div className="max-w-3xl mx-auto text-white py-16 md:py-24 px-4">
            {withIcon && icon && <div className="mb-6">{icon}</div>}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
            <div className="text-white/90 text-lg">{content}</div>
          </div>
        </div>
      </section>
    );
  }

  // Content with no image
  if (imagePosition === 'none') {
    return (
      <section className={`${backgroundColor} ${fullWidth ? '' : 'py-16 md:py-24'}`}>
        <div className={`${fullWidth ? '' : 'container-custom'}`}>
          <div className="max-w-3xl mx-auto px-4">
            {withIcon && icon && <div className="mb-6">{icon}</div>}
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textColor}`}>{title}</h2>
            <div className={`${textColor} opacity-90 text-lg`}>{content}</div>
          </div>
        </div>
      </section>
    );
  }

  // Content with image on left or right
  return (
    <section className={`${backgroundColor} ${fullWidth ? '' : 'py-16 md:py-24'}`}>
      <div className={`${fullWidth ? '' : 'container-custom'}`}>
        <div className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 lg:gap-16`}>
          {/* Image */}
          {imageSrc && (
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="w-full md:w-1/2 px-4 md:px-0">
            {withIcon && icon && <div className="mb-6">{icon}</div>}
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textColor}`}>{title}</h2>
            <div className={`${textColor} opacity-90 text-lg`}>{content}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
