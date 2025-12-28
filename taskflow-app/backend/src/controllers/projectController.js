const { Project } = require('../models'); // Asegúrate de que esta línea esté solo una vez

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ where: { userId: req.user.id } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Verificamos que el middleware de auth nos dio el ID del usuario
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const project = await Project.create({
      name,
      description,
      userId: req.user.id // Vinculamos el proyecto al usuario logueado
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Error al guardar en DB:", error);
    res.status(400).json({ error: error.message });
  }
};

// ELIMINAR PROYECTO
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    // Solo permitimos borrar si el proyecto pertenece al usuario logueado
    const deleted = await Project.destroy({
      where: { id: id, userId: req.user.id }
    });

    if (deleted) {
      return res.status(204).send("Proyecto eliminado");
    }
    throw new Error("Proyecto no encontrado o no autorizado");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ACTUALIZAR PROYECTO
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const [updated] = await Project.update(
      { name, description },
      { where: { id: id, userId: req.user.id } }
    );

    if (updated) {
      const updatedProject = await Project.findByPk(id);
      return res.status(200).json(updatedProject);
    }
    throw new Error("Proyecto no encontrado");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};