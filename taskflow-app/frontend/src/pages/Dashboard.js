import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importación necesaria para el redireccionamiento
import { useProjects } from '../context/ProjectContext';
import api from '../api/axios';
import '../styles/Dashboard.css'; 

const Dashboard = () => {
  const navigate = useNavigate(); // Inicialización de navigate
  const { projects, loading, fetchProjects } = useProjects();
  
  // Estados
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [uploading, setUploading] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  const BACKEND_URL = "http://localhost:3001";

  // --- EFECTO: CARGAR DATOS AL INICIAR ---
  useEffect(() => {
    // 1. Cargar foto desde localStorage para rapidez
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setProfileImg(savedAvatar);
    }

    // 2. Sincronizar con el backend
    const fetchUserData = async () => {
      try {
        const response = await api.get('/auth/profile');
        if (response.data.avatarUrl) {
          const fullUrl = `${BACKEND_URL}${response.data.avatarUrl}`;
          setProfileImg(fullUrl);
          localStorage.setItem('userAvatar', fullUrl);
        }
      } catch (err) {
        console.error("Error al sincronizar perfil");
      }
    };
    
    fetchUserData();
  }, []);

  // --- FUNCIONES DE SESIÓN Y PERFIL ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userAvatar');
    navigate('/login'); // Ahora funciona correctamente
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    setUploading(true);
    try {
      const response = await api.post('/auth/profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const fullUrl = `${BACKEND_URL}${response.data.url}`;
      setProfileImg(fullUrl);
      localStorage.setItem('userAvatar', fullUrl);
      alert("¡Foto de perfil actualizada! ✨");
    } catch (err) {
      alert("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  // --- FUNCIONES DE PROYECTOS (CRUD) ---
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este proyecto?")) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  const handleEdit = async (project) => {
    const updatedName = window.prompt("Nuevo nombre:", project.name);
    const updatedDesc = window.prompt("Nueva descripción:", project.description);
    if (updatedName !== null) {
      try {
        await api.put(`/projects/${project.id}`, {
          name: updatedName || project.name,
          description: updatedDesc || project.description
        });
        fetchProjects();
      } catch (error) {
        alert("Error al actualizar");
      }
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newName) return alert("El nombre es obligatorio");
    try {
      await api.post('/projects', { name: newName, description: newDesc || 'Sin descripción' });
      setNewName('');
      setNewDesc('');
      fetchProjects(); 
    } catch (error) {
      alert("Error al crear el proyecto.");
    }
  };

  // Filtrado de búsqueda
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="dashboard-container">Cargando...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-profile-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="avatar-container">
            <img 
              src={profileImg || 'https://via.placeholder.com/150'} 
              alt="Perfil" 
              className="avatar-img"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
            />
            <div className="profile-upload-overlay">
              <span>{uploading ? "..." : "Edit"}</span>
              <input type="file" onChange={handleProfileUpload} accept="image/*" />
            </div>
          </div>
          <div>
            <h1>TaskFlow</h1>
            <p>Panel de Control</p>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          Cerrar Sesión 🚪
        </button>
      </header>

      <section className="create-project-card">
        <h2>Crear Nuevo Proyecto</h2>
        <form onSubmit={handleCreateProject} className="project-form">
          <input 
            type="text" 
            placeholder="Nombre" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Descripción" 
            value={newDesc} 
            onChange={(e) => setNewDesc(e.target.value)} 
          />
          <button type="submit" className="btn-add">Añadir</button>
        </form>
      </section>

      <section>
        <div className="list-header" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center'}}>
          <h2>Mis Proyectos ({filteredProjects.length})</h2>
          <input
            type="text"
            placeholder="🔍 Buscar proyecto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{padding: '8px 15px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none'}}
          />
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-item">
              <div className="project-content">
                <div className="project-header-card">
                  <h3 className="project-title">{project.name}</h3>
                  <div className="project-actions">
                    <button onClick={() => handleEdit(project)} className="btn-icon edit">✏️</button>
                    <button onClick={() => handleDelete(project.id)} className="btn-icon delete">🗑️</button>
                  </div>
                </div>
                <p className="project-desc">{project.description}</p>
              </div>
              <div className="project-footer">
                 <span className="project-id">ID: #{project.id}</span>
                 <span className="status-badge status-active">{project.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;