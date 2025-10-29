import React from 'react';
import { X } from 'lucide-react'; // Ícone para fechar

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) {
    return null; // Não renderiza nada se não estiver aberto
  }

  return (
    // Overlay semi-transparente que cobre a tela
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      {/* Caixa do Modal */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full border border-purple-500 relative">
        {/* Botão de Fechar no canto */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Título (Opcional, mas bom para clareza) */}
        <h2 className="text-xl md:text-2xl font-bold text-center text-yellow-400 mb-4">
          ♦ ATENÇÃO ♦
        </h2>

        {/* Mensagem */}
        <p className="text-gray-200 text-center mb-6">{message}</p>

        {/* Botão de Ação/Fechar */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;