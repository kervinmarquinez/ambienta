const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registrar un usuario
const registerUser = async (req, res) => {
    const { name, email, password} = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario
        const user = new User({
            name,
            email,
            password: hashedPassword,

        });

        // Guardar el usuario en la base de datos
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por correo
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un JWT (Token de autenticación)
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }  // El token expirará en 1 hora
        );

        // Crear un objeto con los datos del usuario (sin incluir la contraseña)
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            description: user.description,
            // Aquí puedes añadir cualquier otro dato del usuario que quieras enviar
            // Por ejemplo: role, createdAt, etc.
        };

        // Enviar el token y los datos del usuario
        res.json({ 
            token, 
            user: userData 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

module.exports = { registerUser, loginUser };