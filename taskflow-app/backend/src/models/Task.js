const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { 
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'), 
    defaultValue: 'pending' 
  },
  dueDate: { type: DataTypes.DATE },
  attachment: { type: DataTypes.STRING } // Para guardar la ruta del archivo
});

module.exports = Task;