// server/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Asegura que no haya dos usuarios con el mismo email
    },
    password: {
      type: String,
      required: true,
    },
    esAdmin: { // Para distinguir a los administradores
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware: Encriptar la contraseña antes de guardar (pre-save hook)
userSchema.pre('save', async function (next) {
  // Solo encripta si la contraseña ha sido modificada (al registrar o cambiarla)
  if (!this.isModified('password')) {
    next();
  }

  // Genera un "salt" (valor aleatorio) y hashea la contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar la contraseña ingresada con la encriptada
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;