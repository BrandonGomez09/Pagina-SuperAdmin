import React, { useState, useEffect } from 'react';
import SolicitudItem from '../../components/SolicitudItem/SolicitudItem';
import RejectModal from '../../components/RejectModal/RejectModal';
import { API_BASE_URL, getAuthHeaders } from '../../api/config';
import './HomePage.css';

const HomePage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rejectionTargetId, setRejectionTargetId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPendingData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/kitchens/pending`, {
        method: 'GET',
        headers: getAuthHeaders(), 
      });
      
      if (res.status === 401) {
        console.error("No autorizado. Tal vez el token expiró.");
        return;
      }

      const data = await res.json();
      
      if (data && data.success && Array.isArray(data.data)) {
        setPendingRequests(data.data);
      } else {
        setPendingRequests([]);
      }
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
      setPendingRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingData();
  }, []);

  const handleAccept = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/kitchens/${id}/approve`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        alert("Cocina aprobada correctamente");
        fetchPendingData(); // Recargar lista
      } else {
        alert("Error al aprobar la cocina");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleReject = (id) => {
    setRejectionTargetId(id);
    setModalIsOpen(true);
  };

  const handleSubmitRejection = async (reason) => {
    if (!reason) return;
    try {
      const res = await fetch(`${API_BASE_URL}/kitchens/${rejectionTargetId}/reject`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason }),
      });
      if (res.ok) {
        alert("Cocina rechazada correctamente");
        fetchPendingData();
      } else {
        alert("Error al rechazar la cocina");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
    setModalIsOpen(false);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setRejectionTargetId(null);
  };

  if (loading) return <div className="requests-section"><h2>Cargando solicitudes...</h2></div>;

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
            <p>No hay solicitudes pendientes.</p>
          )}
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