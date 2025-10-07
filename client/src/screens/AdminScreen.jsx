import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const AdminScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Definimos la URL base de la API usando la variable de entorno
    const API_URL_BASE = import.meta.env.VITE_API_URL;

    // 1. Función para obtener todos los productos (Encapsulada con useCallback para ESLint)
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL_BASE}/productos`); 
            
            if (!response.ok) {
                throw new Error('No se pudieron cargar los productos');
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [API_URL_BASE]); // Dependencia: API_URL_BASE para mantener la limpieza de la función

    // Se ejecuta al montar el componente (y cuando fetchProducts cambia, aunque no debería)
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); // 1. Advertencia corregida: fetchProducts como dependencia

    // Función de ELIMINAR
    const handleDelete = async (id, nombre) => {
        // NOTE: Usamos la consola en lugar de window.confirm/alert
        if (window.confirm(`¿Estás seguro de ELIMINAR el producto: ${nombre}?`)) {
            try {
                // Ya no necesitamos el if(true) innecesario
                const response = await fetch(`${API_URL_BASE}/productos/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Fallo la eliminación del producto');
                }

                // Si la eliminación es exitosa, volvemos a cargar la lista
                fetchProducts();
                console.log(`Producto "${nombre}" eliminado con éxito.`);

            } catch (err) {
                console.error(`Error al eliminar: ${err.message}`);
            }
        }
    };

    if (loading) return <h2 style={{ padding: '20px' }}>Cargando Productos...</h2>;
    if (error) return <h2 style={{ padding: '20px', color: 'red' }}>Error: {error}</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                Panel de Administración
            </h1>
            
            {/* Botón para Crear Nuevo Producto */}
            <Link 
                to="/admin/crear" 
                style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '5px', 
                    display: 'inline-block',
                    marginBottom: '20px'
                }}
            >
                + Crear Nuevo Producto
            </Link>

            {/* Listado de Productos */}
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Precio</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Stock</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd', fontSize: '0.8em' }}>{product._id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.nombre}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>${product.precio.toFixed(2)}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.stock}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                {/* Botón Editar */}
                                <Link 
                                    to={`/admin/editar/${product._id}`} 
                                    style={{ color: '#28a745', marginRight: '10px', textDecoration: 'none' }}
                                >
                                    Editar
                                </Link>
                                {/* Botón Eliminar */}
                                <button 
                                    onClick={() => handleDelete(product._id, product.nombre)}
                                    style={{ 
                                        color: 'white', 
                                        backgroundColor: '#dc3545', 
                                        border: 'none', 
                                        padding: '5px 10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminScreen;
