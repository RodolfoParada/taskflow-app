// Task 3: Dashboard con Estado Global y Tiempo Real (8 minutos)
// Implementación de dashboard que integra todos los conceptos de estado y comunicación.

// 📊 Dashboard de Gestión de Proyectos
// Estado global del dashboard:

// DashboardContext.js
const initialState = {
  projects: [],
  currentProject: null,
  tasks: [],
  users: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    assignee: 'all',
    priority: 'all'
  },
  stats: {
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0
  }
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        stats: {
          ...state.stats,
          totalProjects: action.payload.length
        }
      };

    case 'SELECT_PROJECT':
      return { ...state, currentProject: action.payload };

    case 'SET_TASKS':
      const completed = action.payload.filter(t => t.status === 'completed').length;
      return {
        ...state,
        tasks: action.payload,
        stats: {
          ...state.stats,
          totalTasks: action.payload.length,
          completedTasks: completed,
          overdueTasks: action.payload.filter(t =>
            t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
          ).length
        }
      };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    default:
      return state;
  }
}
// Componente de dashboard principal:

function Dashboard() {
  const { state, dispatch } = useDashboard();
  const { user } = useAuth();

  // Cargar datos iniciales
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const [projects, tasks, users] = await Promise.all([
        api.getProjects(),
        api.getTasks(),
        api.getUsers()
      ]);

      dispatch({ type: 'SET_PROJECTS', payload: projects });
      dispatch({ type: 'SET_TASKS', payload: tasks });
      dispatch({ type: 'SET_USERS', payload: users });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  if (state.loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dashboard">
      <DashboardHeader stats={state.stats} />

      <div className="dashboard-grid">
        <ProjectsList
          projects={state.projects}
          onSelectProject={(project) =>
            dispatch({ type: 'SELECT_PROJECT', payload: project })
          }
        />

        <TasksBoard
          tasks={state.tasks}
          filters={state.filters}
          onUpdateFilters={(filters) =>
            dispatch({ type: 'SET_FILTER', payload: filters })
          }
        />

        {user.role === 'admin' && (
          <UsersManagement users={state.users} />
        )}
      </div>
    </div>
  );
}
// Concepto clave: El dashboard integra estado global, comunicación HTTP y gestión de permisos.