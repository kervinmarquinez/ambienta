// backend/models/Furniture.js
const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  purchaseLink: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
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

// Crear e exportar el modelo
const Furniture = mongoose.model('Furniture', furnitureSchema);
module.exports = Furniture;
