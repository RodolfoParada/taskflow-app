const express = require('express');
const cors = require('cors');
// 1. IMPORTA SEQUELIZE DESDE TU CONFIGURACIÓN
const sequelize = require('./src/config/database'); 
// 2. IMPORTA TUS MODELOS (Necesario para que el seed funcione)
const { User } = require('./src/models'); 
const bcrypt = require('bcryptjs');
const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Tus rutas
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Aumenta el límite antes de las rutas
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// --- FUNCIÓN SEED (La que creamos antes) ---
const seedUser = async () => {
  try {
    // Borramos para limpiar intentos fallidos anteriores
    await User.destroy({ where: { email: 'admin@taskflow.com' } });

    // NO USAMOS bcrypt.hash aquí, dejamos que el MODELO lo haga
    await User.create({
      nombre: 'admin',
      email: 'admin@taskflow.com',
      password: 'password123' // El modelo la encriptará automáticamente
    });
    
    console.log('✅ Usuario administrador RE-CREADO correctamente: admin@taskflow.com / password123');
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
  }
};

// --- SINCRONIZACIÓN Y ARRANQUE ---
// Aquí usamos la variable 'sequelize' que importamos arriba
sequelize.sync().then(() => {
  seedUser(); 
  app.listen(3001, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3001');
  });
}).catch(err => {
  console.error('❌ No se pudo conectar a la base de datos:', err);
});