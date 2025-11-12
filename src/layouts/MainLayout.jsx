import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// Esta es la plantilla para todas las páginas protegidas
// RECIBIMOS LA PROP 'onLogout' [cite: 109]
const MainLayout = ({ onLogout }) => { 
  return (
    <>
      {/* PASAMOS LA PROP 'onLogout' AL HEADER */}
      <Header onLogout={onLogout} />
      <main>
        {/* Outlet renderizará el componente de la ruta hija (ej. HomePage) */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;