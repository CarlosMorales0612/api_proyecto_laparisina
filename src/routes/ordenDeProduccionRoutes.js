const express = require('express');
const router = express.Router();
const OrdenDeProduccionController = require('../controllers/OrdenDeProduccionController');

// Ruta para obtener todos las ordenes de producción
router.get('/ordenDeProduccion', OrdenDeProduccionController.obtenerOrdenesDeProduccion);

// // Ruta para obtener una categoria por ID
// router.get('/categorias/:id', OrdenDeProduccionController.obtenerCategoriasPorId);

// // Ruta para crear una nueva categoria
// router.post('/categorias', OrdenDeProduccionController.subirImagen, OrdenDeProduccionController.crearCategoria);

// // Ruta para actualizar una categoria por ID
// router.put('/categorias/:id', OrdenDeProduccionController.subirImagen,OrdenDeProduccionController.actualizarCategoria);

// // Ruta para eliminar una categoria por ID
// router.delete('/categorias/:id', OrdenDeProduccionController.eliminarCategoria);


module.exports = router;