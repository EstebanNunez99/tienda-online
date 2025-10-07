import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Importamos BrowserRouter aquí
import { BrowserRouter } from 'react-router-dom'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ESTE ES EL COMPONENTE CLAVE QUE EVITA EL ERROR 'basename' */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
