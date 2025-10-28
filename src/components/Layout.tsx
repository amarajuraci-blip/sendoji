import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Determinar se deve mostrar a BottomNav
  const shouldShowBottomNav = () => {
    const currentPath = location.pathname;
    
    // Não mostrar na página de login
    if (currentPath === '/') {
      return false;
    }
    
    // Não mostrar nas páginas de aula (que contêm '/aula/')
    if (currentPath.includes('/aula/')) {
      return false;
    }
    
    // Mostrar em todas as outras páginas protegidas
    return true;
  };

  return (
    <>
      {children}
      {shouldShowBottomNav() && <BottomNav />}
    </>
  );
};

export default Layout;