const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false, 
    validate: { isEmail: true } 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  role: { 
    type: DataTypes.ENUM('admin', 'user'), 
    defaultValue: 'user' 
  },
  refreshToken: { 
    type: DataTypes.TEXT 
  }
}, {
  hooks: {
    // 🔐 Encriptamos la contraseña automáticamente antes de crear el usuario
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

module.exports = User;