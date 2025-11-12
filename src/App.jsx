import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import CocinasPage from './pages/Cocinas/CocinasPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para iniciar sesión (ya existente)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  // FUNCIÓN PARA CERRAR SESIÓN (NUEVA)
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      {/* Ruta Pública: /login */}
      <Route 
        path="/login" 
        element={<LoginPage onLogin={handleLogin} />} 
      />

      {/* VERIFICACIÓN DE RUTAS PROTEGIDAS: SÍ, YA TIENES ProtectedRoute.
          La ruta principal "/" y sus hijas (Home, /cocinas) están protegidas
          por el componente <ProtectedRoute />[cite: 18].
          Si isLoggedIn es false, ProtectedRoute redirige a /login.
          
          CAMBIO: Pasamos la función de cierre de sesión al MainLayout.
      */}
      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            {/* PASAMOS handleLogout AL LAYOUT [cite: 18] */}
            <MainLayout onLogout={handleLogout} /> 
          </ProtectedRoute>
        }
      >
        {/* Ruta hija 1 (la que ya tenías) */}
        <Route index element={<HomePage />} />
        
        {/* Ruta hija 2 (¡LA NUEVA RUTA!) */}
        <Route path="/cocinas" element={<CocinasPage />} />
        
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;