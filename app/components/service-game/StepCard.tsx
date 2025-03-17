import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  content: string;
}

export const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  content,
}) => {
  return (
    <div className="relative pl-16 pb-8">
      <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-xl">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
      {/* Connector line for all but the last step */}
      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
};
