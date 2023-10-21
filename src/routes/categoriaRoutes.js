const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController');
const multer = require('multer');
//const upload = multer({dest: 'uploads/'})

// Ruta para obtener todos las categorias
router.get('/categorias', CategoriaController.obtenerTodasLasCategorias);

// Ruta para obtener una categoria por ID
router.get('/categorias/:id', CategoriaController.obtenerCategoriasPorId);

// Ruta para crear una nueva categoria
router.post('/categorias', CategoriaController.subirImagen, CategoriaController.crearCategoria);

// Ruta para actualizar una categoria por ID
router.put('/categorias/:id', CategoriaController.subirImagen,CategoriaController.actualizarCategoria);

// Ruta para eliminar una categoria por ID
router.delete('/categorias/:id', CategoriaController.eliminarCategoria);


module.exports = router;
