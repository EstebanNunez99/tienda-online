// server/routes/userRoutes.js
import express from 'express';
import { authUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

// POST a /api/usuarios/login para iniciar sesión
router.post('/login', authUser);

// POST a /api/usuarios para registrar un nuevo usuario
router.route('/').post(registerUser); 

export default router;