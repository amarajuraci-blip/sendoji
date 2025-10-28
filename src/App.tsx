// Conteúdo para: src/App.tsx

import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Module1Page from './components/Module1Page';
import Module2Page from './components/Module2Page';
import Module3Page from './components/Module3Page';
import Module4Page from './components/Module4Page';
import Module5Page from './components/Module5Page';
import Module6Page from './components/Module6Page';
import Module7Page from './components/Module7Page';
import Module8Page from './components/Module8Page';
import Module9Page from './components/Module9Page';
import Module10Page from './components/Module10Page';
import HowToDraw1Page from './components/HowToDraw1Page';
import HowToDraw2Page from './components/HowToDraw2Page';
import HowToDraw3Page from './components/HowToDraw3Page';
import HowToDraw4Page from './components/HowToDraw4Page';
import HowToDraw5Page from './components/HowToDraw5Page';
import HowToDraw6Page from './components/HowToDraw6Page';
import LessonPage from './components/LessonPage';
import ProtectedRoute from './components/ProtectedRoute';
import BonusPerspectivePage from './components/BonusPerspectivePage';
import PerspectiveModulePage from './components/PerspectiveModulePage';
import BonusChallengePage from './components/BonusChallengePage';
import ChallengeLessonPage from './components/ChallengeLessonPage';
import OfertasPage from './components/OfertasPage'; // <-- Importa a nova página
import BottomNav from './components/BottomNav'; // <-- Importa o novo menu

// Novo componente para controlar o layout
const AppLayout: React.FC = () => {
  const location = useLocation();
  const showBottomNav = location.pathname !== '/' && !location.pathname.includes('/aula/');

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        
        <Route path="/modulo/1" element={<ProtectedRoute><Module1Page /></ProtectedRoute>} />
        <Route path="/modulo/2" element={<ProtectedRoute><Module2Page /></ProtectedRoute>} />
        <Route path="/modulo/3" element={<ProtectedRoute><Module3Page /></ProtectedRoute>} />
        <Route path="/modulo/4" element={<ProtectedRoute><Module4Page /></ProtectedRoute>} />
        <Route path="/modulo/5" element={<ProtectedRoute><Module5Page /></ProtectedRoute>} />
        <Route path="/modulo/6" element={<ProtectedRoute><Module6Page /></ProtectedRoute>} />
        <Route path="/modulo/7" element={<ProtectedRoute><Module7Page /></ProtectedRoute>} />
        <Route path="/modulo/8" element={<ProtectedRoute><Module8Page /></ProtectedRoute>} />
        <Route path="/modulo/9" element={<ProtectedRoute><Module9Page /></ProtectedRoute>} />
        <Route path="/modulo/10" element={<ProtectedRoute><Module10Page /></ProtectedRoute>} />
        
        <Route path="/como-desenhar/1" element={<ProtectedRoute><HowToDraw1Page /></ProtectedRoute>} />
        <Route path="/como-desenhar/2" element={<ProtectedRoute><HowToDraw2Page /></ProtectedRoute>} />
        <Route path="/como-desenhar/3" element={<ProtectedRoute><HowToDraw3Page /></ProtectedRoute>} />
        <Route path="/como-desenhar/4" element={<ProtectedRoute><HowToDraw4Page /></ProtectedRoute>} />
        <Route path="/como-desenhar/5" element={<ProtectedRoute><HowToDraw5Page /></ProtectedRoute>} />
        <Route path="/como-desenhar/6" element={<ProtectedRoute><HowToDraw6Page /></ProtectedRoute>} />
        
        <Route path="/bonus/perspectiva" element={<ProtectedRoute><BonusPerspectivePage /></ProtectedRoute>} />
        <Route path="/bonus/perspectiva/:moduleId" element={<ProtectedRoute><PerspectiveModulePage /></ProtectedRoute>} />
        <Route path="/bonus/desafios" element={<ProtectedRoute><BonusChallengePage /></ProtectedRoute>} />
        <Route path="/bonus/desafios/:challengeId" element={<ProtectedRoute><ChallengeLessonPage /></ProtectedRoute>} />
        
        <Route path="/ofertas" element={<ProtectedRoute><OfertasPage /></ProtectedRoute>} /> {/* <-- Nova rota de ofertas */}
        
        <Route path="/modulo/:moduleId/aula/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
        <Route path="/como-desenhar/:moduleId/aula/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
        <Route path="/bonus/perspectiva/:moduleId/aula/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {showBottomNav && <BottomNav />} {/* <-- Exibe o menu com base na condição */}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;