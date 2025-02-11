const Post = require('../models/Post');

// Añadir un mueble a un post
const addFurniture = async (req, res) => {
    try {
        const { name, purchaseLink, price } = req.body;
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verificar que el usuario autenticado sea el dueño del post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No autorizado para agregar muebles a este post' });
        }

        const newFurniture = { name, purchaseLink, price };
        post.furniture.push(newFurniture);
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir el mueble' });
    }
};

// Editar un mueble dentro de un post
const updateFurniture = async (req, res) => {
    try {
        const { name, purchaseLink, price } = req.body;
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verificar que el usuario autenticado sea el dueño del post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No autorizado para editar muebles de este post' });
        }

        // Buscar el mueble dentro del post
        const furniture = post.furniture.id(req.params.furnitureId);
        if (!furniture) {
            return res.status(404).json({ message: 'Mueble no encontrado' });
        }

        // Actualizar solo los campos enviados en la solicitud
        furniture.name = name || furniture.name;
        furniture.purchaseLink = purchaseLink || furniture.purchaseLink;
        furniture.price = price || furniture.price;

        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el mueble' });
    }
};

// Eliminar un mueble de un post
const deleteFurniture = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verificar que el usuario autenticado sea el dueño del post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No autorizado para eliminar muebles de este post' });
        }

        // Filtrar los muebles y eliminar el que coincida con el ID
        post.furniture = post.furniture.filter(f => f._id.toString() !== req.params.furnitureId);

        await post.save();

        res.json({ message: 'Mueble eliminado correctamente', post });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el mueble' });
    }
};

module.exports = { addFurniture, updateFurniture, deleteFurniture };
