import React from 'react';
import './Header.css';

const Header = () => {
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
      <div className="header-right">
        {/* Espacio reservado para futuros botones */}
      </div>
    </header>
  );
};

export default Header;