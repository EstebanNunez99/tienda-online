// client/src/components/ProductForm.jsx (COMPLETO)
import React, { useState } from 'react';

// Asegúrate de usar tu URL real de Render aquí, con HTTPS
const RENDER_API_URL = 'https://tienda-online-api-1vv9.onrender.com'; 

const ProductForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen_url: '',
    precio: 0,
    stock: 0,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Convertimos precio y stock a números, ya que la API lo espera como `numeric` e `integer`
    const val = type === 'number' ? parseFloat(value) : value;

    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Enviando...');
    setError(false);

    try {
      const response = await fetch(`${RENDER_API_URL}/api/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Asegúrate de enviar un objeto con los 5 campos que espera tu API
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setMessage(`Producto "${data.nombre}" creado con éxito! ID: ${data._id}`);
      setError(false);
      
      // Limpiamos el formulario después de la creación
      setFormData({ nombre: '', descripcion: '', imagen_url: '', precio: 0, stock: 0 });

    } catch (err) {
      setError(true);
      setMessage(`Fallo al crear producto: ${err.message}.`);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px', marginBottom: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Añadir Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Input: Nombre */}
        <label style={{ display: 'block', margin: '10px 0 5px' }}>Nombre:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

        {/* Input: Descripción */}
        <label style={{ display: 'block', margin: '10px 0 5px' }}>Descripción:</label>
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

        {/* Input: Precio y Stock (en la misma fila) */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', margin: '10px 0 5px' }}>Precio ($):</label>
            <input type="number" name="precio" value={formData.precio} onChange={handleChange} required min="0" step="0.01" style={{ padding: '8px', marginBottom: '10px' }} />
          </div>
          <div>
            <label style={{ display: 'block', margin: '10px 0 5px' }}>Stock:</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" style={{ padding: '8px', marginBottom: '10px' }} />
          </div>
        </div>

        {/* Input: URL de Imagen */}
        <label style={{ display: 'block', margin: '10px 0 5px' }}>URL de Imagen:</label>
        <input type="text" name="imagen_url" value={formData.imagen_url} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
          Crear Producto
        </button>
      </form>

      {/* Muestra el mensaje de estado */}
      {message && <p style={{ color: error ? 'red' : 'green', marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
};

export default ProductForm;