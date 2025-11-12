// src/pages/Home/HomePage.jsx

import React, { useState, useEffect } from 'react';
import './HomePage.css';
import CocinaItem from '../../components/CocinaItem/CocinaItem';
import SolicitudItem from '../../components/SolicitudItem/SolicitudItem';
import RejectModal from '../../components/RejectModal/RejectModal';

const HomePage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [registeredKitchens, setRegisteredKitchens] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rejectionTargetId, setRejectionTargetId] = useState(null);

  const API_URL = 'http://localhost/api/kitchens'; // (Esto debe ser 'http://localhost/api/v1/kitchens')

  // --- FUNCIÓN FETCHDATA MODIFICADA ---
  const fetchData = async () => {
    try {
      // Cargar Pendientes
      const requestsRes = await fetch(`${API_URL}/pending`);
      const requestsData = await requestsRes.json();
      
      // ¡CAMBIO AQUÍ! Leemos la propiedad "data" del JSON
      if (requestsData && requestsData.success && Array.isArray(requestsData.data)) {
        setPendingRequests(requestsData.data);
      } else {
        setPendingRequests([]); // Ponemos un array vacío si falla
      }

      // Cargar Aprobadas (Asumimos la misma estructura)
      const kitchensRes = await fetch(`${API_URL}/approved`);
      const kitchensData = await kitchensRes.json();
      
      // ¡CAMBIO AQUÍ! También leemos la propiedad "data"
      if (kitchensData && kitchensData.success && Array.isArray(kitchensData.data)) {
        setRegisteredKitchens(kitchensData);
      } else {
        setRegisteredKitchens([]);
      }
      
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };
  // --- FIN DE LA MODIFICACIÓN ---

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      console.log("Buscando nuevas solicitudes...");
      fetchData();
    }, 10000); 

    return () => clearInterval(intervalId);
  }, []); 

  // Lógica de Aceptar (sin cambios)
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/approve`, {
        method: 'POST',
      });
      if (res.ok) {
        fetchData();
      } else {
        console.error("Error al aprobar la solicitud");
      }
    } catch (error) {
      console.error("Error de red al aprobar:", error);
    }
  };

  // Lógica de Rechazar (sin cambios)
  const handleReject = (id) => {
    setRejectionTargetId(id);
    setModalIsOpen(true);
  };

  const handleSubmitRejection = async (reason) => {
    if (!reason) {
      alert("Por favor, ingresa un motivo para rechazar.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${rejectionTargetId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: reason }),
      });
      if (res.ok) {
        fetchData();
      } else {
        console.error("Error al rechazar la solicitud");
      }
    } catch (error) {
      console.error("Error de red al rechazar:", error);
    }
    setModalIsOpen(false);
    setRejectionTargetId(null);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setRejectionTargetId(null);
  };

  // JSX (sin cambios)
  return (
    <>
      <section className="requests-section">
        <h2 className="requests-title">Solicitudes de cocinas</h2>
        <div className="requests-container">
          {pendingRequests.map((request) => (
            <SolicitudItem 
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      </section>

      <section className="requests-section">
        <h2 className="requests-title">
          Cocinas Registradas 
          <span className="item-counter">({registeredKitchens.length})</span>
        </h2>
        <div className="requests-container">
          {registeredKitchens.map((cocina) => (
            <CocinaItem key={cocina.id} cocina={cocina} />
          ))}
        </div>
      </section>

      <RejectModal 
        show={modalIsOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRejection}
      />
    </>
  );
};

export default HomePage;