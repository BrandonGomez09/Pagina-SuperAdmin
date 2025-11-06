import React from 'react';
import { Navigate } from 'react-router-dom';

// Este componente protege las rutas
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Si no está logueado, redirige a /login
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, renderiza el contenido (en este caso, MainLayout)
  return children;
};

export default ProtectedRoute;