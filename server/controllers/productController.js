// server/controllers/productController.js
import asyncHandler from 'express-async-handler'; // Usaremos una librería simple para manejar errores
import Product from '../models/Product.js';

// NOTA: Instala la librería para evitar usar muchos try/catch en cada controlador:
// npm install express-async-handler

// @desc    Obtener todos los productos
// @route   GET /api/productos
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // Encuentra todos los documentos en la colección 'productos'
  const products = await Product.find({});
  
  // Devuelve los productos como respuesta JSON
  res.json(products);
});

// Puedes añadir más funciones aquí más tarde (ej: getProductById, createProduct, etc.)

export { getProducts };