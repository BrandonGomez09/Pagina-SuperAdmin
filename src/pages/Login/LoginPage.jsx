// src/pages/Login/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import { API_BASE_URL } from '../../api/config'; // Importamos la URL real
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  
  // Estados para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para la interfaz (carga y error)
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // 1. Hacemos la petición REAL a la API Gateway
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // 2. Verificamos si la respuesta fue exitosa
      // La API devuelve success: true si todo salió bien
      if (data.success && data.data && data.data.accessToken) {
        console.log("Login exitoso:", data.message);

        // 3. GUARDAMOS EL TOKEN y el usuario en localStorage
        // Esto es vital para las siguientes peticiones (aprobar/rechazar)
        localStorage.setItem('token', data.data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));

        // 4. Actualizamos el estado de la App y redirigimos
        onLogin();
        navigate('/', { replace: true });

      } else {
        // Si la API dice que falló (ej. contraseña mal)
        console.warn("Login fallido:", data);
        setErrorMessage('Credenciales incorrectas o usuario no encontrado.');
        setShowErrorModal(true);
      }

    } catch (error) {
      console.error("Error de red:", error);
      setErrorMessage('No se pudo conectar con el servidor. Revisa tu conexión.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Acceso Super Admin</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="admin@bienestar.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
          
        </form>
      </div>

      <ErrorModal
        show={showErrorModal}
        onClose={handleErrorModalClose}
      />
    </div>
  );
};

export default LoginPage;