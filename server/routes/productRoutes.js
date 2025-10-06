// server/routes/productRoutes.js (AGREGAMOS el POST)
import express from 'express';
// Importamos la nueva función
import { getProducts, createProduct } from '../controllers/productController.js'; 

const router = express.Router();

// Define: GET (obtener) y POST (crear) a /api/productos
router.route('/')
  .get(getProducts)
  .post(createProduct); // Esta es la nueva línea

export default router;