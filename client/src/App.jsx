// client/src/App.jsx (VERSIÓN FINAL Y LIMPIA)

// 1. IMPORTACIÓN: Eliminamos 'BrowserRouter as Router'
// Solo importamos Routes y Route
import { Routes, Route } from 'react-router-dom';

import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm'; 
// NOTA: Cambié el nombre del archivo a 'ProductDetailScreen' por convención
import ProductDetailScreen from './screens/productDetailScreen'; 

// Componente simple para la página de inicio
const HomeScreen = () => (
  <>
    <ProductForm /> 
    <hr style={{ margin: '30px 0' }} />
    <h2>Catálogo de Productos</h2>
    <ProductList />
  </>
);

function App() {
  return (
    // 2. ELIMINACIÓN: Ya NO HAY <Router> envolviendo aquí
    <div style={{ padding: '20px' }}>
      <h1>Mi Tienda MERN Online</h1>
      <Routes> 
        <Route path="/" element={<HomeScreen />} /> 
        <Route path="/producto/:id" element={<ProductDetailScreen />} /> 
      </Routes>
    </div>
  );
}

export default App;