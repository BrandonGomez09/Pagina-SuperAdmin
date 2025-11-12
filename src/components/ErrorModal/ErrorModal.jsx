// src/components/ErrorModal/ErrorModal.jsx

import React from 'react';
import './ErrorModal.css';

// Recibe 2 props:
// 1. show: (true/false) para mostrarlo u ocultarlo
// 2. onClose: una función para cerrarlo

const ErrorModal = ({ show, onClose }) => {
  // Si no se debe mostrar, no renderiza nada
  if (!show) {
    return null;
  }

  // Usamos e.stopPropagation() para evitar que el clic dentro del modal
  // cierre el modal a través del overlay
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">¡Error de Acceso!</h2>
        
        <p className="modal-message">
          Correo electrónico o contraseña incorrectos. Por favor, verifica tus credenciales.
        </p>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;