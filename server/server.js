import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
// Importamos la ruta que acabamos de crear
import productRoutes from './routes/productRoutes.js'; 

// 1. Cargar variables de entorno
dotenv.config();

// 2. Conexión a la base de datos
connectDB();

const app = express();

// 3. Middlewares
app.use(express.json()); 
app.use(cors()); 

// 4. Ruta de prueba y Rutas de la API
app.get('/', (req, res) => {
  res.send('API está corriendo...');
});

// Usamos las rutas de producto. Toda solicitud a /api/productos irá aquí.
app.use('/api/productos', productRoutes); 

// 5. Configuración de puertos
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor Express corriendo en el puerto ${PORT}`));