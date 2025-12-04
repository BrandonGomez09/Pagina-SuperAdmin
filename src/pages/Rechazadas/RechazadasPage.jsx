import React, { useState, useEffect } from 'react';
import CocinaItem from '../../components/CocinaItem/CocinaItem';
import { API_BASE_URL, getAuthHeaders } from '../../api/config'; 
import './RechazadasPage.css';

const RechazadasPage = () => {
  const [cocinas, setCocinas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCocinasRechazadas = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/kitchens/rejected`, {
           method: 'GET',
           headers: getAuthHeaders(),
        });

        if (res.status === 401) {
           console.error("Sesión expirada o inválida");
           return;
        }

        const data = await res.json();
        
        if (data && data.success && Array.isArray(data.data)) {
          setCocinas(data.data);
        } else {
          setCocinas([]);
        }
      } catch (error) {
        console.error("Error al cargar las cocinas rechazadas:", error);
        setCocinas([]);
      }
      setLoading(false);
    };

    fetchCocinasRechazadas();
  }, []);

  if (loading) {
    return (
      <div className="list-section">
        <h2 className="list-title">Cargando historial...</h2>
      </div>
    );
  }

  return (
    <div className="list-section">
      <h2 className="list-title">Historial de Cocinas Rechazadas</h2>
      <div className="list-container">
        {cocinas.length > 0 ? (
          cocinas.map((cocina) => (
            <CocinaItem key={cocina.id} cocina={cocina} />
          ))
        ) : (
          <p>No hay cocinas rechazadas para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default RechazadasPage;