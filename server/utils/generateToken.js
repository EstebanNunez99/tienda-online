// server/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  // Crea el token con el ID del usuario como payload
  // y lo firma con tu secreto de Render (JWT_SECRET)
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token expira después de 30 días
  });
};

export default generateToken;