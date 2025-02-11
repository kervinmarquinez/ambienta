const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Registrar un usuario
router.post('/register', registerUser);

// Iniciar sesión
router.post('/login', loginUser);

module.exports = router;
