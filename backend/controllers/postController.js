const Post = require('../models/Post');

// Crear un nuevo post
const createPost = async (req, res) => {
    try {
        const { title, description, imageUrl, furniture } = req.body;

        const newPost = new Post({
            title,
            description,
            image: imageUrl, 
            furniture, // Lista de muebles
            user: req.user.id, // ID del usuario autenticado
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error en createPost:', error);
        res.status(500).json({ message: 'Error al crear el post', error: error.message });
    }
};

// Obtener todos los posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name email'); // Obtiene los datos del usuario creador
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
};

// Obtener un post por ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'name email');

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el post' });
    }
};

// Editar un post
const updatePost = async (req, res) => {
    try {
        const { title, description, imageUrl, furniture } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verificar que el usuario que edita es el dueño del post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No autorizado para editar este post' });
        }

        // Actualizar datos
        post.title = title || post.title;
        post.description = description || post.description;
        post.imageUrl = imageUrl || post.imageUrl;
        post.furniture = furniture || post.furniture;

        const updatedPost = await post.save();

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el post' });
    }
};

// Eliminar un post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verificar que el usuario que elimina es el dueño del post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No autorizado para eliminar este post' });
        }

        await post.deleteOne();

        res.json({ message: 'Post eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el post' });
    }
};



module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
