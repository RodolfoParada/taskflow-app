const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento temporal
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Middleware para OPTIMIZAR
const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `opt-${Date.now()}-${req.file.originalname.split('.')[0]}.webp`;
  const outputPath = path.join(__dirname, '../../uploads', filename);

  await sharp(req.file.buffer)
    .resize(800) // Redimensionar a max 800px de ancho
    .webp({ quality: 80 }) // Convertir a WebP para ahorrar espacio
    .toFile(outputPath);

  req.file.optimizedName = filename; // Guardamos el nombre final
  next();
};

module.exports = { upload, optimizeImage };