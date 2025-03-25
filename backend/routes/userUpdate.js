// Este archivo debería agregarse como backend/routes/userUpdate.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// POST /api/users/change-password
// Ruta exclusiva para cambiar la contraseña
router.post('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validaciones básicas
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Por favor, proporciona la contraseña actual y la nueva' });
    }
    
    // Buscar usuario por ID (del token JWT)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Verificar que la contraseña actual sea correcta
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
    }
    
    // Encriptar y guardar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();
    
    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error en cambio de contraseña:', error);
    res.status(500).json({ 
      message: 'Error al cambiar la contraseña',
      error: error.message 
    });
  }
});

// POST /api/users/update-description
// Ruta exclusiva para actualizar la descripción
router.post('/update-description', protect, async (req, res) => {
  try {
    const { description } = req.body;
    
    // Buscar usuario por ID (del token JWT)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Actualizar la descripción
    user.description = description;
    
    await user.save();
    
    res.json({ 
      message: 'Descripción actualizada exitosamente',
      description: user.description
    });
  } catch (error) {
    console.error('Error en actualización de descripción:', error);
    res.status(500).json({ 
      message: 'Error al actualizar la descripción',
      error: error.message 
    });
  }
});

router.post('/update-avatar', protect, async (req, res) => {
  try {
    const { avatarUrl } = req.body;
    
    if (!avatarUrl) {
      return res.status(400).json({ message: 'La URL del avatar es requerida' });
    }
    
    // Buscar usuario por ID (del token JWT)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Actualizar el avatar
    user.avatarUrl = avatarUrl;
    user.updatedAt = Date.now();
    
    await user.save();
    
    res.json({ 
      message: 'Avatar actualizado exitosamente',
      avatarUrl: user.avatarUrl
    });
  } catch (error) {
    console.error('Error en actualización de avatar:', error);
    res.status(500).json({ 
      message: 'Error al actualizar el avatar',
      error: error.message 
    });
  }
});

module.exports = router;