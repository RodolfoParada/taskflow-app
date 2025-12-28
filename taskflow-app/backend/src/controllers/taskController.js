const { Project, Task } = require('../models');

exports.getProjects = async (req, res) => {
  try {
    // req.user.id viene del middleware de autenticación que protege la ruta
    const projects = await Project.findAll({ 
      where: { userId: req.user.id },
      include: [Task] // Incluimos sus tareas automáticamente
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};