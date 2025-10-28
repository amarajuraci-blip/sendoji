import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      const isAuth = loginStatus === 'true';
      setIsAuthenticated(isAuth);
      
      // If not authenticated and not on login page, redirect to login
      if (!isAuth && location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    };

    checkAuth();

    // Listen for storage changes (useful for logout from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isLoggedIn') {
        const isAuth = e.newValue === 'true';
        setIsAuthenticated(isAuth);
        if (!isAuth) {
          navigate('/', { replace: true });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate, location.pathname]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          Carregando...
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;