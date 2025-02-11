const express = require('express');
const router = express.Router();

// Importamos el controlador de muebles
const {
    addFurniture,
    updateFurniture,
    deleteFurniture
} = require('../controllers/furnitureController');

// Ruta para añadir un mueble a un post
router.post('/:postId/furniture', addFurniture);

// Ruta para editar un mueble dentro de un post
router.put('/:postId/furniture/:furnitureId', updateFurniture);

// Ruta para eliminar un mueble de un post
router.delete('/:postId/furniture/:furnitureId', deleteFurniture);

module.exports = router;
