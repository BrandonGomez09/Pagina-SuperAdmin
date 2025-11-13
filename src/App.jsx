// src/App.jsx

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import CocinasPage from './pages/Cocinas/CocinasPage';
// 1. Importar la nueva página
import RechazadasPage from './pages/Rechazadas/RechazadasPage'; 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
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

      {/* Rutas Protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <MainLayout onLogout={handleLogout} /> 
          </ProtectedRoute>
        }
      >
        {/* Ruta hija 1 (Home) */}
        <Route index element={<HomePage />} />
        
        {/* Ruta hija 2 (Cocinas Aprobadas) */}
        <Route path="/cocinas" element={<CocinasPage />} />
        
        {/* 2. Añadir la nueva ruta para Rechazadas */}
        <Route path="/rechazadas" element={<RechazadasPage />} />
        
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;