// client/src/components/ProductForm.jsx (ACTUALIZADO para usar VITE_API_URL)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Aceptamos la prop isEdit (true/false) para determinar el modo
const ProductForm = ({ isEdit = false }) => {
    // Usamos useNavigate para la redirección después de guardar
    const navigate = useNavigate(); 
    // Usamos useParams para obtener el ID si estamos en modo edición
    const { id } = useParams(); 
    
    // Definimos la URL base de la API usando la variable de entorno
    const API_URL_BASE = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        imagen_url: '',
        precio: '',
        stock: '',
    });
    const [loading, setLoading] = useState(false);

    // 1. Efecto para cargar datos en modo Edición
    useEffect(() => {
        if (isEdit && id) {
            const fetchProduct = async () => {
                setLoading(true);
                try {
                    // **CORRECCIÓN GET (Edición):** Usamos la variable de entorno
                    const response = await fetch(`${API_URL_BASE}/productos/${id}`);
                    
                    if (!response.ok) {
                        throw new Error('Producto no encontrado');
                    }
                    const data = await response.json();
                    // Llenar el formulario con los datos existentes
                    setFormData({
                        nombre: data.nombre,
                        descripcion: data.descripcion,
                        imagen_url: data.imagen_url,
                        // Aseguramos que precio y stock sean strings para los inputs
                        precio: data.precio.toString(), 
                        stock: data.stock.toString(), 
                    });
                } catch (error) {
                    console.error('Error al cargar el producto para edición: ' + error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        } else {
             // Si no es edición, limpiar el formulario (en la ruta /admin/crear)
             setFormData({
                 nombre: '',
                 descripcion: '',
                 imagen_url: '',
                 precio: '',
                 stock: '',
             });
        }
    }, [isEdit, id]);


    // Función genérica para manejar cambios en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 2. Función para manejar el envío (CREATE o UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Determinamos el método y la URL
        const method = isEdit ? 'PUT' : 'POST';
        
        // **CORRECCIÓN POST/PUT:** Usamos la variable de entorno
        const url = isEdit ? `${API_URL_BASE}/productos/${id}` : `${API_URL_BASE}/productos`;

        // Convertimos precio y stock a números antes de enviar
        const dataToSend = {
            ...formData,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock),
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                // Si el servidor devuelve un error, lo parseamos
                const errorData = await response.json();
                throw new Error(errorData.message || `Fallo al ${isEdit ? 'actualizar' : 'crear'} el producto`);
            }

            // Éxito:
            console.log(`Producto ${isEdit ? 'actualizado' : 'creado'} con éxito!`);
            
            // Redirigir al panel de administración 
            navigate('/admin');

        } catch (error) {
            console.error(`Error en el formulario: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) return <h2>Cargando datos del producto...</h2>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h2>{isEdit ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="imagen_url"
                    placeholder="URL de la Imagen"
                    value={formData.imagen_url}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={formData.precio}
                    onChange={handleChange}
                    step="0.01"
                    required
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : (isEdit ? 'Guardar Cambios' : 'Crear Producto')}
                </button>
                {/* En modo edición, mostramos un botón para volver */}
                {isEdit && <button type="button" onClick={() => navigate('/admin')} style={{ marginTop: '5px', backgroundColor: '#6c757d' }}>Cancelar</button>}
            </form>
        </div>
    );
};

export default ProductForm;
