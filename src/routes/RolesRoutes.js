const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/RolesController');


// Ruta para obtener todos las categorias
router.get('/roles', RolesController.obtenerTodosLosRoles);

// Ruta para obtener una categoria por ID
router.get('/roles/:id', RolesController.obtenerRolPorId);

// Ruta para crear una nueva categoria
router.post('/roles',  RolesController.crearRol);

// Ruta para actualizar una categoria por ID
router.put('/roles/:id', RolesController.actualizarRol);

// Ruta para eliminar una categoria por ID
router.delete('/roles/:id', RolesController.eliminarRol);


module.exports = router;