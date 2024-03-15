const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/ProductoController');
const { validarJWT, permiso_productos } = require('../middlewares/index');

// Ruta para obtener todos los productos
router.get('/productos', ProductoController.obtenerTodosLosProductos);

// Ruta para obtener un producto por ID
router.get('/productos/:id', ProductoController.obtenerProductoPorId);

// Ruta para obtener un productos por categoría
router.get('/productos-categoria/:categoria', ProductoController.obtenerProductoPorCategoria);

// Ruta para crear un nuevo producto y subir las imagenes
router.post('/productos',[validarJWT, permiso_productos], ProductoController.subirImagen, ProductoController.crearProducto);

// Ruta para actualizar un producto por ID y subir la imagen
router.put('/productos/:id',[validarJWT, permiso_productos], ProductoController.subirImagen,ProductoController.actualizarProducto);

// Ruta para cambiar el estado de un producto por ID
router.put('/producto-estado/:id',[validarJWT, permiso_productos], ProductoController.cambiarEstadoProducto);


module.exports = router;
