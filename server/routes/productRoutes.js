import express from 'express';

// Importamos la nueva función
import { getProducts, createProduct } from '../controllers/productController.js'; 
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router();

// Define: GET (obtener) y POST (crear) a /api/productos
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); 

export default router;