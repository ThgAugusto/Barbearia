import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface ProtectedRouteProps {
  redirectTo: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
