// src/components/Header/Header.jsx

import React from 'react';
// Importamos NavLink para los links de navegación
import { useNavigate, NavLink } from 'react-router-dom'; 
import './Header.css';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  // Función para manejar el logout
  const handleLogout = () => {
    onLogout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="main-header">
      <div className="header-left">
        <img 
          src="/logo.png" 
          alt="Logo Bienestar Digital" 
          className="logo"
        />
      </div>
      
      <div className="header-center">
        <nav className="main-nav">
          <NavLink 
            to="/" 
            end // 'end' asegura que solo esté activo en la ruta exacta "/"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Solicitudes
          </NavLink>
          <NavLink 
            to="/cocinas" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Cocinas Registradas
          </NavLink>

          {/* --- AÑADIR ESTE NAVLINK --- */}
          <NavLink 
            to="/rechazadas" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Historial Rechazadas
          </NavLink>
          {/* ------------------------- */}
        </nav>
      </div>
      
      <div className="header-right">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default Header;