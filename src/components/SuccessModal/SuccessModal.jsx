import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon-container">
          &#10004;
        </div>
        <h2 className="success-modal-title">{title || '¡Éxito!'}</h2>
        <p className="success-modal-message">{message}</p>
        
        <button className="success-modal-btn" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;