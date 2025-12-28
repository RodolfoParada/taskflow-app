const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: user.id }, 
    process.env.JWT_REFRESH_SECRET || 'refresh_secret', 
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const tokens = generateTokens(user);
    await user.update({ refreshToken: tokens.refreshToken });
    res.status(201).json({ user: { id: user.id, nombre: user.nombre, role: user.role }, ...tokens });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // IMPORTANTE: bcrypt.compare recibe (clave_plana, clave_hasheada_de_bd)
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id },
       process.env.JWT_SECRET || 'clave_secreta', 
       { expiresIn: '1d' });
    res.json({ token, user: {
       id: user.id,
        email: user.email 
      } 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};