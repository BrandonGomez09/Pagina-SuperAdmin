import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/ErrorModal/ErrorModal'; // <--- NUEVO: Importar el modal de error
import './LoginPage.css';

// Credenciales fijas para el Super Admin
const ADMIN_EMAIL = '231205@ids.upchiapas.edu.mx';
const ADMIN_PASSWORD = 'Gomezbga09';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log("Inicio de sesión exitoso.");
      onLogin(); 
      navigate('/', { replace: true });
    } else {
      // CAMBIO: En lugar de alert(), mostramos el modal
      console.log("Inicio de sesión fallido. Mostrando modal.");
      setShowErrorModal(true); 
    }
  };
  
  // NUEVA FUNCIÓN para cerrar el modal
  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  }

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

          <button type="submit" className="login-button">
            Ingresar
          </button>
          
        </form>
      </div>

      {/* RENDERIZADO DEL NUEVO MODAL DE ERROR */}
      <ErrorModal
        show={showErrorModal}
        onClose={handleErrorModalClose}
      />
    </div>
  );
};

export default LoginPage;