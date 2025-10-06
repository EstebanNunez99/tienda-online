// client/src/App.jsx (ACTUALIZADO)
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm'; // Importa el formulario

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Mi Tienda MERN Online</h1>
      <ProductForm /> 

      <h2>Catálogo de Productos</h2>
      <ProductList />
    </div>
  );
}

export default App;