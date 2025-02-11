const jwt = require('jsonwebtoken');

// Middleware para proteger rutas que requieren autenticación
const protect = (req, res, next) => {
    let token;

    // Comprobar si el token está presente en los headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del header Authorization
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token usando la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Guardar la información del usuario decodificada en el objeto 'req.user'
            req.user = decoded;
            next(); // Continuar con la siguiente función en la cadena de middlewares
        } catch (error) {
            res.status(401).json({ message: 'No autorizado, token inválido o expirado' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, token no encontrado' });
    }
};

module.exports = { protect };
