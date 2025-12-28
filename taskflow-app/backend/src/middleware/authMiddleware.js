const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Token faltante" });

  jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta', (err, user) => {
    if (err) return res.status(403).json({ error: "Token no válido" });
    
    // Inyectamos el usuario en la petición para que el controlador lo use
    req.user = user; 
    next();
  });
};

module.exports = { authenticateToken };