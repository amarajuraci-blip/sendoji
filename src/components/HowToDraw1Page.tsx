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

const HowToDraw1Page: React.FC = () => {
  const navigate = useNavigate();

  // ATUALIZADO: Lista de aulas com os novos nomes
  const lessons = [
    { number: "01", title: "Aladdin", thumbnailUrl: "https://i.postimg.cc/bvfK0GbR/001.png" },
    { number: "02", title: "Alice", thumbnailUrl: "https://i.postimg.cc/Z5dGyP9R/002.png" },
    { number: "03", title: "Anna", thumbnailUrl: "https://i.postimg.cc/wTZKv4jZ/003.png" },
    { number: "04", title: "Ariel", thumbnailUrl: "https://i.postimg.cc/CLzTwpSb/004.png" },
    { number: "05", title: "Branca de Neve", thumbnailUrl: "https://i.postimg.cc/NGNvhjqg/005.png" },
    { number: "06", title: "Cinderela", thumbnailUrl: "https://i.postimg.cc/4y2DpBbK/006.png" },
    { number: "07", title: "Hercules", thumbnailUrl: "https://i.postimg.cc/qq7ft9nV/007.png" },
    { number: "08", title: "Jasmine", thumbnailUrl: "https://i.postimg.cc/Tw0M3RKJ/008.png" },
    { number: "09", title: "Li Shang", thumbnailUrl: "https://i.postimg.cc/Xvw6tK3h/009.png" },
    { number: "10", title: "Margarida", thumbnailUrl: "https://i.postimg.cc/V6mPwSkN/010.png" },
    { number: "11", title: "Mickey Mouse", thumbnailUrl: "https://i.postimg.cc/6QsNHbsn/011.png" },
    { number: "12", title: "Minnie Mouse", thumbnailUrl: "https://i.postimg.cc/t4njNQc9/012.png" },
    { number: "13", title: "Mulan", thumbnailUrl: "https://i.postimg.cc/fTrsdTBH/013.png" },
    { number: "14", title: "Pateta", thumbnailUrl: "https://i.postimg.cc/Y28MpxgB/014.png" },
    { number: "15", title: "Pato Donald", thumbnailUrl: "https://i.postimg.cc/7Y6DbTMG/015.png" },
    { number: "16", title: "Peter Pan", thumbnailUrl: "https://i.postimg.cc/Y0276v5P/016.png" },
    { number: "17", title: "Pluto", thumbnailUrl: "https://i.postimg.cc/nzJpLR0p/017.png" },
    { number: "18", title: "Pocahontas", thumbnailUrl: "https://i.postimg.cc/ZRxZv8M3/018.png" },
    { number: "19", title: "Rapunzel", thumbnailUrl: "https://i.postimg.cc/pr0Hq2xL/019.png" },
    { number: "20", title: "Tio Patinhas", thumbnailUrl: "https://i.postimg.cc/PqZdTsbS/020.png" }
  ];

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleLessonClick = (lessonNumber: string) => {
    navigate(`/como-desenhar/1/aula/${lessonNumber}`);
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
            srcSet="https://i.postimg.cc/qvn6Nxsx/1-B.png"
          />
          <img 
            src="https://i.postimg.cc/qRBNZf91/1-A.png"
            alt="Banner Módulo 1 - Como Desenhar"
            className="w-full h-[40vh] md:h-[60vh] object-cover"
          />
        </picture>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              MÓDULO 01
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
              Como Desenhar Personagens Disney
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
            Módulo 01 - Como Desenhar Personagens Disney
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Aprenda a desenhar seus personagens favoritos da Disney com guias passo a passo fáceis de seguir.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HowToDraw1Page;
