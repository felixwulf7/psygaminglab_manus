import React from 'react';
import SectionTitle from '../SectionTitle';
import { BenefitCard } from './BenefitCard';

interface Benefit {
  title: string;
  content: string;
  icon: React.ReactNode;
}

interface BenefitsSectionProps {
  title: string;
  subtitle?: string;
  benefits: Benefit[];
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  title,
  subtitle,
  benefits,
}) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <SectionTitle 
          title={title}
          subtitle={subtitle}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              content={benefit.content}
              icon={benefit.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
