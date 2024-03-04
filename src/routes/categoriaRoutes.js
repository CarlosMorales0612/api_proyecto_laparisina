const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController');
const multer = require('multer');
const { validarJWT, permiso_categorias } = require('../middlewares/index');
//const upload = multer({dest: 'uploads/'})

// Ruta para obtener todos las categorias
router.get('/categorias', CategoriaController.obtenerTodasLasCategorias);

// Ruta para obtener una categoria por ID
router.get('/categorias/:id', CategoriaController.obtenerCategoriasPorId);

// Ruta para obtener una categoria por Nombre
router.get('/categorias/consultar/:nombre_categoria_producto', CategoriaController.obtenerCategoriaPorNombre);

// Ruta para crear una nueva categoria
router.post('/categorias',[validarJWT, permiso_categorias], CategoriaController.subirImagen, CategoriaController.crearCategoria);

// Ruta para actualizar una categoria por ID
router.put('/categorias/:id', CategoriaController.subirImagen,CategoriaController.actualizarCategoria);

// Ruta para eliminar una categoria por ID
router.put('/categoria-estado/:id',[validarJWT, permiso_categorias], CategoriaController.cambiarEstadoCategoria);


module.exports = router;
