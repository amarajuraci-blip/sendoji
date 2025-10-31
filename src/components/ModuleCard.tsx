// amarajuraci-blip/sendoji/sendoji-5d31049582b4141029842a01bf9e35e78ed4a186/src/components/ModuleCard.tsx
import React from 'react';

interface ModuleCardProps {
  moduleNumber: number;
  title: string;
  imageUrl: string;
  sectionType?: 'course' | 'howto' | 'bonus';
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  moduleNumber, 
  title, 
  imageUrl, 
  sectionType = 'course' 
}) => {
  const getAccentColor = () => {
    switch (sectionType) {
      case 'course': return 'border-purple-200 hover:border-purple-400';
      case 'howto': return 'border-blue-200 hover:border-blue-400';
      case 'bonus': return 'border-yellow-400 hover:border-yellow-500';
      default: return 'border-gray-200 hover:border-gray-400';
    }
  };

  const getBorderWidth = () => {
    return sectionType === 'bonus' ? 'border-4' : 'border-2';
  };

  // Lógica para determinar se o card deve ser preto e branco
  const isGrayscale = (sectionType === 'course' && (moduleNumber === 1 || moduleNumber === 2)) || 
                        (sectionType === 'bonus');

  return (
    <div className="group cursor-pointer">
      <div className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${getBorderWidth()} ${getAccentColor()} relative overflow-hidden`}>
        <div className="aspect-[2/3] relative">
          <img 
            src={imageUrl} 
            alt={title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${isGrayscale ? 'grayscale' : ''}`} // <-- Classe 'grayscale' adicionada
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 ease-in-out flex items-end">
            <div className="p-2 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform translate-y-4 group-hover:translate-y-0">
              {/* CORREÇÃO: Usa o `title` como o texto principal e remove o "Módulo X" */}
              <h3 className="font-bold text-sm md:text-lg text-white">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;