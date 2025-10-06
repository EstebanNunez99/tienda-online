// client/src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';

// Componente simple para mostrar un solo producto
const ProductCard = ({ product }) => (
  <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
    <img src={product.imagen_url} alt={product.nombre} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
    <h3>{product.nombre}</h3>
    <p>Precio: ${product.precio.toFixed(2)}</p>
    <p>Stock: {product.stock}</p>
    <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>
      Añadir al Carrito
    </button>
  </div>
);


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Aquí usamos la ruta relativa, Vite la redirige a http://localhost:5000/api/productos
        const response = await fetch('/api/productos'); 
        
        if (!response.ok) {
          throw new Error('No se pudo cargar la API de productos.');
        }

        const data = await response.json();
        setProducts(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h1>Cargando Productos...</h1>;
  if (error) return <h1>Error al cargar: {error}</h1>;
  if (products.length === 0) return <h1>No hay productos disponibles.</h1>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;