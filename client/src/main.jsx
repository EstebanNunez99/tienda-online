// client/src/main.jsx (Opcional, pero más limpio)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Importamos BrowserRouter aquí si lo vamos a usar
import { BrowserRouter } from 'react-router-dom'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos la app directamente aquí */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// Si haces esto, en App.jsx solo usas <Routes> y <Route>, no <Router>.