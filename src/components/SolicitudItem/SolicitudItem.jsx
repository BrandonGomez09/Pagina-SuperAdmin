// src/components/SolicitudItem/SolicitudItem.jsx

import React, { useState } from 'react';
import './SolicitudItem.css';

// Función 'd' (sin cambios, maneja 'false' y '0' correctamente)
const d = (data) => (data !== null && data !== undefined) ? String(data) : 'No disponible';

const SolicitudItem = ({ request, onAccept, onReject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  // --- LÓGICA DE DATOS ACTUALIZADA ---
  // Ahora leemos el JSON anidado ideal
  const kitchenName = d(request.kitchen?.name);
  const solicitante = `${d(request.user?.names)} ${d(request.user?.firstLastName)}`;

  return (
    <div className="solicitud-card">
      <div className="solicitud-header">
        
        <div className="solicitud-info" onClick={toggleOpen}>
          <span className="kitchen-name">{kitchenName}</span>
          <span className="applicant-name">Responsable: {solicitante}</span>
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
      {/* Ahora lee la estructura anidada completa */}
      {isOpen && (
        <div className="solicitud-details">
          
          <h4 className="details-subtitle">1. Datos del Responsable (user)</h4>
          <div className="details-grid">
            <p><strong>Nombres:</strong> {d(request.user?.names)}</p>
            <p><strong>Primer Apellido:</strong> {d(request.user?.firstLastName)}</p>
            <p><strong>Segundo Apellido:</strong> {d(request.user?.secondLastName)}</p>
            <p><strong>Correo Electrónico:</strong> {d(request.user?.email)}</p>
            <p><strong>Teléfono:</strong> {d(request.user?.phoneNumber)}</p>
          </div>

          <h4 className="details-subtitle">2. Datos de la Cocina (kitchen)</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {d(request.kitchen?.name)}</p>
            <p><strong>Teléfono de contacto:</strong> {d(request.kitchen?.contactPhone)}</p>
            <p><strong>Email de contacto:</strong> {d(request.kitchen?.contactEmail)}</p>
            <p className="full-width"><strong>URL de Imagen:</strong> {d(request.kitchen?.imageUrl)}</p>
            <p className="full-width"><strong>Descripción:</strong><br/> {d(request.kitchen?.description)}</p>
          </div>

          <h4 className="details-subtitle">3. Ubicación (location)</h4>
          <div className="details-grid">
            <p><strong>Dirección:</strong> {d(request.location?.streetAddress)}</p>
            <p><strong>Barrio o Colonia:</strong> {d(request.location?.neighborhood)}</p>
            <p><strong>ID de Estado:</strong> {d(request.location?.stateId)}</p>
            <p><strong>ID de Municipio:</strong> {d(request.location?.municipalityId)}</p>
            <p><strong>C.P.:</strong> {d(request.location?.postalCode)}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default SolicitudItem;