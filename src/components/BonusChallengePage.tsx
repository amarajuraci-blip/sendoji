import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';

const BonusChallengePage: React.FC = () => {
  const navigate = useNavigate();
  
  const challengeModules = [
    { id: 1, title: 'Desafio 01', imageUrl: 'https://i.postimg.cc/Kj3zZyhZ/7.png' },
    { id: 2, title: 'Desafio 02', imageUrl: 'https://i.postimg.cc/nLTM2k1t/2.png' },
    { id: 3, title: 'Desafio 03', imageUrl: 'https://i.postimg.cc/VNzdXTnR/1.png' },
    { id: 4, title: 'Desafio 04', imageUrl: 'https://i.postimg.cc/x1vXJYJ8/3.png' },
    { id: 5, title: 'Desafio 05', imageUrl: 'https://i.postimg.cc/rwXdwzp7/4.png' },
    { id: 6, title: 'Desafio 06', imageUrl: 'https://i.postimg.cc/pTTr6F05/5.png' }
  ];

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleModuleClick = (moduleId: number) => {
    if (moduleId <= 3) {
      navigate(`/bonus/desafios/${moduleId}`);
    } else {
      alert('Atenção! As aulas desse módulo estão em gravação, aproveite para fazer todo curso de desenho.');
    }
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

      {/* ===== BANNER ATUALIZADO AQUI ===== */}
      <section className="relative my-6">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="https://i.postimg.cc/85nzK7dC/8-B.png" // Versão para telemóvel
          />
          <img 
            src="https://i.postimg.cc/85CCmR63/7-A.png" // Versão para PC
            alt="Banner - Desafios"
            className="w-full h-[40vh] md:h-[50vh] object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <section>
          <SectionTitle>
            <span className="text-cyan-400">♦</span> DESAFIOS DE DESENHO <span className="text-cyan-400">♦</span>
          </SectionTitle>
          <ModuleCarousel 
            modules={challengeModules} 
            sectionType="bonus"
            onModuleClick={handleModuleClick}
          />
        </section>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Bônus: Desafios de Desenho
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Teste suas habilidades e evolua sua técnica com desafios práticos e divertidos.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BonusChallengePage;
