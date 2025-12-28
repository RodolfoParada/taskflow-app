const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/upload');

// Ejemplo: subir un adjunto a una tarea
router.post('/:id/upload', upload.single('file'), (req, res) => {
  res.json({ message: "Archivo subido", file: req.file.filename });
});

// Todas estas rutas requieren estar logueado
router.use(authenticateToken);

router.get('/', projectController.getProjects);
router.post('/', projectController.createProject);
// --- ESTAS SON LAS QUE FALTABAN ---
router.put('/:id', projectController.updateProject);    
router.delete('/:id', projectController.deleteProject); 

module.exports = router;