import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../services/auth/authService';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const authServices = AuthServices();
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = async () => {
      const user = await authServices.verifyAuth();
      setIsAuthenticated(user ? true : false);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    navigate('/login');
    return null;
  }
};

export default ProtectedRoute;
