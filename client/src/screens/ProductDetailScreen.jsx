import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Definimos la URL base de la API
    const API_URL_BASE = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                // **CORRECCIÓN GET:** Usamos la variable de entorno
                const response = await fetch(`${API_URL_BASE}/productos/${id}`);
                
                if (!response.ok) {
                    // Si el producto no se encuentra (404), lanzamos un error
                    if (response.status === 404) {
                        throw new Error('Producto no encontrado (404)');
                    }
                    throw new Error('Error al cargar el producto.');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, API_URL_BASE]); // Incluimos API_URL_BASE como dependencia para ESLint

    if (loading) return <div style={{ padding: '20px' }}>Cargando detalles del producto...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
    if (!product) return <div style={{ padding: '20px' }}>No se pudo cargar la información del producto.</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
            
            {/* Imagen del Producto */}
            <div style={{ flex: '1', minWidth: '300px' }}>
                <img 
                    src={product.imagen_url || 'https://placehold.co/400x300/e9ecef/212529?text=Sin+Imagen'} 
                    alt={product.nombre} 
                    style={{ width: '100%', height: 'auto', borderRadius: '10px', objectFit: 'cover' }}
                />
            </div>

            {/* Detalles */}
            <div style={{ flex: '2' }}>
                <h1 style={{ marginBottom: '10px', fontSize: '2em' }}>{product.nombre}</h1>
                <p style={{ color: '#007bff', fontSize: '1.8em', fontWeight: 'bold', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
                    ${product.precio.toFixed(2)}
                </p>
                <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
                    {product.descripcion}
                </p>
                <p style={{ marginTop: '15px', fontWeight: 'bold', color: product.stock > 0 ? '#28a745' : '#dc3545' }}>
                    Stock: {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                </p>

                {/* Botón de Comprar (Simulado) */}
                <button 
                    onClick={() => console.log(`Añadiendo ${product.nombre} al carrito`)}
                    disabled={product.stock === 0}
                    style={{ 
                        marginTop: '30px', 
                        padding: '12px 25px', 
                        fontSize: '1em', 
                        backgroundColor: product.stock > 0 ? '#007bff' : '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: product.stock > 0 ? 'pointer' : 'not-allowed'
                    }}
                >
                    {product.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
                </button>

                <button 
                    onClick={() => navigate('/')}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '0.9em',
                        backgroundColor: 'transparent',
                        color: '#6c757d',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginLeft: '10px'
                    }}
                >
                    Volver al Catálogo
                </button>
            </div>
        </div>
    );
};

export default ProductDetailScreen;
