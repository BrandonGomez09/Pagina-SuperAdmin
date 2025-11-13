// src/components/CocinaItem/CocinaItem.jsx

import React, { useState } from 'react';
import './CocinaItem.css';

// Función 'd' (sin cambios)
const d = (data) => (data !== null && data !== undefined) ?
String(data) : 'No disponible';

// Recibe los datos de una sola cocina como 'prop'
const CocinaItem = ({ cocina }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // --- LÓGICA DE DATOS (Sin cambios) ---
  const kitchenName = d(cocina.name);
  const responsable = `ID Propietario: ${d(cocina.owner_id)}`;

  return (
    <div className="cocina-item-card">
      <div className="cocina-header" onClick={toggleOpen}>
        <div>
          <h3>{kitchenName}</h3>
          <span className="cocina-responsable">{responsable}</span>
        </div>
        <span className="cocina-toggle-btn">
          {isOpen ? 'Ocultar' : 'Ver detalles'}
        </span>
      </div>

      {/* --- SECCIÓN DE DETALLES ACTUALIZADA --- */}
      {isOpen && (
        <div className="solicitud-details"> {/* Reusamos la clase de CSS */}
          
          <h4 className="details-subtitle">1. Datos del Propietario</h4>
          <div className="details-grid">
            <p><strong>ID del Propietario (owner_id):</strong> {d(cocina.owner_id)}</p>
          </div>

          <h4 className="details-subtitle">2. Datos de la Cocina</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {d(cocina.name)}</p>
            <p><strong>ID de la Cocina:</strong> {d(cocina.id)}</p>
            <p><strong>Estatus:</strong> {d(cocina.approval_status)}</p>
            
            {/* --- INICIO DE LA CORRECCIÓN --- */}
            {/* Mostrar campos relevantes según el estatus */}
            
            {cocina.approval_status === 'approved' && (
              <>
                <p><strong>Aprobado por (ID Admin):</strong> {d(cocina.approved_by)}</p>
                <p><strong>Fecha Aprobación:</strong> {d(cocina.approval_date)}</p>
              </>
            )}

            {cocina.approval_status === 'rejected' && (
              <p className="full-width"><strong>Razón de Rechazo:</strong> {d(cocina.rejection_reason)}</p>
            )}
            {/* --- FIN DE LA CORRECCIÓN --- */}
            
            <p className="full-width"><strong>Descripción:</strong><br/> {d(cocina.description)}</p>
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