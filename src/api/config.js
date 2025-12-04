// src/api/config.js

export const API_BASE_URL = 'https://api-gateway.bim2.xyz/api/v1';

// Función auxiliar para obtener el token del almacenamiento
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Aquí se inserta el token
  };
};