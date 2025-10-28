import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = '' }) => {
  return (
    // Margens da esquerda foram reajustadas para valores menores
    <div className="text-left mb-8 md:mb-12 ml-2 md:ml-8 lg:ml-10">
      <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white ${className}`}>
        {children}
      </h2>
      <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mt-3 md:mt-4 rounded-full"></div>
    </div>
  );
};

export default SectionTitle;