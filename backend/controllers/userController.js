// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Obtener el perfil del usuario
const getUserProfile = async (req, res) => {
    try {
        // Obtener el usuario autenticado usando el ID del JWT
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            description: user.description,
            avatarUrl: user.avatarUrl
        });
    } catch (error) {
        console.error("Error en getUserProfile:", error);
        res.status(500).json({ message: 'Error al obtener perfil' });
    }
};

// Actualizar el perfil del usuario
const updateUserProfile = async (req, res) => {
    try {
        const { name, email, description, currentPassword, newPassword } = req.body;

        // Buscar el usuario autenticado
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Para debug
        console.log("Datos recibidos:", { name, email, description, hasCurrentPassword: !!currentPassword, hasNewPassword: !!newPassword });

        // Actualizar los campos que se envían en la solicitud
        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (description !== undefined) user.description = description;

        // Verificar si se está intentando cambiar la contraseña
        if (newPassword && currentPassword) {
            // Comprobar si la contraseña actual es correcta
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            
            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña actual incorrecta' });
            }
            
            // Encriptar y guardar la nueva contraseña
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            console.log("Contraseña cambiada exitosamente");
        } else if (newPassword && !currentPassword) {
            return res.status(400).json({ message: 'Se requiere la contraseña actual para cambiar la contraseña' });
        }

        // Guardar los cambios
        await user.save();

        // Devolver los datos actualizados del usuario (sin la contraseña)
        res.json({ 
            message: 'Perfil actualizado con éxito',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                description: user.description,
                avatarUrl: user.avatarUrl
            }
        });
    } catch (error) {
        console.error("Error en updateUserProfile:", error);
        res.status(500).json({ message: 'Error al actualizar perfil' });
    }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('_id name description avatarUrl');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      // Devolver solo la información que es segura compartir públicamente
      res.json({
        id: user._id,
        name: user.name,
        description: user.description,
        avatarUrl: user.avatarUrl
      });
    } catch (error) {
      console.error('Error en getUserById:', error);
      res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

module.exports = { getUserProfile, updateUserProfile, getAllUsers, getUserById };