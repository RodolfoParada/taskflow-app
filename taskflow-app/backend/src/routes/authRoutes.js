const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 1. IMPORTACIONES ÚNICAS (Elimina las duplicadas)
const { upload, optimizeImage } = require('../middleware/upload');
const { authenticateToken } = require('../middleware/authMiddleware'); // Agregamos esta
const { User } = require('../models'); // Importamos el modelo User para guardar la foto

// --- RUTAS ---
router.post('/register', authController.register);
router.post('/login', authController.login);

// --- RUTA DE PERFIL ---
router.post('/profile-picture', authenticateToken, upload.single('avatar'), optimizeImage, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    // Guardamos la ruta de la imagen optimizada en la base de datos
    user.avatarUrl = `/uploads/${req.file.optimizedName}`;
    await user.save();
    
    res.json({ 
      message: "Foto de perfil actualizada", 
      url: user.avatarUrl 
    });
  } catch (error) {
    console.error("Error en perfil:", error);
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
});

module.exports = router;