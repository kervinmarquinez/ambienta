const express = require('express');
const Post = require('../models/Post'); // Tu modelo de datos
const router = express.Router();

// Ruta para obtener todos los posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error('Error al obtener los posts:', err);
    res.status(500).send('Hubo un error al obtener los posts');
  }
});

// Ruta para crear un nuevo post
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    const newPost = new Post({
      title,
      description,
    });

    await newPost.save();  // Guardar el post en la base de datos

    res.status(201).json({
      message: 'Post guardado correctamente en la base de datos',
      post: newPost
    });
  } catch (err) {
    console.error('Error al guardar el post:', err);
    res.status(500).send('Hubo un error al guardar el post');
  }
});

module.exports = router; // Exportamos el router para usarlo en server.js
