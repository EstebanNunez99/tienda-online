// server/controllers/productController.js (AGREGAMOS createProduct)
import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Obtener todos los productos (Ya existente)
// @route   GET /api/productos
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Obtener producto por ID (¡NUEVA FUNCIÓN!)
// @route   GET /api/productos/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // Buscamos el producto usando el ID que viene en la URL
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product); // Devolvemos el producto
  } else {
    // Si no lo encuentra, devolvemos un error 404
    res.status(404); 
    throw new Error('Producto no encontrado');
  }
});

// @desc    Crear un nuevo producto (¡NUEVA FUNCIÓN!)
// @route   POST /api/productos
// @access  Public (Por ahora, lo haremos público para probar)
const createProduct = asyncHandler(async (req, res) => {
  // Extraemos los datos del cuerpo de la solicitud (req.body)
  const { nombre, descripcion, imagen_url, precio, stock } = req.body;

  // Creamos la instancia del producto usando el modelo de Mongoose
  const product = new Product({
    nombre, 
    descripcion, 
    imagen_url, 
    precio, 
    stock,
    // Aquí puedes añadir más campos si los necesitas
  });

  // Guardamos en la base de datos
  const createdProduct = await product.save();

  // Devolvemos el producto creado y el código 201 (Creado)
  res.status(201).json(createdProduct);
});

// Exportamos ambas funciones
export { getProducts, getProductById, createProduct };