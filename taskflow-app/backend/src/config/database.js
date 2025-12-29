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

// Si existe la variable en Render, la usa. Si no, usa local.
const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Esto es obligatorio para Render
        }
      },
      logging: false
    })
  : new Sequelize('taskflow', 'postgres', 'password123', {
      host: 'localhost',
      dialect: 'postgres'
    });

module.exports = sequelize;