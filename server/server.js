const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // <-- IMPORTAMOS CORS
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// ** 1. CONFIGURACIÓN DE CORS **
// Aquí debes listar explícitamente los dominios que pueden acceder a tu API.
// 
// - http://localhost:5173: Para desarrollo local.
// - https://tienda-online-xxxx.vercel.app: El dominio de Vercel de tu Frontend.
const allowedOrigins = [
    'http://localhost:5173', 
    'https://tienda-online-coral-three.vercel.app', // <-- REEMPLAZA CON TU DOMINIO REAL DE VERCEL
    'https://tienda-online-git-main-estebannunez99-projects.vercel.app' // <-- Dominio de la rama main
];

const corsOptions = {
    origin: (origin, callback) => {
        // Permitir solicitudes sin origen (como las de Postman o CURL)
        if (!origin) return callback(null, true); 
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La política CORS para este sitio no permite el acceso desde el origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};

// Aplicar el middleware de CORS
app.use(cors(corsOptions));
// ******************************


// Middleware
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.use('/api/productos', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Tienda Online funcionando.');
});

// Inicialización del Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
