// server/config/db.js (ACTUALIZADO)
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // AÑADIMOS UN OBJETO DE OPCIONES PARA FUERZAR EL USO DE UN PARSER MODERNO
    // y para eliminar warnings de Mongoose que pueden afectar el despliegue
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // (Necesario en versiones antiguas, buena práctica incluirlo)
      useUnifiedTopology: true, // (Manejo de topología, ayuda en entornos dinámicos)
      // ESTA OPCIÓN YA NO ES NECESARIA, PERO LA DEJAMOS COMO REFERENCIA: useCreateIndex: true,
    });
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;