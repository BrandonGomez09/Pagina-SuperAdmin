// src/pages/Home/HomePage.jsx

import React, { useState, useEffect } from 'react';
import './HomePage.css';
// Ya no importamos CocinaItem
import SolicitudItem from '../../components/SolicitudItem/SolicitudItem';
import RejectModal from '../../components/RejectModal/RejectModal';

const HomePage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  // Ya no necesitamos 'registeredKitchens' en esta página
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rejectionTargetId, setRejectionTargetId] = useState(null);

  const API_URL = 'http://localhost:3004/api/v1/kitchens';
  const ADMIN_ID = 1;

  // Dejamos solo la lógica para cargar las solicitudes PENDIENTES
  const fetchPendingData = async () => {
    try {
      const requestsRes = await fetch(`${API_URL}/pending`);
      const requestsData = await requestsRes.json();
      
      if (requestsData && requestsData.success && Array.isArray(requestsData.data)) {
        setPendingRequests(requestsData.data);
      } else {
        setPendingRequests([]); 
      }
    } catch (error) {
      console.error("Error al cargar las solicitudes pendientes:", error);
      setPendingRequests([]);
    }
  };

  useEffect(() => {
    fetchPendingData(); // Renombramos la función para más claridad
    const intervalId = setInterval(() => {
      console.log("Buscando nuevas solicitudes...");
      fetchPendingData();
    }, 10000); 

    return () => clearInterval(intervalId);
  }, []);

  // --- Lógica de Aceptar (Modificada) ---
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminUserId: ADMIN_ID }),
      });
      if (res.ok) {
        // En lugar de recargar todo, solo actualizamos las pendientes
        fetchPendingData(); 
      } else {
        console.error("Error al aprobar la solicitud");
      }
    } catch (error) {
      console.error("Error de red al aprobar:", error);
    }
  };

  // --- Lógica de Rechazar (Modificada) ---
  const handleSubmitRejection = async (reason) => {
    if (!reason) {
      alert("Por favor, ingresa un motivo para rechazar.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${rejectionTargetId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reason: reason,
          adminUserId: ADMIN_ID 
        }),
      });
      if (res.ok) {
        // Solo actualizamos las pendientes
        fetchPendingData(); 
      } else {
        console.error("Error al rechazar la solicitud");
      }
    } catch (error) {
      console.error("Error de red al rechazar:", error);
    }
    setModalIsOpen(false);
    setRejectionTargetId(null);
  };

  const handleReject = (id) => {
    setRejectionTargetId(id);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setRejectionTargetId(null);
  };

  // --- JSX (Simplificado) ---
  return (
    <>
      <section className="requests-section">
        <h2 className="requests-title">
          Solicitudes Pendientes
          <span className="item-counter">({pendingRequests.length})</span>
        </h2>
        <div className="requests-container">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <SolicitudItem 
                key={request.id}
                request={request}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))
          ) : (
            <p>No hay solicitudes pendientes para mostrar.</p>
          )}
        </div>
      </section>

      {/* YA NO MOSTRAMOS LA LISTA DE COCINAS REGISTRADAS AQUÍ */}

      <RejectModal 
        show={modalIsOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRejection}
      />
    </>
  );
};

export default HomePage;