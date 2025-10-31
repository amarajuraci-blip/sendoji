// amarajuraci-blip/sendoji/sendoji-5d31049582b4141029842a01bf9e35e78ed4a186/src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';
import { supabase } from '../supabaseClient';
import { Session, AuthChangeEvent } from '@supabase/supabase-js'; // Importa os tipos necessários

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. Tenta pegar a sessão que já existe
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);

      if (!session && location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    });

    // 2. Ouve por mudanças na autenticação (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      // CORREÇÃO AQUI: Adiciona os tipos aos parâmetros
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setLoading(false);
        
        if (!session && location.pathname !== '/') {
          navigate('/', { replace: true });
        }
      }
    );

    // 3. Limpa o "ouvinte" quando o componente é desmontado
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // Exibe um loading enquanto a sessão está sendo verificada
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          Carregando...
        </div>
      </div>
    );
  }

  // Se não há sessão (não está logado), mostra a página de login
  if (!session) {
    return <LoginPage />;
  }

  // Se há sessão (está logado), mostra o conteúdo protegido (o {children})
  return <>{children}</>;
};

export default ProtectedRoute;