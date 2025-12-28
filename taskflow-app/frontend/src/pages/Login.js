import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Asegúrate de que este archivo esté en la misma carpeta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Login exitoso:", response);
      navigate('/dashboard');
    } catch (error) {
      console.error("ERROR DETALLADO:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || "Credenciales incorrectas"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>TaskFlow</h2>
          <p>Bienvenido de nuevo a tu espacio de trabajo</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@taskflow.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex-options">
            <label className="remember-me">
              <input type="checkbox" /> 
              <span>Recordarme</span>
            </label>
            <button type="button" className="forgot-password-link">
              ¿Olvidaste tu clave?
            </button>
          </div>

          <button type="submit" className="login-button">
            Ingresar a la plataforma
          </button>
        </form>

        <div className="login-footer">
          <p>
            ¿No tienes cuenta? 
            <button type="button" className="register-link">Regístrate gratis</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;