import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import CocinasPage from './pages/Cocinas/CocinasPage'; // <-- 1. IMPORTAR
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
    <Routes>
      {/* Ruta Pública: /login */}
      <Route 
        path="/login" 
        element={<LoginPage onLogin={handleLogin} />} 
      />

      {/* Ruta Protegida: / */}
      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
             <MainLayout />
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