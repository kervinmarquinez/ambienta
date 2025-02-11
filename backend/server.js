const express = require('express');
const connectDB = require('./config/db');  // Importa la conexión a la base de datos
const postsRoutes = require('./routes/posts');  // Importar las rutas de los posts
const userRoutes = require('./routes/users');  // Importar las rutas de los usuarios
const furnitureRoutes = require('./routes/furnitures');  // Importar las rutas de los muebles
const authRoutes = require('./routes/auth');  // Importar las rutas de autenticación

const app = express();

// Conectar a la base de datos
connectDB();

// Configuración de middlewares
app.use(express.json());

// Usar las rutas importadas
app.use('/api/posts', postsRoutes);  // Las rutas para los posts están en '/api/posts'
app.use('/api/users', userRoutes);  // Las rutas para los usuarios están en '/api/users'
app.use('/api/furniture', furnitureRoutes);  // Las rutas para los muebles están en '/api/furniture'
app.use('/api/auth', authRoutes);   // Las rutas para autenticación están en '/api/auth'

// Ruta básica para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('¡Hola desde Ambienta!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
