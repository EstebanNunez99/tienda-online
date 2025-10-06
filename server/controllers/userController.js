// server/controllers/userController.js
import asyncHandler from 'express-async-handler';
// CORRECCIÓN 1: Asegura la extensión .js para el módulo local
import generateToken from '../utils/generateToken.js'; 
// CORRECCIÓN 2: Asegura la extensión .js para el modelo de Mongoose
import User from '../models/User.js'; 
// @desc    Autenticar usuario y obtener token (Login)
// @route   POST /api/usuarios/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Verifica si el usuario existe Y si la contraseña coincide (usando el método creado en el modelo)
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      esAdmin: user.esAdmin,
      token: generateToken(user._id), // ¡Genera el token de sesión!
    });
  } else {
    res.status(401); // 401: No autorizado
    throw new Error('Email o contraseña inválidos');
  }
});

// @desc    Registrar un nuevo usuario
// @route   POST /api/usuarios
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { nombre, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // 400: Mala solicitud
    throw new Error('El usuario ya existe');
  }

  // Crea el usuario. La encriptación se hace automáticamente por el middleware pre-save
  const user = await User.create({
    nombre,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      esAdmin: user.esAdmin,
      token: generateToken(user._id), // Genera el token inmediatamente
    });
  } else {
    res.status(400);
    throw new Error('Datos de usuario inválidos');
  }
});

export { authUser, registerUser };