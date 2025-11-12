import React from 'react';
import { useNavigate } from 'react-router-dom'; // <--- CAMBIO: Importar hook de navegación
import './Header.css';

// RECIBIMOS LA PROP 'onLogout'
const Header = ({ onLogout }) => {
  const navigate = useNavigate(); // Inicializar hook

  // FUNCIÓN PARA MANEJAR EL LOGOUT (NUEVA)
  const handleLogout = () => {
    // 1. Ejecutar la función de App.jsx para cambiar isLoggedIn a false
    onLogout();
    // 2. Redirigir a la página de login
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
        <h1>Bienestar Integral</h1>
      </div>
 
      {/* CAMBIO: Agregamos el botón de Cerrar Sesión */}
      <div className="header-right">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default Header;