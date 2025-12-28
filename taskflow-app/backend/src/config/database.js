const { Sequelize } = require('sequelize');

// DEFINIMOS LA URL DIRECTAMENTE (Hardcoded)
// Nota: Usa tus credenciales reales de Postgres aquí
const TEMP_DATABASE_URL = "postgresql://postgres:password123@localhost:5432/taskflow";

console.log("DEBUG: Usando URL manual ->", TEMP_DATABASE_URL);

const sequelize = new Sequelize(TEMP_DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;