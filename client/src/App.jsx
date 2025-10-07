// client/src/App.jsx (VERSIÓN CORRECTA)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm'; 
import ProductDetailScreen from './screens/productDetailScreen'; 

// ... (HomeScreen function) ...

function App() {
  return (
    <Router> 
      <div style={{ padding: '20px' }}>
        <h1>Mi Tienda MERN Online</h1>
        <Routes> 
          <Route path="/" element={<HomeScreen />} /> 
          <Route path="/producto/:id" element={<ProductDetailScreen />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;