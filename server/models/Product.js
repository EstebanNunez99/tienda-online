// server/models/Product.js
import mongoose from 'mongoose';

// Definimos el esquema del producto (las "columnas" o campos)
const productSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    imagen_url: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    // Añadimos la fecha de creación automáticamente
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;