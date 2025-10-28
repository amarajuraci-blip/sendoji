import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import BackButton from './BackButton';

// Interface para o componente de item de aula
interface LessonItemProps {
  lessonNumber: string;
  title: string;
  thumbnailUrl: string;
  onClick: () => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ lessonNumber, title, thumbnailUrl, onClick }) => {
  return (
    <div 
      className="flex items-center bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden relative">
        <img 
          src={thumbnailUrl} 
          alt={`Aula ${lessonNumber}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" />
        </div>
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors duration-300">
          {lessonNumber}: {title}
        </h3>
        <p className="text-gray-400 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Clique para assistir à aula
        </p>
      </div>

      <div className="flex-shrink-0 ml-4">
        <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-400 rotate-180 group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </div>
  );
};

const Module8Page: React.FC = () => {
  const navigate = useNavigate();

  // ATUALIZADO: Lista de aulas do Módulo 8 com os novos títulos
  const lessons = [
    { number: "01", title: "Gohan e Videl", thumbnailUrl: "https://i.postimg.cc/BnHQMpfR/1.png" },
    { number: "02", title: "Naruto e Sasuke", thumbnailUrl: "https://i.postimg.cc/CLZKfYPh/2.png" },
    { number: "03", title: "Goku e Android N°17", thumbnailUrl: "https://i.postimg.cc/s2zf8WVx/3.png" },
    { number: "04", title: "Gohan e Kakashi", thumbnailUrl: "https://i.postimg.cc/MZ3TTXY3/4.png" },
    { number: "05", title: "Sakura e Sasuke", thumbnailUrl: "https://i.postimg.cc/Px3tPF1v/5.png" },
    { number: "06", title: "Android N°18 e Sarada", thumbnailUrl: "https://i.postimg.cc/qRMJBd6d/6.png" },
    { number: "07", title: "Tanjiro e Nezuko", thumbnailUrl: "https://i.postimg.cc/vT4G9Lvq/7.png" }
  ];

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleLessonClick = (lessonNumber: string) => {
    navigate(`/modulo/8/aula/${lessonNumber}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-6">
        <BackButton onClick={handleBackClick} text="Ver todos os módulos" />
      </div>

      <section className="relative mt-6">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="https://i.postimg.cc/K8bsWJ81/08-B.png"
          />
          <img 
            src="https://i.postimg.cc/DwcY3LSB/08-A.png"
            alt="Banner Módulo 8"
            className="w-full h-[40vh] md:h-[60vh] object-cover"
          />
        </picture>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              MÓDULO 08
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
              Treino de Máscara
            </h2>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8 px-4 md:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Aulas
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
          <p className="text-gray-400 mt-4">
            Clique em qualquer aula para começar a assistir
          </p>
        </div>

        <div className="space-y-4 px-4 md:px-8">
          {lessons.map((lesson, index) => (
            <LessonItem
              key={index}
              lessonNumber={lesson.number}
              title={lesson.title}
              thumbnailUrl={lesson.thumbnailUrl}
              onClick={() => handleLessonClick(lesson.number)}
            />
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Módulo 08 - Treino de Máscara
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
           Compreenda os princípios fundamentais do treino de máscara para dominar a construção do rosto em personagens de anime
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Module8Page;
