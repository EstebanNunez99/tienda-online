// client/src/components/ProductList.jsx (VERSIÓN FINAL Y CORREGIDA)
import React, { useState, useEffect } from 'react';
// ¡Asegúrate de que Link está en las importaciones!
import { Link } from 'react-router-dom'; 

// **IMPORTANTE:** Usa la URL de tu servicio Render
const RENDER_API_URL = 'https://tienda-online-api-1vv9.onrender.com';

// Eliminamos ProductCard, su lógica va dentro del map.

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${RENDER_API_URL}/api/productos`); 
        
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
        // **********************************************
        // 1. Usamos Link para envolver toda la tarjeta
        // 2. Apuntamos a la ruta /producto/ seguido del ID
        // **********************************************
        <Link 
          key={product._id} 
          to={`/producto/${product._id}`} 
          // Estilos para que el link no tenga subrayado y mantenga el diseño de tarjeta
          style={{ textDecoration: 'none', color: 'inherit' }} 
        >
          {/* El contenido de la tarjeta va aquí */}
          <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '15px', cursor: 'pointer' }}>
            <img 
                src={product.imagen_url} 
                alt={product.nombre} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
            />
            <h3>{product.nombre}</h3>
            <p>Precio: ${product.precio.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            
            {/* Este botón ya no necesita ser un botón real para Añadir al Carrito, 
                ya que el clic en la tarjeta navega. Lo puedes dejar o quitar, 
                pero para fines de navegación, el Link es lo que importa. */}
            <div style={{ backgroundColor: 'blue', color: 'white', padding: '10px', textAlign: 'center' }}>
              Ver Detalle
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;