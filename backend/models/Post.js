const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Relación con el modelo User
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,  // URL de la imagen de la publicación
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  furniture: [
    {
      name: {
        type: String,
        required: true
      },
      purchaseLink: {
        type: String,
        default: ''
      },
      price: {
        type: Number,
        default: 0
      },
      imageUrl: {
        type: String,
        required: true
      }
    }
  ],
});

// Crear e exportar el modelo
const Post = mongoose.model('Post', postSchema);
module.exports = Post;