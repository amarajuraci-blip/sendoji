import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';
import { courseModules, howToDrawModules, bonusModules } from '../data/modules';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // AQUI ESTÁ A LÓGICA ATUALIZADA
  const handleModuleClick = (moduleId: number, sectionType: string) => {
    const alertMessage = 'ATENÇÃO! ESSE MÓDULO SERÁ LIBERADO NO DIA 01 DE AGOSTO DE 2025, ENQUANTO ISSO INICIE AS ATIVIDADES PELO MÓDULO 3 OU PELA BIBLIOTECA DE PERSONAGENS!';

    if (sectionType === 'course') {
      if (moduleId === 1 || moduleId === 2) {
        alert(alertMessage);
      } else {
        navigate(`/modulo/${moduleId}`);
      }
    } else if (sectionType === 'howto') {
      // ----> ESTA É A PARTE QUE FOI CORRIGIDA <----
      // Agora, ele verifica se o módulo tem uma página antes de navegar
      if (moduleId > 6) {
        alert('ATENÇÃO! As aulas desse módulo ainda estão em gravação, mas estarão disponíveis em breve. Aproveite os outros módulos!');
      } else {
        navigate(`/como-desenhar/${moduleId}`);
      }
      // ---------------------------------------------
    } else if (sectionType === 'bonus') {
      if (moduleId === 1 || moduleId === 2) {
        alert(alertMessage);
      } else {
        alert('Este módulo bônus ainda não está disponível.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 border border-gray-700 hover:border-gray-600"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
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
            alt="Banner Principal - Curso de Desenho"
            className="w-full h-[40vh] md:h-[60vh] object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
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

        <section className="mb-20">
          <SectionTitle>
            <span className="md:hidden">
              <span className="text-gray-400">♠</span> SUPER BÔNUS <span className="text-gray-400">♠</span>
            </span>
            <span className="hidden md:inline">
              ♠ SUPER BÔNUS ♠
            </span>
          </SectionTitle>
          <div className="max-w-4xl mx-auto">
            <ModuleCarousel
              modules={bonusModules}
              sectionType="bonus"
              onModuleClick={(moduleId) => handleModuleClick(moduleId, 'bonus')}
            />
          </div>
        </section>
      </div>

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
    </div>
  );
};

export default HomePage;