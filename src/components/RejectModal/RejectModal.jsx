// src/components/RejectModal/RejectModal.jsx

import React, { useState } from 'react';
import './RejectModal.css';

// El modal recibe 3 "props":
// 1. show: (true/false) para mostrarlo u ocultarlo
// 2. onClose: una función para cerrarlo (al hacer clic en "Cancelar")
// 3. onSubmit: una función para enviar el motivo (al hacer clic en "Confirmar")

const RejectModal = ({ show, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  // Si no se debe mostrar, no renderiza nada
  if (!show) {
    return null;
  }

  const handleSubmit = () => {
    // Llama a la función que le pasamos desde HomePage
    onSubmit(reason);
    setReason(''); // Limpiamos el textarea
  };

  const handleClose = () => {
    onClose();
    setReason(''); // Limpiamos el textarea
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Rechazar Solicitud</h2>
        <p>Por favor, especifica el motivo del rechazo.</p>

        <label htmlFor="rejectionReason" className="modal-label">Motivo:</label>
        <textarea
          id="rejectionReason"
          className="modal-textarea"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Escribe aquí por qué se rechaza la solicitud..."
        />

        <div className="modal-actions">
          <button className="btn btn-reject" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn btn-accept" onClick={handleSubmit}>
            Confirmar Rechazo
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;