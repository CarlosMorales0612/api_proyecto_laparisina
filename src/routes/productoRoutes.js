const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/ProductoController');

// Ruta para obtener todos los productos
router.get('/productos', ProductoController.obtenerTodosLosProductos);

// Ruta para obtener una categoria por ID
router.get('/productos/:id', ProductoController.obtenerProductoPorId);

// Ruta para crear una nueva categoria y subir la imagen
router.post('/productos', ProductoController.subirImagen, ProductoController.crearProducto);

// Ruta para actualizar una categoria por ID y subir la imagen
router.put('/productos/:id', ProductoController.subirImagen,ProductoController.actualizarProducto);

// Ruta para eliminar una categoria por ID
router.delete('/productos/:id', ProductoController.eliminarProducto);


module.exports = router;
