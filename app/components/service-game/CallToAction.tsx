import React from 'react';
import Link from 'next/link';

interface CallToActionProps {
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  bgImage?: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title,
  content,
  buttonText,
  buttonLink,
  bgImage = '/images/gaming_chair_and_environment.jpg',
}) => {
  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-10">{content}</p>
        <Link 
          href={buttonLink}
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};
