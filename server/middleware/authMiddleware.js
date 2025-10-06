// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Verificar que el token esté presente en los headers de la petición
  // El token generalmente viene como: "Authorization: Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extraer el token (quitamos el "Bearer " que son 7 caracteres)
      token = req.headers.authorization.split(' ')[1];

      // 3. Verificar el token usando el JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Buscar el usuario por ID y adjuntarlo al objeto de la petición (req)
      // .select('-password') excluye la contraseña de la respuesta
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Si todo es exitoso, pasa al siguiente controlador de la ruta
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('No autorizado, token fallido');
    }
  }

  // Si no hay token en los headers
  if (!token) {
    res.status(401);
    throw new Error('No autorizado, no hay token');
  }
});
const admin = (req, res, next) => {
  // Verificamos si el usuario ya fue cargado por el middleware 'protect'
  if (req.user && req.user.esAdmin) {
    next(); // Si es admin, puede pasar
  } else {
    res.status(401); // 401 No autorizado
    throw new Error('No autorizado como administrador');
  }
};

export { protect, admin }; // Asegúrate de exportar ambos