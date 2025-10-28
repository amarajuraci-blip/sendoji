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

const HowToDraw2Page: React.FC = () => {
  const navigate = useNavigate();

  // ATUALIZADO: Lista de aulas do Módulo 2 da Seção 2 com os novos títulos
  const lessons = [
    { number: "01", title: "Pernalonga", thumbnailUrl: "https://i.postimg.cc/8cb5DQS2/001.png" },
    { number: "02", title: "Piu Piu", thumbnailUrl: "https://i.postimg.cc/gkYjsJym/002.png" },
    { number: "03", title: "Tasmanian", thumbnailUrl: "https://i.postimg.cc/mk4D0Z03/003.png" },
    { number: "04", title: "Coiote", thumbnailUrl: "https://i.postimg.cc/zX0BcrpW/004.png" },
    { number: "05", title: "Daffy Duck", thumbnailUrl: "https://i.postimg.cc/vBfTqxSH/005.png" },
    { number: "06", title: "Elmer Fudd", thumbnailUrl: "https://i.postimg.cc/jjGC44cF/006.png" },
    { number: "07", title: "Eufrazino", thumbnailUrl: "https://i.postimg.cc/8CFjv0Rv/007.png" },
    { number: "08", title: "Frajola Jr.", thumbnailUrl: "https://i.postimg.cc/JzzyrntP/008.png" },
    { number: "09", title: "Gaguinho", thumbnailUrl: "https://i.postimg.cc/nckjf7VX/009.png" },
    { number: "10", title: "Lola Bunny", thumbnailUrl: "https://i.postimg.cc/mgpPtsHR/010.png" },
    { number: "11", title: "Marvin, o Marciano", thumbnailUrl: "https://i.postimg.cc/yYBgGnKq/011.png" },
    { number: "12", title: "Papa-Léguas", thumbnailUrl: "https://i.postimg.cc/8cdF5fhn/012.png" },
    { number: "13", title: "Pepé Le Pew", thumbnailUrl: "https://i.postimg.cc/Xq6G4kyC/013.png" },
    { number: "14", title: "Petúnia", thumbnailUrl: "https://i.postimg.cc/1tqnkj4S/014.png" },
    { number: "15", title: "Speedy González", thumbnailUrl: "https://i.postimg.cc/fWYS5p6j/015.png" }
  ];

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleLessonClick = (lessonNumber: string) => {
    navigate(`/como-desenhar/2/aula/${lessonNumber}`);
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
            srcSet="https://i.postimg.cc/fbNtmS5n/2-B.png"
          />
          <img 
            src="https://i.postimg.cc/4d8mDLGs/2-A.png"
            alt="Banner Módulo 2 - Como Desenhar"
            className="w-full h-[40vh] md:h-[60vh] object-cover"
          />
        </picture>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              MÓDULO 02
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
              Como Desenhar Personagens Warner Bros
            </h2>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8 px-4 md:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Aulas
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
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
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Módulo 02 - Como Desenhar Personagens Warner Bros
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Aprenda a desenhar os icónicos personagens da Warner Bros com guias passo a passo.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HowToDraw2Page;
