const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/RolesController');


// Ruta para obtener todos los roles
router.get('/roles', RolesController.obtenerTodosLosRoles);

// Ruta para obtener un rol por ID
router.get('/roles/:id', RolesController.obtenerRolPorId);

// Ruta para crear un nuevo rol
router.post('/roles',  RolesController.crearRol);

// Ruta para actualizar un rol  por ID
router.put('/roles/:id', RolesController.actualizarRol);

// Ruta para actualizar el estado de un rol por ID
router.put('/roles/:id', RolesController.cambiarEstadoRol);

// Ruta para eliminar un rol por ID
router.delete('/roles/:id', RolesController.eliminarRol);


module.exports = router;