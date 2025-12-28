import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;