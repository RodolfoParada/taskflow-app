import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Intentar recuperar la sesión al cargar la página
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

// Dentro de AuthContext.js
const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    // 1. GUARDAR EN LOCALSTORAGE (Vital para que Axios lo use)
    localStorage.setItem('token', token); 
    
    // 2. ACTUALIZAR ESTADO
    setUser(user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);