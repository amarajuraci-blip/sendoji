// src/components/HomePage.tsx

import React, { useState } from 'react'; // Importe useState
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';
import { courseModules, howToDrawModules, bonusModules } from '../data/modules';
import ComingSoonModal from './ComingSoonModal'; // Importe o novo modal

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // Estados para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleModuleClick = (moduleId: number, sectionType: string) => {
    // Mensagens definidas
    const courseAlertMessage = 'ATENÇÃO! ESSE MÓDULO SERÁ LIBERADO NO DIA 01 DE JANEIRO DE 2026, ENQUANTO ISSO INICIE AS ATIVIDADES PELO MÓDULO 3 OU PELA BIBLIOTECA DE PERSONAGENS!';
    const howToDrawAlertMessage = '⚠️ ATENÇÃO!\nAs aulas desse módulo ainda estão em gravação, mas estarão disponíveis em breve.\nEnquanto isso, sinta-se à vontade para revisitar lições anteriores ou avançar. Aproveite os outros módulos!';
    // const bonusAlertMessage = 'Este módulo bônus ainda não está disponível ou não tem uma página dedicada.'; // Não será mais usada diretamente aqui

    if (sectionType === 'course') {
      if (moduleId === 1 || moduleId === 2) {
        setModalMessage(courseAlertMessage);
        setIsModalOpen(true);
      } else {
        navigate(`/modulo/${moduleId}`);
      }
    } else if (sectionType === 'howto') {
      if (moduleId > 6) {
        setModalMessage(howToDrawAlertMessage);
        setIsModalOpen(true);
      } else {
        navigate(`/como-desenhar/${moduleId}`);
      }
    } else if (sectionType === 'bonus') {
      // *** LÓGICA ATUALIZADA AQUI ***
      // Sempre mostrar a mensagem dos módulos 1 e 2 para QUALQUER módulo bônus
      setModalMessage(courseAlertMessage);
      setIsModalOpen(true);

      // A lógica antiga para navegar para páginas específicas de bônus foi removida/comentada,
      // pois agora sempre exibimos o modal.
      /*
      const clickedBonusModule = bonusModules.find(m => m.id === moduleId);
      if (clickedBonusModule) {
        if (clickedBonusModule.title === "Perspectiva") {
          // navigate('/bonus/perspectiva'); // Não navega mais
        } else if (clickedBonusModule.title === "Gestual Avançado") {
          // navigate('/bonus/desafios'); // Não navega mais
        } else {
          // setModalMessage(bonusAlertMessage); // Usa a courseAlertMessage agora
        }
      } else {
         // setModalMessage('Módulo bônus não encontrado.'); // Usa a courseAlertMessage agora
      }
      */
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/', { replace: true });
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage(''); // Limpa a mensagem ao fechar
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Botão de Logout */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 border border-gray-700 hover:border-gray-600"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>

      {/* Banner Principal */}
      <section className="relative">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/images/cell.webp"
          />
          <img
            src="/images/pc.webp"
            alt="Banner Principal - Curso de Desenho"
            className="w-full h-[40vh] md:h-[60vh] object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Seção Curso de Desenho */}
        <section className="mb-20">
          <SectionTitle>
            <span className="md:hidden">
              <span className="text-red-500">♥</span> CURSO DE DESENHO <span className="text-red-500">♥</span>
            </span>
            <span className="hidden md:inline">
              ♥ CURSO DE DESENHO ♥
            </span>
          </SectionTitle>
          <ModuleCarousel
            modules={courseModules}
            sectionType="course"
            onModuleClick={(moduleId) => handleModuleClick(moduleId, 'course')}
          />
        </section>

        {/* Seção Como Desenhar */}
        <section className="mb-20">
          <SectionTitle>
            <span className="md:hidden">
              <span className="text-red-500">♦</span> COMO DESENHAR... <span className="text-red-500">♦</span>
            </span>
            <span className="hidden md:inline">
              ♦ COMO DESENHAR... ♦
            </span>
          </SectionTitle>
          <ModuleCarousel
            modules={howToDrawModules}
            sectionType="howto"
            onModuleClick={(moduleId) => handleModuleClick(moduleId, 'howto')}
          />
        </section>

        {/* Seção Super Bônus */}
        <section className="mb-20">
          <SectionTitle>
            <span className="md:hidden">
              <span className="text-gray-400">♠</span> SUPER BÔNUS <span className="text-gray-400">♠</span>
            </span>
            <span className="hidden md:inline">
              ♠ SUPER BÔNUS ♠
            </span>
          </SectionTitle>
          <div className="max-w-7xl mx-auto">
            <ModuleCarousel
              modules={bonusModules}
              sectionType="bonus"
              onModuleClick={(moduleId) => handleModuleClick(moduleId, 'bonus')} // A lógica interna agora sempre mostra o modal
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Curso de Desenho Completo
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Desenvolva suas habilidades artísticas com nosso curso completo de desenho.
            Do básico ao avançado, aprenda técnicas profissionais e transforme sua paixão em arte.
          </p>
        </div>
      </footer>

      {/* Renderiza o Modal Condicionalmente */}
      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default HomePage;