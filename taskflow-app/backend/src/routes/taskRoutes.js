const upload = require('../middleware/upload');

// Ejemplo: subir un adjunto a una tarea
router.post('/:id/upload', upload.single('file'), (req, res) => {
  res.json({ message: "Archivo subido", file: req.file.filename });
});

router.post('/:taskId/attachments', authenticateToken, upload.single('file'), optimizeImage, async (req, res) => {
  // Aquí guardarías la referencia en una tabla "Attachments" o en un array de la Tarea
  res.json({ message: "Adjunto guardado", file: req.file.optimizedName });
});