import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../api/config';

const LocationName = ({ stateId, municipalityId }) => {
  const [stateName, setStateName] = useState('Cargando...');
  const [municipalityName, setMunicipalityName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stateId) {
        setStateName('No especificado');
        setLoading(false);
        return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const stateRes = await fetch(`${API_BASE_URL}/states`);
        const stateData = await stateRes.json();
        
        let foundStateName = `Estado ID: ${stateId}`; 
        
        if (stateData.data && Array.isArray(stateData.data)) {
            const foundState = stateData.data.find(s => String(s.id) === String(stateId));
            if (foundState) {
                foundStateName = foundState.name;
            }
        }
        setStateName(foundStateName);
        if (municipalityId) {
            const munRes = await fetch(`${API_BASE_URL}/states/${stateId}/municipalities?limit=500`);
            const munData = await munRes.json();
            
            if (munData.data && Array.isArray(munData.data)) {
                const foundMun = munData.data.find(m => String(m.id) === String(municipalityId));
                if (foundMun) {
                    setMunicipalityName(foundMun.name);
                } else {
                    setMunicipalityName(`Mun ID: ${municipalityId}`);
                }
            }
        }

      } catch (error) {
        console.error("Error al traducir ubicación:", error);
        setStateName('Error al cargar ubicación');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stateId, municipalityId]);

  if (loading) return <span>Cargando ubicación...</span>;

  return (
    <>
      <p><strong>Estado:</strong> {stateName}</p>
      {municipalityName && <p><strong>Municipio:</strong> {municipalityName}</p>}
    </>
  );
};

export default LocationName;