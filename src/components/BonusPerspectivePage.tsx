import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';

const BonusPerspectivePage: React.FC = () => {
  const navigate = useNavigate();

  // REMOVIDO: Módulo de Introdução (id: 0)
  const perspectiveModules = [
    // { id: 0, title: "Introdução", imageUrl: "https://i.postimg.cc/sgckNLZx/ChatGPT_Image_22_06_2025,_21_02_53.png" }, // <--- REMOVIDO
    { id: 1, title: "Perspectiva com 1 Ponto", imageUrl: "https://i.postimg.cc/ZqnMD5Ss/ChatGPT_Image_22_06_2025,_21_26_57.png" },
    { id: 2, title: "Perspectiva com 2 Pontos", imageUrl: "https://i.postimg.cc/QxpGpC8p/ChatGPT_Image_22_06_2025,_21_24_33.png" },
    { id: 3, title: "Perspectiva com 3 Pontos", imageUrl: "https://i.postimg.cc/hGtkW09r/ChatGPT_Image_22_06_2025,_21_25_19.png" },
    { id: 4, title: "Perspectiva com 5 Pontos", imageUrl: "https://i.postimg.cc/13sxMSXb/ChatGPT_Image_22_06_2025,_21_24_26.png" }
  ];

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleModuleClick = (moduleId: number) => {
    // ATUALIZADO: Como o ID 0 foi removido, a lógica anterior que permitia a navegação para ele
    // não é mais necessária. Mantemos o alerta para os módulos restantes.
    alert('Atenção! As aulas desse módulo estão em gravação, aproveite para fazer todo curso de desenho.');
    // Se, no futuro, algum desses módulos (1, 2, 3, 4) tiver aulas prontas,
    // a lógica de navegação precisará ser ajustada aqui. Ex:
    // if (moduleId === 1) { navigate(`/bonus/perspectiva/${moduleId}`); } else { alert(...) }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-6">
        <button
          onClick={handleBackClick}
          className="flex items-center text-white hover:text-purple-400 transition-colors duration-300 text-lg group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Voltar para a página inicial
        </button>
      </div>

      <section className="relative my-6">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://i.postimg.cc/3w1RGSdm/7-B.png"
          />
          <img
            src="https://i.postimg.cc/5yYNZfpS/8-A.png"
            alt="Banner - Curso de Perspectiva"
            className="w-full h-[40vh] md:h-[50vh] object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <section>
          <SectionTitle>
            <span className="text-yellow-400">♦</span> CURSO DE PERSPECTIVA <span className="text-yellow-400">♦</span>
          </SectionTitle>
          <ModuleCarousel
            modules={perspectiveModules}
            sectionType="bonus"
            onModuleClick={handleModuleClick}
          />
        </section>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Bônus: Curso de Perspectiva
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Aprenda a dar profundidade e realismo aos seus desenhos dominando os fundamentos da perspectiva.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BonusPerspectivePage;