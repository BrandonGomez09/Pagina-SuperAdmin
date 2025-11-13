// src/pages/Rechazadas/RechazadasPage.jsx

import React, { useState, useEffect } from 'react';
import CocinaItem from '../../components/CocinaItem/CocinaItem';
import './RechazadasPage.css'; // Estilos para esta página

const RechazadasPage = () => {
  const [cocinas, setCocinas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_URL = 'http://localhost:3004/api/v1/kitchens';

  useEffect(() => {
    const fetchCocinasRechazadas = async () => {
      setLoading(true);
      try {
        // --- CAMBIO DE ENDPOINT ---
        const res = await fetch(`${API_URL}/rejected`); 
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
        <h2 className="list-title">Cargando historial de rechazos...</h2>
      </div>
    );
  }

  return (
    <div className="list-section">
      <h2 className="list-title">Cocinas Rechazadas</h2>
      <div className="list-container">
        
        {cocinas.length > 0 ? (
          cocinas.map((cocina) => (
            // Reutilizamos el mismo componente CocinaItem
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