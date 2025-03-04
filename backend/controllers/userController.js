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
            name: user.name,
            email: user.email,
            description: user.description,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener perfil' });
    }
};

// Actualizar el perfil del usuario
const updateUserProfile = async (req, res) => {
    try {
        const { name, email, password, description } = req.body;

        // Buscar el usuario autenticado
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar los campos que se envían en la solicitud
        user.name = name || user.name;
        user.email = email || user.email;
        user.description = description || user.description;

        if (password) {
            // Si se proporciona una nueva contraseña, encriptarla
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.json({ message: 'Perfil actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar perfil' });
    }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();  // Devuelve todos los usuarios
      res.json(users);  // Enviamos los usuarios como respuesta
    } catch (error) {
      console.error(error);  // Imprimir error en la consola para depurar
      res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
  };

module.exports = { getUserProfile, updateUserProfile, getAllUsers };
