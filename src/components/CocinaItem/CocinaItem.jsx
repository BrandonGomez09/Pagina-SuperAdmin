import React, { useState } from 'react';
import LocationName from '../LocationName/LocationName';
import './CocinaItem.css';

const d = (data) => (data !== null && data !== undefined && data !== '') ? String(data) : 'No disponible';

const CocinaItem = ({ cocina }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const kitchenName = d(cocina.name);
  const responsable = cocina.responsible?.names 
    ? `Nombre del dueño: ${d(cocina.responsible.names)} ${d(cocina.responsible.firstLastName)} ${d(cocina.responsible.secondLastName)}`
    : `ID Responsable: ${d(cocina.responsibleId || cocina.ownerId)}`;

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

      {isOpen && (
        <div className="solicitud-details">
          
          <h4 className="details-subtitle">1. Datos de la Cocina</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {d(cocina.name)}</p>
            <p><strong>Estatus:</strong> {d(cocina.approvalStatus)}</p>
            
            {cocina.approvalStatus === 'approved' && (
              <>
                <p><strong>Teléfono:</strong> {d(cocina.contactPhone)}</p>
                <p><strong>Email:</strong> {d(cocina.contactEmail)}</p>
              </>
            )}

            {cocina.approvalStatus === 'rejected' && (
              <p className="full-width"><strong>Razón de Rechazo:</strong> {d(cocina.rejectionReason)}</p>
            )}
            
            <p className="full-width"><strong>Descripción:</strong><br/> {d(cocina.description)}</p>
          </div>

          <h4 className="details-subtitle">2. Ubicación</h4>
          <div className="details-grid">
            <p><strong>Dirección:</strong> {d(cocina.location?.streetAddress)}</p>
            <p><strong>Barrio/Colonia:</strong> {d(cocina.location?.neighborhood)}</p>
            <p><strong>C.P.:</strong> {d(cocina.location?.postalCode)}</p>

            <LocationName 
              stateId={cocina.location?.stateId} 
              municipalityId={cocina.location?.municipalityId} 
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default CocinaItem;