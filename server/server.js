import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- Ahora usa 'import'

// Importamos las rutas (Nota: Necesitas añadir la extensión .js)
import productRoutes from './routes/productRoutes.js'; 

dotenv.config();

const app = express();

// ** 1. CONFIGURACIÓN DE CORS **
// ** IMPORTANTE: VERIFICA Y USA TU DOMINIO REAL DE VERCEL **
const allowedOrigins = [
    'http://localhost:5173', 
    'https://tienda-online-coral-three.vercel.app', 
    'https://tienda-online-git-main-EstebanNunez99-projects.vercel.app' 
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
mongoose.connect(process.env.MONGO_URI)
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
