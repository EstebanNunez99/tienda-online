import express from 'express';
import { 
    getProducts, 
    getProductById, 
    createProduct,
    updateProduct, // <-- Nueva importación
    deleteProduct  // <-- Nueva importación
} from '../controllers/productController.js'; 
// import { protect, admin } from '../middleware/authMiddleware.js' // Comentado temporalmente

const router = express.Router();

// Rutas a /api/productos
router.route('/')
    .get(getProducts)
    // Por ahora, lo dejamos sin middleware para facilitar la prueba
    // router.route('/').post(protect, admin, createProduct); 
    .post(createProduct); 

// Rutas a /api/productos/:id
router.route('/:id')
    .get(getProductById)
    // Actualización (UPDATE)
    // Lo dejamos sin middleware por ahora
    .put(updateProduct) // <-- Ruta para EDITAR
    // Eliminación (DELETE)
    // Lo dejamos sin middleware por ahora
    .delete(deleteProduct); // <-- Ruta para ELIMINAR

export default router;
