import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';

const BonusChallengePage: React.FC = () => {
  const navigate = useNavigate();

  // Array original para referência interna e navegação
  const originalChallengeModules = [
    // { id: 1, title: 'Desafio 01', imageUrl: 'https://i.postimg.cc/Kj3zZyhZ/7.png' }, // REMOVIDO
    { id: 2, title: 'Desafio 02', imageUrl: 'https://i.postimg.cc/nLTM2k1t/2.png' },
    { id: 3, title: 'Desafio 03', imageUrl: 'https://i.postimg.cc/VNzdXTnR/1.png' },
    { id: 4, title: 'Desafio 04', imageUrl: 'https://i.postimg.cc/x1vXJYJ8/3.png' },
    { id: 5, title: 'Desafio 05', imageUrl: 'https://i.postimg.cc/rwXdwzp7/4.png' },
    { id: 6, title: 'Desafio 06', imageUrl: 'https://i.postimg.cc/pTTr6F05/5.png' }
  ];

  // Mapeia para exibição com IDs e títulos reenumerados
  const displayChallengeModules = originalChallengeModules.map((module, index) => ({
    ...module, // Mantém a imageUrl e o ID original para navegação
    displayId: index + 1, // Novo ID sequencial para exibição (não usado diretamente no Card, mas útil para clareza)
    title: `Desafio ${String(index + 1).padStart(2, '0')}`, // Título reenumerado
  }));


  const handleBackClick = () => {
    navigate('/home');
  };

  // ATENÇÃO: A função agora recebe o ID ORIGINAL do módulo clicado
  const handleModuleClick = (originalModuleId: number) => {
    // A lógica do alerta usa o ID ORIGINAL
    // Os desafios originais 2 e 3 (agora exibidos como 1 e 2) são <= 3.
    // O desafio original 4 (agora exibido como 3) também é <= 4, mas a lógica original era <=3, vamos manter.
    // Isso significa que os desafios exibidos como 1 e 2 funcionarão, os outros mostrarão alerta.
    if (originalModuleId <= 3) { // Usa o ID original (2 ou 3 funcionam)
      navigate(`/bonus/desafios/${originalModuleId}`); // Navega com o ID original
    } else {
      alert('Atenção! As aulas desse módulo estão em gravação, aproveite para fazer todo curso de desenho.');
    }
  };


  return (
    <div className="min-h-screen bg-black pb-24"> {/* Adicionado padding-bottom */}
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
            srcSet="https://i.postimg.cc/85nzK7dC/8-B.png"
          />
          <img
            src="https://i.postimg.cc/85CCmR63/7-A.png"
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
            // Passa os módulos com títulos atualizados para exibição
            modules={displayChallengeModules.map(m => ({
                id: m.id, // ID original para o clique
                title: m.title, // Título reenumerado
                imageUrl: m.imageUrl
            }))}
            sectionType="bonus"
            // Passa o ID ORIGINAL para a função handleModuleClick
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