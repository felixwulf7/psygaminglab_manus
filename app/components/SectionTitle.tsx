import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string | ReactNode;
  align?: 'left' | 'center' | 'right';
  titleColor?: string;
  subtitleColor?: string;
  withLine?: boolean;
  lineColor?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  titleColor = 'text-neutral-900 dark:text-white',
  subtitleColor = 'text-neutral-600 dark:text-neutral-300',
  withLine = true,
  lineColor = 'bg-primary-800',
  className = '',
}: SectionTitleProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`max-w-3xl ${alignmentClasses[align]} mb-12 ${className}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleColor}`}>{title}</h2>
      
      {withLine && (
        <div
          className={`h-1 w-20 ${lineColor} rounded mb-6 ${
            align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
          }`}
        ></div>
      )}
      
      {subtitle && (
        <div className={`text-lg ${subtitleColor}`}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
