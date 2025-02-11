const express = require('express');
const { getUserProfile, updateUserProfile, getAllUsers } = require('../controllers/userController');  // Importar el controlador
const { protect } = require('../middleware/auth');  // Middleware de protección
const router = express.Router();

// Obtener el perfil del usuario
router.get('/profile', protect, getUserProfile);

// Actualizar el perfil del usuario
router.put('/profile', protect, updateUserProfile);

// Ruta protegida para obtener todos los usuarios
router.get('/', protect, getAllUsers);  // Solo usuarios autenticados pueden acceder

module.exports = router;
