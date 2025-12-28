const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');

// 1. Relación Usuario - Proyecto
User.hasMany(Project, { foreignKey: 'userId', onDelete: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'userId' });

// 2. Relación Proyecto - Tarea
Project.hasMany(Task, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = {
  User,
  Project,
  Task
};