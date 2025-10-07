// client/src/screens/CartScreen.jsx
import React from 'react';
import useCart from '../context/useCart';
import { Link } from 'react-router-dom';

const CartScreen = () => {
  // Obtenemos los productos, la función para quitarlos y el total
  const { cartItems, removeFromCart, cartTotal } = useCart();

  // Si el carrito está vacío, mostramos un mensaje
  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Tu Carrito Está Vacío 🛒</h2>
        <p>Parece que aún no has añadido productos.</p>
        <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tu Carrito de Compras</h1>
      
      {/* Lista de Productos en el Carrito */}
      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        {cartItems.map((item) => (
          <div 
            key={item._id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              borderBottom: '1px solid #eee',
              padding: '10px 0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <img 
                src={item.imagen_url} 
                alt={item.nombre} 
                style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }} 
              />
              <Link 
                to={`/producto/${item._id}`} 
                style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}
              >
                {item.nombre}
              </Link>
            </div>

            <div style={{ minWidth: '150px', textAlign: 'right' }}>
              <p>{item.qty} x ${item.precio.toFixed(2)}</p>
              <p>Total: **${(item.qty * item.precio).toFixed(2)}**</p>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              style={{ 
                marginLeft: '20px', 
                backgroundColor: 'red', 
                color: 'white', 
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      {/* Resumen del Carrito */}
      <div style={{ textAlign: 'right', borderTop: '2px solid #333', paddingTop: '15px' }}>
        <h2>Total del Carrito: **${cartTotal}**</h2>
        <button 
          style={{ 
            padding: '12px 30px', 
            backgroundColor: 'green', 
            color: 'white', 
            border: 'none', 
            fontSize: '1.1em',
            marginTop: '15px',
            cursor: 'pointer'
          }}
        >
          Proceder al Pago (Checkout)
        </button>
      </div>
    </div>
  );
};

export default CartScreen;