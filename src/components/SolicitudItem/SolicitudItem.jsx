// src/components/SolicitudItem/SolicitudItem.jsx

import React, { useState } from 'react';
import './SolicitudItem.css';

// Función 'd' (sin cambios, maneja 'false' y '0' correctamente)
const d = (data) => (data !== null && data !== undefined) ?
String(data) : 'No disponible';

const SolicitudItem = ({ request, onAccept, onReject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  // --- LÓGICA DE DATOS ACTUALIZADA ---
  // Leemos desde la raíz del objeto 'request'
  const kitchenName = d(request.name);
  const solicitante = `ID Propietario: ${d(request.owner_id)}`;

  return (
    <div className="solicitud-card">
      <div className="solicitud-header">
        
        <div className="solicitud-info" onClick={toggleOpen}>
          <span className="kitchen-name">{kitchenName}</span>
          <span className="applicant-name">{solicitante}</span>
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
      {isOpen && (
        <div className="solicitud-details">
          
          <h4 className="details-subtitle">1. Datos del Propietario</h4>
          <div className="details-grid">
            {/* La API de 'pending' no nos da el nombre, solo el ID */}
            <p><strong>ID del Propietario (owner_id):</strong> {d(request.owner_id)}</p>
          </div>

          <h4 className="details-subtitle">2. Datos de la Cocina</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {d(request.name)}</p>
            <p><strong>ID de la Cocina:</strong> {d(request.id)}</p>
            <p><strong>Estatus:</strong> {d(request.approval_status)}</p>
            <p className="full-width"><strong>Descripción:</strong><br/> {d(request.description)}</p>
          </div>

          <h4 className="details-subtitle">3. Ubicación (location)</h4>
          <div className="details-grid">
            {/* Esta parte ya estaba bien, la API sí anida 'location' */}
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