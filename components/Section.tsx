
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`py-8 ${className}`}>
      <h2 className="text-3xl font-bold mb-6 text-white border-l-4 border-purple-500 pl-4">{title}</h2>
      {children}
    </section>
  );
};
