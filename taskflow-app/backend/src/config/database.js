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

// Validamos que la URL exista y sea un string
const dbUrl = process.env.DATABASE_URL;

const sequelize = (dbUrl && process.env.NODE_ENV === 'production')
  ? new Sequelize(dbUrl, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    })
  : new Sequelize(
      process.env.DB_NAME || 'taskflow',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || 'password123',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false
      }
    );

module.exports = sequelize;