import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importar hook
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate(); // 2. Inicializar hook

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log("Intento de inicio de sesión...");
    
    // 3. Llama a la función para actualizar el estado en App.jsx
    onLogin(); 
    
    // 4. Navega programáticamente a la ruta principal
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Acceso Super Admin</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" required placeholder="admin@bienestar.com"/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required placeholder="••••••••"/>
          </div>

          <button type="submit" className="login-button">
            Ingresar
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;