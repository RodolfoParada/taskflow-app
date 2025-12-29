const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./src/config/database'); 
const { User } = require('./src/models'); 
const bcrypt = require('bcryptjs');
const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

const app = express();

// 1. Configuraciones de seguridad y límites (Siempre al principio)
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 2. Rutas de la API (Deben ir ANTES de servir el frontend)
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. Servir archivos estáticos del Frontend (Solo en producción)
// Esto asume que el build está en la raíz de la carpeta de ejecución
app.use(express.static(path.join(__dirname, 'build'))); 

// 4. El "comodín" para React (DEBE ser la última ruta de todas)
app.get('*', (req, res) => {
  // Verificamos si existe el archivo antes de enviarlo para evitar errores en el log
  const indexPath = path.join(__dirname, 'build', 'index.html');
  res.sendFile(indexPath);
});

// --- FUNCIÓN SEED ---
const seedUser = async () => {
  try {
    await User.destroy({ where: { email: 'admin@taskflow.com' } });
    await User.create({
      nombre: 'admin',
      email: 'admin@taskflow.com',
      password: 'password123'
    });
    console.log('✅ Usuario administrador configurado');
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
  }
};

// --- ARRANQUE ---
const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  seedUser(); 
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('❌ Error de conexión:', err);
});