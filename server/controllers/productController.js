import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Obtener todos los productos (READ ALL)
// @route   GET /api/productos
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Obtener producto por ID (READ ONE)
// @route   GET /api/productos/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});

// @desc    Crear un nuevo producto (CREATE)
// @route   POST /api/productos
// @access  Private/Admin (temporalmente Public para prueba)
const createProduct = asyncHandler(async (req, res) => {
    const { nombre, descripcion, imagen_url, precio, stock } = req.body;

    const product = new Product({
        nombre, 
        descripcion, 
        imagen_url, 
        precio, 
        stock,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
});

// @desc    Actualizar un producto (UPDATE)
// @route   PUT /api/productos/:id
// @access  Private/Admin (temporalmente Public para prueba)
const updateProduct = asyncHandler(async (req, res) => {
    const { nombre, descripcion, imagen_url, precio, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        // Actualizamos los campos
        product.nombre = nombre || product.nombre;
        product.descripcion = descripcion || product.descripcion;
        product.imagen_url = imagen_url || product.imagen_url;
        // Comprobamos que el valor no sea null o undefined antes de actualizar
        product.precio = precio !== undefined ? precio : product.precio;
        product.stock = stock !== undefined ? stock : product.stock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});

// @desc    Eliminar un producto (DELETE)
// @route   DELETE /api/productos/:id
// @access  Private/Admin (temporalmente Public para prueba)
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        // Usamos deleteOne para eliminar el documento
        await product.deleteOne(); 
        res.json({ message: 'Producto eliminado con éxito' });
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});

// Exportamos todas las funciones CRUD
export { 
    getProducts, 
    getProductById, 
    createProduct,
    updateProduct, // <-- Nueva exportación
    deleteProduct  // <-- Nueva exportación
};
