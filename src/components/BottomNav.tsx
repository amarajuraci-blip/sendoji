// amarajuraci-blip/sendoji/sendoji-5d31049582b4141029842a01bf9e35e78ed4a186/src/components/BottomNav.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Instagram, Youtube } from 'lucide-react';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonClass = (path: string) => {
    return location.pathname === path
      ? 'text-purple-400'
      : 'text-gray-400 hover:text-white';
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Função específica para o YouTube com o link correto
  const handleYouTubeClick = () => {
    window.open('https://youtube.com/@Desenhando_PassoaPasso?sub_confirmation=1', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-gray-900 border-t border-gray-800 z-50 flex justify-around items-center">
      
      {/* Botão Início */}
      <button onClick={() => navigate('/home')} className={`flex flex-col items-center gap-1 transition-colors duration-200 ${getButtonClass('/home')}`}>
        <Home className="w-6 h-6" />
        <span className="text-xs font-medium">Início</span>
      </button>

      {/* Botão Ofertas (Desativado) */}
      <button 
        disabled 
        className="flex flex-col items-center gap-1 text-gray-400 opacity-50 cursor-not-allowed"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="text-xs font-medium">Ofertas</span>
      </button>

      {/* Botão Instagram */}
      <button onClick={() => handleExternalLink('https://www.instagram.com/desenhando.passo_a_passo/')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors duration-200">
        <Instagram className="w-6 h-6" />
        <span className="text-xs font-medium">Instagram</span>
      </button>

      {/* Botão YouTube - CORRIGIDO */}
      <button onClick={handleYouTubeClick} className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors duration-200">
        <Youtube className="w-6 h-6" />
        <span className="text-xs font-medium">YouTube</span>
      </button>

    </div>
  );
};

export default BottomNav;