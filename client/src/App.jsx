// import React from 'react';
// import { Routes, Route, Link, useNavigate } from 'react-router-dom';
// import { UserProvider, useUser } from './context/UserContext.jsx'; // 👈 Nuevo: Proveedor y Hook de Usuario

// // Importaciones de Pantallas
// import HomeScreen from './screens/HomeScreen';
// import ProductDetailScreen from './screens/ProductDetailScreen'; 
// import CartScreen from './screens/CartScreen'; 
// import AdminScreen from './screens/AdminScreen'; 
// import LoginScreen from './screens/LoginScreen'; // 👈 Nuevo
// import RegisterScreen from './screens/RegisterScreen'; // 👈 Nuevo

// // Importaciones de Componentes
// import ProductForm from './components/ProductForm';

// // --- Estilos Básicos ---
// const headerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '15px 20px',
//     borderBottom: '1px solid #eee',
//     marginBottom: '20px',
//     backgroundColor: '#fff',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
// };

// const navLinkStyle = {
//     textDecoration: 'none',
//     color: '#333',
//     marginRight: '20px',
//     fontWeight: 'bold',
//     transition: 'color 0.2s',
// };


// // --- Componente Header con Lógica de Autenticación ---
// const Header = () => {
//     const { userInfo, logoutUser, isAdmin } = useUser(); // Obtener el estado del usuario
//     const navigate = useNavigate();
    
//     // Por ahora, asumimos 0 items para evitar el error de useCart
//     const totalItems = 0; 

//     return (
//         <header style={headerStyle}>
//             {/* Enlace al Home */}
//             <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
//                 <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Mi Tienda MERN Online</h1>
//             </Link>
            
//             <nav style={{ display: 'flex', alignItems: 'center' }}>
//                 {userInfo ? (
//                     // Usuario Logueado
//                     <>
//                         <span style={{ marginRight: '15px', color: '#555' }}>Hola, {userInfo.name.split(' ')[0]}</span>
                        
//                         {isAdmin && (
//                             // Link al Panel de Administración (SOLO para Admin)
//                             <Link to="/admin" style={{ ...navLinkStyle, color: '#e67e22' }}>
//                                 ⚙️ Admin
//                             </Link>
//                         )}

//                         <button
//                             onClick={() => {
//                                 logoutUser();
//                                 navigate('/');
//                             }}
//                             style={{ ...navLinkStyle, marginRight: '0', color: '#c0392b', cursor: 'pointer', background: 'none', border: 'none' }}
//                         >
//                             <span style={{ fontWeight: 'bold' }}>Salir</span>
//                         </button>
//                     </>
//                 ) : (
//                     // Usuario NO Logueado
//                     <Link to="/login" style={{ ...navLinkStyle, color: '#27ae60' }}>
//                         👤 Ingresar
//                     </Link>
//                 )}
                
//                 {/* Link al Carrito con Contador */}
//                 <Link to="/carrito" style={navLinkStyle}>
//                     🛒 Carrito ({totalItems})
//                 </Link>
//             </nav>
//         </header>
//     );
// };


// // --- Componente de Ruta Protegida ---
// // Un componente simple que redirige si el usuario no es Admin
// const ProtectedAdminRoute = ({ element }) => {
//     const { isAuthenticated, isAdmin } = useUser();
//     const navigate = useNavigate();

//     React.useEffect(() => {
//         // Si no está logueado O no es Admin, lo enviamos al login o a home
//         if (!isAuthenticated || !isAdmin) {
//             navigate('/login'); 
//         }
//     }, [isAuthenticated, isAdmin, navigate]);

//     // Renderiza el elemento solo si es Admin
//     return isAuthenticated && isAdmin ? element : null;
// };


// // --- Componente Principal de la Aplicación ---
// const AppContent = () => {
//     return (
//         <div style={{ padding: '0 20px 20px 20px' }}>
//             <Header />
//             <Routes> 
//                 {/* Rutas de Autenticación */}
//                 <Route path="/login" element={<LoginScreen />} /> 
//                 <Route path="/register" element={<RegisterScreen />} /> 

//                 {/* Rutas Públicas */}
//                 <Route path="/" element={<HomeScreen />} /> 
//                 <Route path="/producto/:id" element={<ProductDetailScreen />} /> 
//                 <Route path="/carrito" element={<CartScreen />} /> 
                
//                 {/* Rutas Protegidas de Administración (Requieren isAdmin: true) */}
//                 {/* Usamos el componente ProtectedAdminRoute para envolver el acceso */}
//                 <Route path="/admin" element={<ProtectedAdminRoute element={<AdminScreen />} />} /> 
//                 <Route path="/admin/crear" element={<ProtectedAdminRoute element={<ProductForm isEdit={false} />} />} /> 
//                 <Route path="/admin/editar/:id" element={<ProtectedAdminRoute element={<ProductForm isEdit={true} />} />} /> 
//             </Routes>
//         </div>
//     );
// }

// // El componente App final que envuelve todo en el Contexto
// function App() {
//     // Nota: El BrowserRouter debe envolver esto en el archivo main.jsx o index.js
//     return (
//         <UserProvider>
//             <AppContent />
//         </UserProvider>
//     );
// }

// export default App;
import React from "react";
export default function App(){
  return (
    <div>Dentro de poco va a estar disponible en el siguiente link 👉</div>
  )
}
