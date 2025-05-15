const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const userUpdateRoutes = require('./routes/userUpdate');
const furnitureRoutes = require('./routes/furnitures');
const authRoutes = require('./routes/auth');

dotenv.config(); // Cargar variables de entorno

const app = express();

connectDB();

app.use(express.json());

// Configuración avanzada de CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// Rutas
app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', userUpdateRoutes);
app.use('/api/furniture', furnitureRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola desde Ambienta!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
