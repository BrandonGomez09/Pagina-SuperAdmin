import React, { useState } from 'react';
import LocationName from '../LocationName/LocationName';
import './SolicitudItem.css';

const d = (data) => (data !== null && data !== undefined && data !== '') ? String(data) : 'No disponible';

const SolicitudItem = ({ request, onAccept, onReject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  const kitchenName = d(request.name);
  
  const nombreCompleto = request.responsible?.names
    ? `${d(request.responsible.names)} ${d(request.responsible.firstLastName)} ${d(request.responsible.secondLastName)}`
    : `ID: ${d(request.responsibleId || request.ownerId)}`;

  const solicitante = request.responsible?.names 
    ? `Solicitante: ${nombreCompleto}`
    : nombreCompleto;

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

      {isOpen && (
        <div className="solicitud-details">
          
          <h4 className="details-subtitle">1. Datos de la Cocina</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {d(request.name)}</p>
            <p><strong>Teléfono:</strong> {d(request.contactPhone)}</p>
            <p><strong>Email Cocina:</strong> {d(request.contactEmail)}</p>
            <p className="full-width"><strong>Descripción:</strong><br/> {d(request.description)}</p>
          </div>

          <h4 className="details-subtitle">2. Ubicación</h4>
          <div className="details-grid">
            <p><strong>Dirección:</strong> {d(request.location?.streetAddress)}</p>
            <p><strong>Colonia:</strong> {d(request.location?.neighborhood)}</p>
            <p><strong>C.P.:</strong> {d(request.location?.postalCode)}</p>
            
            <LocationName 
              stateId={request.location?.stateId} 
              municipalityId={request.location?.municipalityId} 
            />
          </div>
          
           <h4 className="details-subtitle">3. Datos del Responsable</h4>
           <div className="details-grid">
             <p><strong>Nombre Completo:</strong> {nombreCompleto}</p>
             <p><strong>Email Personal:</strong> {d(request.responsible?.email)}</p>
             <p><strong>Teléfono Personal:</strong> {d(request.responsible?.phoneNumber)}</p>
           </div>

        </div>
      )}
    </div>
  );
};

export default SolicitudItem;