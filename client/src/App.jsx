import { Routes, Route } from 'react-router-dom';

import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm'; 
import ProductDetailScreen from './screens/productDetailScreen.jsx'; 

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
    // Ya NO hay <Router> o <BrowserRouter> aquí.
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
