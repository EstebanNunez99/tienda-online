// server/routes/productRoutes.js
import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

// Define la ruta base: GET a /api/productos llama a la función getProducts
router.route('/').get(getProducts);

export default router;