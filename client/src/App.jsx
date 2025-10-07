import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// Importaciones de Pantallas
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen'; 
import CartScreen from './screens/CartScreen'; 
import AdminScreen from './screens/AdminScreen'; 
// Importaciones de Componentes
import ProductForm from './components/ProductForm';
// Hook useCart (importación default, SIN LLAVES)
import useCart from './context/useCart'; 

// Estilos básicos para el Header
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #eee',
  marginBottom: '20px'
};

const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    marginRight: '20px',
    fontWeight: 'bold'
};

function App() {
  // Usamos el hook useCart para obtener la cantidad total de ítems
  const { cartItems } = useCart();
  // Calcula la suma de las cantidades (qty) de todos los items en el carrito
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div style={{ padding: '20px' }}>
      <header style={headerStyle}>
        {/* Enlace al Home */}
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
          <h1 style={{ margin: 0 }}>Mi Tienda MERN Online</h1>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center' }}>
            
            {/* Link al Panel de Administración */}
            <Link to="/admin" style={navLinkStyle}>
                ⚙️ Admin
            </Link>

            {/* Link al Carrito con Contador */}
            <Link to="/carrito" style={navLinkStyle}>
                🛒 Carrito ({totalItems})
            </Link>
        </nav>
      </header>

      {/* Contenido principal de la aplicación */}
      <Routes> 
        {/* Rutas Públicas */}
        <Route path="/" element={<HomeScreen />} /> 
        <Route path="/producto/:id" element={<ProductDetailScreen />} /> 
        <Route path="/carrito" element={<CartScreen />} /> 
        
        {/* Rutas de Administración (CRUD) */}
        <Route path="/admin" element={<AdminScreen />} /> 
        <Route path="/admin/crear" element={<ProductForm isEdit={false} />} /> 
        <Route path="/admin/editar/:id" element={<ProductForm isEdit={true} />} /> 
      </Routes>
    </div>
  );
}

export default App;
