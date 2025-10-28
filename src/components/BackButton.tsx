import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, text }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center text-white hover:text-purple-400 transition-colors duration-300 text-lg group"
    >
      <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
      {text}
    </button>
  );
};

export default BackButton;