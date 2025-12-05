import React, { useState, useEffect } from 'react';
import SolicitudItem from '../../components/SolicitudItem/SolicitudItem';
import RejectModal from '../../components/RejectModal/RejectModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import { API_BASE_URL, getAuthHeaders } from '../../api/config';
import './HomePage.css';

const HomePage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalRejectIsOpen, setModalRejectIsOpen] = useState(false);
  const [rejectionTargetId, setRejectionTargetId] = useState(null);


  const [successModal, setSuccessModal] = useState({
    show: false,
    title: '',
    message: ''
  });

  const fetchPendingData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/kitchens/pending`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      if (res.status === 401) {
        console.error("No autorizado. Token expirado.");
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
    const interval = setInterval(fetchPendingData, 10000);
    return () => clearInterval(interval);
  }, []);

  const showSuccess = (title, msg) => {
    setSuccessModal({ show: true, title: title, message: msg });
    fetchPendingData();
  };

  const closeSuccess = () => {
    setSuccessModal({ ...successModal, show: false });
  };

  const handleAccept = async (id) => {
    if(!window.confirm("¿Seguro que deseas aprobar esta cocina?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/kitchens/${id}/approve`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showSuccess('¡Cocina Aprobada!', 'La cocina ha sido registrada exitosamente.');
      } else {
        alert("Error al aprobar la cocina");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleRejectClick = (id) => {
    setRejectionTargetId(id);
    setModalRejectIsOpen(true);
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
        showSuccess('Cocina Rechazada', 'La solicitud ha sido rechazada correctamente.');
      } else {
        alert("Error al rechazar la cocina");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
    setModalRejectIsOpen(false);
    setRejectionTargetId(null);
  };

  const handleCloseRejectModal = () => {
    setModalRejectIsOpen(false);
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
                onReject={handleRejectClick}
              />
            ))
          ) : (
            <p>No hay solicitudes pendientes.</p>
          )}
        </div>
      </section>

      <RejectModal 
        show={modalRejectIsOpen}
        onClose={handleCloseRejectModal}
        onSubmit={handleSubmitRejection}
      />

      <SuccessModal 
        show={successModal.show}
        onClose={closeSuccess}
        title={successModal.title}
        message={successModal.message}
      />
    </>
  );
};

export default HomePage;