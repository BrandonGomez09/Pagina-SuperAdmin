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

  const API_URL = 'http://localhost/api/kitchens';

  // Función para cargar los datos (sin cambios)
  const fetchData = async () => {
    try {
      const requestsRes = await fetch(`${API_URL}/pending`);
      const requestsData = await requestsRes.json();
      setPendingRequests(requestsData);

      const kitchensRes = await fetch(`${API_URL}/approved`);
      const kitchensData = await kitchensRes.json();
      setRegisteredKitchens(kitchensData);
      
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  // --- CAMBIO CLAVE: useEffect AHORA TIENE UN INTERVALO ---
  useEffect(() => {
    // 1. Llama a fetchData() inmediatamente la primera vez
    fetchData();

    // 2. Configura un intervalo para llamar a fetchData() cada 10 segundos
    const intervalId = setInterval(() => {
      console.log("Buscando nuevas solicitudes...");
      fetchData();
    }, 10000); // 10000 milisegundos = 10 segundos

    // 3. Función de limpieza:
    // Esto es MUY importante. Cuando el usuario sale de esta página,
    // el intervalo se detiene para evitar errores y consumo de memoria.
    return () => clearInterval(intervalId);
    
  }, []); // El array vacío [] asegura que esto se configure solo una vez

  // Lógica de Aceptar (sin cambios)
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/approve`, {
        method: 'POST',
      });
      if (res.ok) {
        // ANTES: llamábamos a fetchData() aquí.
        // AHORA: ya no es necesario, el intervalo lo hará automáticamente.
        // (Pero lo dejamos para una respuesta instantánea)
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
        // Igual que en Aceptar, el intervalo lo haría,
        // pero lo dejamos para una respuesta instantánea.
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