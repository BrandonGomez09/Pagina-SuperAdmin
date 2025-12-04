import React, { useState, useEffect } from 'react';
import CocinaItem from '../../components/CocinaItem/CocinaItem';
import { API_BASE_URL, getAuthHeaders } from '../../api/config'; 
import './CocinasPage.css';

const CocinasPage = () => {
  const [cocinas, setCocinas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCocinas = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/kitchens/approved`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        const data = await res.json();
        
        if (data && data.success && Array.isArray(data.data)) {
          setCocinas(data.data);
        } else {
          setCocinas([]);
        }
      } catch (error) {
        console.error("Error al cargar las cocinas:", error);
        setCocinas([]);
      }
      setLoading(false);
    };

    fetchCocinas();
  }, []);

  if (loading) {
    return <div className="list-section"><h2 className="list-title">Cargando cocinas...</h2></div>;
  }

  return (
    <div className="list-section">
      <h2 className="list-title">Cocinas Comunitarias Registradas</h2>
      <div className="list-container">
        {cocinas.length > 0 ? (
          cocinas.map((cocina) => (
            <CocinaItem key={cocina.id} cocina={cocina} />
          ))
        ) : (
          <p>No hay cocinas registradas para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default CocinasPage;