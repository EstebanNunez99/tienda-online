import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Componente para mostrar la información básica de cada producto
const ProductCard = ({ product }) => {
    return (
        <div 
            style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '15px', 
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <img 
                src={product.imagen_url} 
                alt={product.nombre} 
                style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '4px',
                    marginBottom: '10px'
                }} 
            />
            <h3 style={{ fontSize: '1.2em', margin: '10px 0' }}>{product.nombre}</h3>
            <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '1.4em' }}>${product.precio.toFixed(2)}</p>
            
            <Link 
                to={`/producto/${product._id}`} 
                style={{ 
                    display: 'block', 
                    padding: '10px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '4px',
                    marginTop: '10px'
                }}
            >
                Ver Detalle
            </Link>
        </div>
    );
};


const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener los productos del Backend (Express/MongoDB)
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // **MODIFICACIÓN CLAVE:** Usamos la variable de entorno
            const apiUrl = `${import.meta.env.VITE_API_URL}/productos`; 
            const response = await fetch(apiUrl); 
            
            if (!response.ok) {
                // Si la respuesta no es 200 (OK), lanzamos un error
                throw new Error('Fallo al cargar los productos. Código de estado: ' + response.status);
            }
            
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error('Error al obtener productos:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Efecto que se ejecuta una sola vez al cargar el componente
    useEffect(() => {
        fetchProducts();
    }, []); 

    if (loading) return <h2 style={{ padding: '20px', textAlign: 'center' }}>Cargando Productos...</h2>;
    
    // Si hay un error, lo mostramos
    if (error) return <h2 style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error al conectar con la API: {error}</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>Nuestros Productos Destacados</h2>
            
            {/* Grid de Productos */}
            <div 
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '20px' 
                }}
            >
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2em' }}>
                        No hay productos disponibles. ¡Ve a Admin para crear algunos!
                    </p>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;
