import express from 'express';
import { authUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

// POST /api/users (Registro)
router.route('/').post(registerUser);

// POST /api/users/login (Login)
router.post('/login', authUser);

export default router;
