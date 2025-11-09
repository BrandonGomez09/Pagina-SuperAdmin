// src/components/SolicitudItem/SolicitudItem.jsx

import React, { useState } from 'react';
import './SolicitudItem.css';

// --- NUEVA FUNCIÓN ---
// Esta función nos ayuda a mostrar un texto alternativo si el dato no existe
const d = (data) => data || 'No disponible';

const SolicitudItem = ({ request, onAccept, onReject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };
  
  // --- LÓGICA DE DATOS ACTUALIZADA ---
  // El solicitante (dueño) ya no lo tenemos, así que mostramos un genérico
  // OJO: 'request.name' es el nombre de la cocina (kitchenName)
  //      'request.contact_email' es el email de la cocina (emailCocina)
  //      'request.contact_phone' es el teléfono de la cocina (telefonoCocina)
  //      El backend los devuelve con esos nombres (por el modelo de Sequelize)

  const kitchenName = d(request.name);
  
  // Usaremos el email de contacto de la cocina como el "solicitante"
  const solicitante = d(request.contact_email); 

  return (
    <div className="solicitud-card">
      <div className="solicitud-header">
        
        <div className="solicitud-info" onClick={toggleOpen}>
          <span className="kitchen-name">{kitchenName}</span>
          <span className="applicant-name">Email Contacto: {solicitante}</span>
          <span className="solicitud-toggle-btn">
            {isOpen ? 'Ocultar detalles' : 'Ver detalles'}
          </span>
        </div>

        <div className="solicitud-actions" onClick={handleActionClick}>
          <button className="btn btn-accept" onClick={() => onAccept(request.id)}>
            Aceptar
          </button>
          <button className="btn btn-reject" onClick={() => onReject(request.id)}>
            Rechazar
          </button>
        </div>
      </div>

      {/* --- SECCIÓN DE DETALLES ACTUALIZADA --- */}
      {/* Ahora usamos la función 'd()' para evitar errores */}
      {isOpen && (
        <div className="solicitud-details">
          
          <h4 className="details-subtitle">1. Datos del Responsable</h4>
          <div className="details-grid">
            <p><strong>Nombres:</strong> {d(request.nombres)}</p>
            <p><strong>Primer Apellido:</strong> {d(request.primerApellido)}</p>
            <p><strong>Correo Electrónico:</strong> {d(request.correoResponsable)}</p>
          </div>

          <h4 className="details-subtitle">2. Datos de la Cocina</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {d(request.name)}</p>
            <p><strong>Teléfono de contacto:</strong> {d(request.contact_phone)}</p>
            <p><strong>Email de contacto:</strong> {d(request.contact_email)}</p>
            <p className="full-width"><strong>Descripción:</strong><br/> {d(request.description)}</p>
          </div>

          <h4 className="details-subtitle">3. Ubicación</h4>
          <div className="details-grid">
            <p><strong>Dirección:</strong> {d(request.direccion)}</p>
            <p><strong>Barrio o Colonia:</strong> {d(request.barrio)}</p>
            <p><strong>Estado:</strong> {d(request.estado)}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default SolicitudItem;