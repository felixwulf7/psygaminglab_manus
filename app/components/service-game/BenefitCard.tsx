import React from 'react';

interface BenefitCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  content,
  icon,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="w-12 h-12 mb-4 text-primary-600 dark:text-primary-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  );
};
