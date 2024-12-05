import React, { createContext, useContext, useState, useEffect } from "react";
import { decodeToken } from "../utils/jwtUtils";
import AuthServices from "../services/authServices";
import { AuthContextType, DecodedToken } from "../types/auth";



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { verifyAuth } = AuthServices();

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const response = await verifyAuth();
        if (response.success && response.token) {
          const decoded = decodeToken(response.token);
          if (decoded) {
            setUser(decoded);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setLoading(false);
      }
    };
    verifyAuthentication();
  }, []);

  const login = (token: string) => {
    const decoded = decodeToken(token);
    if (decoded) {
      setUser(decoded);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
