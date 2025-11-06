import React, { useState } from 'react';
import './SolicitudItem.css';

const SolicitudItem = ({ request, onAccept, onReject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };
  
  // Creamos el nombre completo del solicitante
  const solicitante = `${request.nombres} ${request.primerApellido} ${request.segundoApellido}`;

  return (
    <div className="solicitud-card">
      <div className="solicitud-header">
        
        <div className="solicitud-info" onClick={toggleOpen}>
          <span className="kitchen-name">{request.kitchenName}</span>
          {/* Usamos el nombre completo que creamos */}
          <span className="applicant-name">Solicitante: {solicitante}</span>
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
          
          {/* Sección 1: Datos del Responsable */}
          <h4 className="details-subtitle">1. Datos del Responsable</h4>
          <div className="details-grid">
            <p><strong>Nombres:</strong> {request.nombres}</p>
            <p><strong>Primer Apellido:</strong> {request.primerApellido}</p>
            <p><strong>Segundo Apellido:</strong> {request.segundoApellido}</p>
            <p><strong>Correo Electrónico:</strong> {request.correoResponsable}</p>
            <p><strong>Número de Teléfono:</strong> {request.telefonoResponsable}</p>
          </div>

          {/* Sección 2: Datos de la Cocina */}
          <h4 className="details-subtitle">2. Datos de la Cocina</h4>
          <div className="details-grid">
            <p><strong>Nombre:</strong> {request.kitchenName}</p>
            <p><strong>Teléfono de contacto:</strong> {request.telefonoCocina}</p>
            <p><strong>Email de contacto:</strong> {request.emailCocina}</p>
            <p className="full-width"><strong>Descripción:</strong><br/> {request.descripcion}</p>
          </div>

          {/* Sección 3: Ubicación */}
          <h4 className="details-subtitle">3. Ubicación</h4>
          <div className="details-grid">
            <p><strong>Dirección:</strong> {request.direccion}</p>
            <p><strong>Barrio o Colonia:</strong> {request.barrio}</p>
            <p><strong>Estado:</strong> {request.estado}</p>
            <p><strong>Municipio:</strong> {request.municipio}</p>
            <p><strong>Código Postal:</strong> {request.codigoPostal}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default SolicitudItem;