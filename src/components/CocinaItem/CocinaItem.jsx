import React, { useState } from 'react';
import './CocinaItem.css'; // Importamos los estilos

// Recibe los datos de una sola cocina como 'prop'
const CocinaItem = ({ cocina }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  // Creamos el nombre completo del responsable
  const responsable = `${cocina.nombres} ${cocina.primerApellido}`;

  return (
    <div className="cocina-item-card">
      <div className="cocina-header" onClick={toggleOpen}>
        {/* Mostramos el nombre de la cocina y quién es el responsable */}
        <div>
          <h3>{cocina.nombre}</h3>
          <span className="cocina-responsable">Responsable: {responsable}</span>
        </div>
        <span className="cocina-toggle-btn">
          {isOpen ? 'Ocultar' : 'Ver detalles'}
        </span>
      </div>

      {/* --- SECCIÓN DE DETALLES ACTUALIZADA --- */}
      {isOpen && (
        <div className="cocina-details">
          
          {/* Sección 1: Datos del Responsable */}
          <h4 className="details-subtitle">1. Datos del Responsable</h4>
          <div className="details-grid">
            <p><strong>Nombres:</strong> {cocina.nombres}</p>
            <p><strong>Primer Apellido:</strong> {cocina.primerApellido}</p>
            <p><strong>Segundo Apellido:</strong> {cocina.segundoApellido}</p>
            <p><strong>Correo Electrónico:</strong> {cocina.correoResponsable}</p>
            <p><strong>Número de Teléfono:</strong> {cocina.telefonoResponsable}</p>
          </div>

          {/* Sección 2: Datos de la Cocina */}
          <h4 className="details-subtitle">2. Datos de la Cocina</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {cocina.nombre}</p>
            <p><strong>Teléfono de contacto:</strong> {cocina.telefono}</p>
            <p><strong>Email de contacto:</strong> {cocina.email}</p>
            <p className="full-width"><strong>Descripción:</strong><br/> {cocina.descripcion}</p>
          </div>

          {/* Sección 3: Ubicación */}
          <h4 className="details-subtitle">3. Ubicación</h4>
          <div className="details-grid">
            <p><strong>Dirección:</strong> {cocina.direccion}</p>
            <p><strong>Barrio o Colonia:</strong> {cocina.barrio}</p>
            <p><strong>Estado:</strong> {cocina.estado}</p>
            <p><strong>Municipio:</strong> {cocina.municipio}</p>
            <p><strong>Código Postal:</strong> {cocina.codigoPostal}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default CocinaItem;