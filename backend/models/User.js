// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user', // El rol por defecto será 'user'
  },
  description: {
    type: String,
    default: 'Escribe una descripción', // Descripción del usuario
  },
  avatarUrl: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1493206330/default-avatar.png', // URL por defecto para el avatar
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Crear y exportar el modelo
const User = mongoose.model('User', userSchema);
module.exports = User;