// src/components/CocinaItem/CocinaItem.jsx

import React, { useState } from 'react';
import './CocinaItem.css';

// Función 'd' (sin cambios)
const d = (data) => (data !== null && data !== undefined) ? String(data) : 'No disponible';

// Recibe los datos de una sola cocina como 'prop'
const CocinaItem = ({ cocina }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  // --- LÓGICA DE DATOS ACTUALIZADA ---
  // Ahora leemos el JSON anidado ideal
  const kitchenName = d(cocina.kitchen?.name);
  const responsable = `${d(cocina.user?.names)} ${d(cocina.user?.firstLastName)}`;

  return (
    <div className="cocina-item-card">
      <div className="cocina-header" onClick={toggleOpen}>
        <div>
          <h3>{kitchenName}</h3>
          <span className="cocina-responsable">Responsable: {responsable}</span>
        </div>
        <span className="cocina-toggle-btn">
          {isOpen ? 'Ocultar' : 'Ver detalles'}
        </span>
      </div>

      {/* --- SECCIÓN DE DETALLES ACTUALIZADA --- */}
      {/* Ahora lee la estructura anidada completa */}
      {isOpen && (
        <div className="cocina-details">
          
          <h4 className="details-subtitle">1. Datos del Responsable (user)</h4>
          <div className="details-grid">
            <p><strong>Nombres:</strong> {d(cocina.user?.names)}</p>
            <p><strong>Primer Apellido:</strong> {d(cocina.user?.firstLastName)}</p>
            <p><strong>Segundo Apellido:</strong> {d(cocina.user?.secondLastName)}</p>
            <p><strong>Correo Electrónico:</strong> {d(cocina.user?.email)}</p>
            <p><strong>Teléfono:</strong> {d(cocina.user?.phoneNumber)}</p>
          </div>

          <h4 className="details-subtitle">2. Datos de la Cocina (kitchen)</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {d(cocina.kitchen?.name)}</p>
            <p><strong>Teléfono de contacto:</strong> {d(cocina.kitchen?.contactPhone)}</p>
            <p><strong>Email de contacto:</strong> {d(cocina.kitchen?.contactEmail)}</p>
            <p className="full-width"><strong>URL de Imagen:</strong> {d(cocina.kitchen?.imageUrl)}</p>
            <p className="full-width"><strong>Descripción:</strong><br/> {d(cocina.kitchen?.description)}</p>
          </div>

          <h4 className="details-subtitle">3. Ubicación (location)</h4>
          <div className="details-grid">
            <p><strong>Dirección:</strong> {d(cocina.location?.streetAddress)}</p>
            <p><strong>Barrio o Colonia:</strong> {d(cocina.location?.neighborhood)}</p>
            <p><strong>ID de Estado:</strong> {d(cocina.location?.stateId)}</p>
            <p><strong>ID de Municipio:</strong> {d(cocina.location?.municipalityId)}</p>
            <p><strong>C.P.:</strong> {d(cocina.location?.postalCode)}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default CocinaItem;