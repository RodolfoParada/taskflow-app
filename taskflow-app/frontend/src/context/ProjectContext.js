import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error("Error cargando proyectos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, fetchProjects, loading }}>
      {children}
    </ProjectContext.Provider>
  );
};


export const useProjects = () => useContext(ProjectContext);