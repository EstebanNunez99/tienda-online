// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 1. Cargar variables de entorno
dotenv.config();

// 2. Conexión a la base de datos (lo definiremos en el siguiente paso)
connectDB();

const app = express();

// 3. Middlewares
app.use(express.json()); // Permite al servidor leer datos JSON
app.use(cors()); // Permite la comunicación con el frontend de Vite

// 4. Ruta de prueba
app.get('/', (req, res) => {
  res.send('API está corriendo...');
});

// 5. Configuración de puertos
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor Express corriendo en el puerto ${PORT}`));