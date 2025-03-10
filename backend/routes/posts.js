const express = require('express');
const router = express.Router(); 
const { protect } = require('../middleware/auth'); 
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    getUserPosts,
} = require('../controllers/postController'); 

router.get('/', getPosts); // Llama a la función getPosts del controlador
router.post('/', protect, createPost);  // Primero se asegura que el usuario esté autenticado, luego llama a createPost
router.get('/:id', getPostById);  // Llama a la función getPostById del controlador
router.put('/:id', protect, updatePost);  // Primero se asegura que el usuario esté autenticado, luego llama a updatePost
router.delete('/:id', protect, deletePost);  // Primero se asegura que el usuario esté autenticado, luego llama a deletePost
router.get('/user/:userId', protect, getUserPosts);


module.exports = router;