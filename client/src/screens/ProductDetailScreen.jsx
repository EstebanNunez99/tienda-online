// client/src/screens/ProductDetailScreen.jsx
import React, { useState, useEffect } from 'react';
// Hook de react-router-dom para obtener el ID de la URL
import { useParams, Link } from 'react-router-dom'; 

// **IMPORTANTE:** Usa la URL base de tu servicio Render
const RENDER_API_URL = 'https://[TU-SERVICIO-RENDER].onrender.com'; 

const ProductDetailScreen = () => {
  // 1. Obtener el ID del producto de la URL
  const { id } = useParams();
  
  // 2. Estados para manejar la data, carga y errores
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${RENDER_API_URL}/api/productos/${id}`);
        
        // Manejo de error si el servidor devuelve un 404
        if (!response.ok) {
          throw new Error('Producto no encontrado en el servidor.');
        }

        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // El efecto se ejecuta cuando el ID de la URL cambia

  // 3. Renderizado condicional
  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '1.5em' }}>Cargando producto...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', fontSize: '1.2em' }}>Error: {error}</div>;
  }

  // Si no hay producto (ej: ID inválido que no causó 404)
  if (!product) {
    return <div>No se pudo cargar el producto.</div>;
  }

  // 4. Renderizado del detalle del producto
  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', border: '1px solid #ddd' }}>
      
      {/* Botón de regreso */}
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff', marginBottom: '20px', display: 'inline-block' }}>
        ← Volver al Catálogo
      </Link>

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Columna de Imagen */}
        <div style={{ flex: 1 }}>
          <img 
            src={product.imagen_url} 
            alt={product.nombre} 
            style={{ width: '100%', borderRadius: '8px' }} 
          />
        </div>
        
        {/* Columna de Detalles */}
        <div style={{ flex: 1 }}>
          <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>{product.nombre}</h2>
          <p style={{ fontSize: '1.4em', fontWeight: 'bold', color: '#28a745' }}>${product.precio}</p>
          
          <p>Descripción: {product.descripcion}</p>
          
          <p style={{ fontWeight: 'bold', color: product.stock > 0 ? 'green' : 'red' }}>
            Estado: {product.stock > 0 ? `En Stock (${product.stock})` : 'Agotado'}
          </p>

          {/* Aquí irá el botón de Agregar al Carrito en el futuro */}
          <button 
            disabled={product.stock === 0}
            style={{ padding: '10px 20px', backgroundColor: product.stock > 0 ? '#007bff' : '#6c757d', color: 'white', border: 'none', cursor: product.stock > 0 ? 'pointer' : 'not-allowed', marginTop: '15px' }}
          >
            {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;