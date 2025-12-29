// const { Sequelize } = require('sequelize');

// DEFINIMOS LA URL DIRECTAMENTE (Hardcoded)
// Nota: Usa tus credenciales reales de Postgres aquí
// const TEMP_DATABASE_URL = "postgresql://postgres:password123@localhost:5432/taskflow";

// console.log("DEBUG: Usando URL manual ->", TEMP_DATABASE_URL);

// const sequelize = new Sequelize(TEMP_DATABASE_URL, {
//   dialect: 'postgres',
//   logging: false
// });

// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'taskflow', 
//   process.env.DB_USER || 'postgres', 
//   process.env.DB_PASSWORD || 'password123', // Reemplaza por tu contraseña real
//   {
//     host: process.env.DB_HOST || 'db', 
//     dialect: 'postgres',
//     logging: false // Para que la consola no se llene de texto SQL
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

// Esto imprimirá en la consola de Render si la conexión fue exitosa
sequelize.authenticate()
  .then(() => console.log('🚀 ¡Conexión exitosa a la base de datos!'))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = sequelize;