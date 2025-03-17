import React from 'react';
import Image from 'next/image';
import SectionTitle from '../SectionTitle';

interface FeatureSectionProps {
  title: string;
  content: string;
  imagePath: string;
  imageAlt: string;
  reverse?: boolean;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  content,
  imagePath,
  imageAlt,
  reverse = false,
}) => {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className={`container mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
        <div className="w-full md:w-1/2">
          <SectionTitle title={title} />
          <p className="mt-4 text-gray-700 dark:text-gray-300">{content}</p>
        </div>
        <div className="w-full md:w-1/2 relative aspect-video">
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
