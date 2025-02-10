const express = require('express');
const connectDB = require('./config/db');  // Importa la conexión a la base de datos
const postsRoutes = require('./routes/posts');  // Importar las rutas de los posts

const app = express();

// Conectar a la base de datos
connectDB();

// Configuración de middlewares
app.use(express.json());

// Usar las rutas importadas
app.use('/api/posts', postsRoutes);  // Las rutas para los posts están en '/api/posts'

// Ruta básica para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('¡Hola desde Ambienta!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
