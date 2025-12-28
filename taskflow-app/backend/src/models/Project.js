const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, defaultValue: 'active' },
  userId: { type: DataTypes.INTEGER, allowNull: false } // <--- ¡Esto debe existir!
});

module.exports = Project;