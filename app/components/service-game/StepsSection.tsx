import React from 'react';
import SectionTitle from '../SectionTitle';
import { StepCard } from './StepCard';

interface Step {
  title: string;
  content: string;
}

interface StepsSectionProps {
  title: string;
  subtitle?: string;
  steps: Step[];
}

export const StepsSection: React.FC<StepsSectionProps> = ({
  title,
  subtitle,
  steps,
}) => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <SectionTitle 
          title={title}
          subtitle={subtitle}
        />
        
        <div className="mt-12 max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={index + 1}
              title={step.title}
              content={step.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
