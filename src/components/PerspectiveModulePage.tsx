import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import SectionTitle from './SectionTitle';

// Componente para um item de aula
const LessonItem: React.FC<{ lessonNumber: string; title: string; thumbnailUrl: string; onClick: () => void; }> = ({ lessonNumber, title, thumbnailUrl, onClick }) => (
    <div 
      className="flex items-center bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden relative">
        <img src={thumbnailUrl} alt={`Aula ${lessonNumber}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" />
        </div>
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors duration-300">{lessonNumber}: {title}</h3>
        <p className="text-gray-400 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Clique para assistir à aula</p>
      </div>
      <div className="flex-shrink-0 ml-4">
        <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-400 rotate-180 group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </div>
);

const perspectiveModulesData: Record<string, { title: string; lessons: { number: string; title: string }[] }> = {
    '1': {
        title: "Perspectiva com 1 Ponto",
        lessons: [
            { number: "01", title: "Introdução ao Ponto de Fuga Único" },
            { number: "02", title: "Desenhando Formas Básicas" },
            { number: "03", title: "Criando um Cenário Simples" },
        ]
    },
    '2': {
        title: "Perspectiva com 2 Pontos",
        lessons: [
            { number: "01", title: "Entendendo os Dois Pontos de Fuga" },
            { number: "02", title: "Desenhando Edifícios e Objetos" },
            { number: "03", title: "Composição com Múltiplos Elementos" },
        ]
    },
    '3': {
        title: "Perspectiva com 3 Pontos",
        lessons: [
            { number: "01", title: "O Ponto de Fuga Vertical" },
            { number: "02", title: "Vista de Cima (Plongée)" },
            { number: "03", title: "Vista de Baixo (Contra-Plongée)" },
        ]
    },
    '4': {
        title: "Perspectiva com 5 Pontos",
        lessons: [
            { number: "01", title: "Introdução à Perspectiva Curvilínea" },
            { number: "02", title: "Criando o Efeito 'Olho de Peixe'" },
            { number: "03", title: "Aplicações Criativas e Panorâmicas" },
        ]
    },
};

const PerspectiveModulePage: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();

  const moduleData = moduleId ? perspectiveModulesData[moduleId] : null;

  const thumbnailUrl = "https://i.postimg.cc/x81TSBRW/course-thumbnails-6c2c410a-c367-4393-a809-ecf48394060c-385b63aa70734a378d78de5a2cec6523.png";

  const handleBackClick = () => {
    navigate('/bonus/perspectiva');
  };

  const handleLessonClick = (lessonNumber: string) => {
    navigate(`/bonus/perspectiva/${moduleId}/aula/${lessonNumber}`);
  };
  
  if (!moduleData) {
    return <div className="min-h-screen bg-black text-white text-center pt-20">Módulo de perspectiva não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-6">
        <button 
          onClick={handleBackClick}
          className="flex items-center text-white hover:text-purple-400 transition-colors duration-300 text-lg group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Voltar para o curso de perspectiva
        </button>
      </div>

      <section className="relative mt-6">
        <picture>
          <source media="(max-width: 768px)" srcSet="https://i.postimg.cc/0jX55ZXr/PROVISORIO-1.png" />
          <img src="https://i.postimg.cc/MKXK32XB/PROVISORIO.png" alt={`Banner Módulo ${moduleId}`} className="w-full h-[40vh] md:h-[60vh] object-cover" />
        </picture>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">MÓDULO {moduleId}</h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium">{moduleData.title}</h2>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8 px-4 md:px-8">
          <SectionTitle>Aulas</SectionTitle>
          <p className="text-gray-400 mt-4">Clique em qualquer aula para começar a assistir.</p>
        </div>
        <div className="space-y-4 px-4 md:px-8">
          {moduleData.lessons.map((lesson, index) => (
            <LessonItem
              key={index}
              lessonNumber={lesson.number}
              title={lesson.title}
              thumbnailUrl={thumbnailUrl}
              onClick={() => handleLessonClick(lesson.number)}
            />
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Módulo {moduleId} - {moduleData.title}
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">Aprofunde seus conhecimentos em perspectiva para criar desenhos com profundidade e impacto.</p>
        </div>
      </footer>
    </div>
  );
};

export default PerspectiveModulePage;
