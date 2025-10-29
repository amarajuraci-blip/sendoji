// src/components/BonusChallengePage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';
import BackButton from './BackButton'; // Importe BackButton

const BonusChallengePage: React.FC = () => {
  const navigate = useNavigate();

  // Array original com THUMBNAILS ATUALIZADAS para b2
  const originalChallengeModules = [
    // { id: 1, title: 'Desafio 01 Original', imageUrl: '/images/bonus/b1_01.webp' }, // REMOVIDO na lógica anterior
    // *** THUMBNAILS ATUALIZADAS AQUI ***
    { id: 2, title: 'Aula 01', imageUrl: '/images/s2/b2_1.webp' }, // Corresponde ao Desafio 02 original
    { id: 3, title: 'Aula 02', imageUrl: '/images/s2/b2_2.webp' }, // Corresponde ao Desafio 03 original
    { id: 4, title: 'Aula 03', imageUrl: '/images/s2/b2_3.webp' }, // Corresponde ao Desafio 04 original
    { id: 5, title: 'Aula 04', imageUrl: '/images/s2/b2_4.webp' }, // Corresponde ao Desafio 05 original
    { id: 6, title: 'Aula 05', imageUrl: '/images/s2/b2_5.webp' }  // Corresponde ao Desafio 06 original
  ];

  // Mapeia para exibição (o título pode ser ajustado se necessário)
  // Usaremos o título original ("Aula 01", etc.) definido acima no ModuleCard
  const displayChallengeModules = originalChallengeModules.map((module, index) => ({
    ...module,
    // Se quiser que o título no card seja "Desafio XX", descomente a linha abaixo
    // title: `Desafio ${String(index + 1).padStart(2, '0')}`,
  }));

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleModuleClick = (originalModuleId: number) => {
    // A lógica de alerta usa o ID ORIGINAL
    // Os desafios originais 2 e 3 (agora aulas 1 e 2) são <= 3 e funcionam.
    if (originalModuleId <= 3) {
      navigate(`/bonus/desafios/${originalModuleId}`); // Navega com o ID original
    } else {
      alert('Atenção! As aulas desse módulo estão em gravação, aproveite para fazer todo curso de desenho.');
    }
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="container mx-auto px-4 pt-6">
        {/* Usando BackButton importado */}
        <BackButton onClick={handleBackClick} text="Voltar para a página inicial" />
      </div>

      <section className="relative my-6">
        {/* *** BANNER ATUALIZADO AQUI *** */}
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/images/s2/capa2b_cell.png" // Banner celular atualizado
          />
          <img
            src="/images/s2/capa2b_pc.png" // Banner PC atualizado
            alt="Banner - Gestual Avançado / Desafios"
            className="w-full h-[40vh] md:h-[50vh] object-cover"
          />
        </picture>
        {/* Div adicionada para escurecer um pouco o banner e melhorar leitura do texto sobreposto se houver */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
         {/* Texto sobreposto ao Banner (opcional, exemplo) */}
         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              BÔNUS 02
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
              Gestual Avançado / Desafios
            </h2>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <section>
          {/* Título da seção pode ser ajustado */}
          <SectionTitle>
            <span className="text-cyan-400">♦</span> Aulas / Desafios <span className="text-cyan-400">♦</span>
          </SectionTitle>
          <ModuleCarousel
            // Passa os módulos com TÍTULOS E IMAGENS atualizados para exibição
            modules={displayChallengeModules} // Já contém title e imageUrl corretos
            sectionType="bonus"
            // Passa o ID ORIGINAL para a função handleModuleClick
            onModuleClick={handleModuleClick}
          />
        </section>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Bônus: Gestual Avançado / Desafios
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Teste suas habilidades e evolua sua técnica com desafios práticos e divertidos focados no gestual.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BonusChallengePage;