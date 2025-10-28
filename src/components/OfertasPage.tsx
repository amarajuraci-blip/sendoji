// Conteúdo CORRIGIDO para: src/components/OfertasPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ModuleCarousel from './ModuleCarousel'; // <-- Importa o componente de carrossel
import SectionTitle from './SectionTitle';   // <-- Importa o componente de título

// Dados das ofertas com os novos links
const offersData = [
  { id: 1, title: 'Método Fan Art', imageUrl: 'https://i.postimg.cc/jq3SgGVW/1.png', link: 'https://metodofanart.com.br/' },
  { id: 2, title: 'Como Desenhar Bem', imageUrl: 'https://i.postimg.cc/jq3SgGVW/1.png', link: 'https://artlucas.com.br/curso-como-desenhar-bem/' },
  { id: 3, title: 'O Caminho da Arte', imageUrl: 'https://i.postimg.cc/jq3SgGVW/1.png', link: 'https://ocaminhodaarte.com/como-desenhar-melhor-2-0/' },
  { id: 4, title: 'Desenhando Sem Dom', imageUrl: 'https://i.postimg.cc/jq3SgGVW/1.png', link: 'https://escolaartrodrigues.kpages.online/desenhandosemdom' },
  { id: 5, title: 'Curso de Desenho Online', imageUrl: 'https://i.postimg.cc/jq3SgGVW/1.png', link: 'https://quantaacademia.com/curso/curso-de-desenho-online/' }
];

const OfertasPage: React.FC = () => {
  const navigate = useNavigate();

  // Função para lidar com o clique na oferta
  const handleOfferClick = (offerId: number) => {
    const offer = offersData.find(o => o.id === offerId);
    if (offer && offer.link) {
      window.open(offer.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="container mx-auto px-4 pt-6">
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center text-white hover:text-purple-400 transition-colors duration-300 text-lg group mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Voltar para o início
        </button>
      </div>

      <section className="relative">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="https://i.imgur.com/nkjNoNO.jpg" 
          />
          <img 
            src="https://i.imgur.com/ru9WoNh.jpg" 
            alt="Banner de Ofertas"
            className="w-full h-[40vh] object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </section>
      
      <div className="container mx-auto py-16 max-w-7xl">
        {/* Título da secção */}
        <SectionTitle>
          <span className="text-yellow-400">★</span> OFERTAS IMPERDÍVEIS <span className="text-yellow-400">★</span>
        </SectionTitle>

        {/* --- AQUI ESTÁ A MUDANÇA PRINCIPAL --- */}
        {/* Usamos o ModuleCarousel em vez da grelha de antes */}
        <ModuleCarousel 
          modules={offersData} 
          sectionType="bonus"
          onModuleClick={handleOfferClick}
        />
      </div>
    </div>
  );
};

export default OfertasPage;