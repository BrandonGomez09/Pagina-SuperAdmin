// src/components/CocinaItem/CocinaItem.jsx

import React, { useState } from 'react';
import './CocinaItem.css';

// --- NUEVA FUNCIÓN ---
// Esta función nos ayuda a mostrar un texto alternativo si el dato no existe
const d = (data) => data || 'No disponible';

// Recibe los datos de una sola cocina como 'prop'
const CocinaItem = ({ cocina }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  // --- LÓGICA DE DATOS ACTUALIZADA ---
  // Usamos el email de contacto como "Responsable" por ahora
  const responsable = d(cocina.contact_email);
  const kitchenName = d(cocina.name);

  return (
    <div className="cocina-item-card">
      <div className="cocina-header" onClick={toggleOpen}>
        <div>
          <h3>{kitchenName}</h3>
          <span className="cocina-responsable">Email Contacto: {responsable}</span>
        </div>
        <span className="cocina-toggle-btn">
          {isOpen ? 'Ocultar' : 'Ver detalles'}
        </span>
      </div>

      {/* --- SECCIÓN DE DETALLES ACTUALIZADA --- */}
      {/* Ahora usamos la función 'd()' para evitar errores */}
      {isOpen && (
        <div className="cocina-details">
          
          <h4 className="details-subtitle">1. Datos del Responsable</h4>
          <div className="details-grid">
            <p><strong>Nombres:</strong> {d(cocina.nombres)}</p>
            <p><strong>Primer Apellido:</strong> {d(cocina.primerApellido)}</p>
            <p><strong>Correo Electrónico:</strong> {d(cocina.correoResponsable)}</p>
          </div>

          <h4 className="details-subtitle">2. Datos de la Cocina</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {d(cocina.name)}</p>
            <p><strong>Teléfono de contacto:</strong> {d(cocina.contact_phone)}</p>
            <p><strong>Email de contacto:</strong> {d(cocina.contact_email)}</p>
            <p className="full-width"><strong>Descripción:</strong><br/> {d(cocina.description)}</p>
          </div>

          <h4 className="details-subtitle">3. Ubicación</h4>
          <div className="details-grid">
            <p><strong>Dirección:</strong> {d(cocina.direccion)}</p>
            <p><strong>Barrio o Colonia:</strong> {d(cocina.barrio)}</p>
            <p><strong>Estado:</strong> {d(cocina.estado)}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default CocinaItem;