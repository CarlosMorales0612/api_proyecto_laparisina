const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/RolesController');
const { validarJWT, permiso_roles } = require('../middlewares/index');


// Ruta para obtener todos los roles
router.get('/roles', RolesController.obtenerTodosLosRoles);
// router.get('/roles-administrador',[validarJWT, permiso_roles], RolesController.obtenerTodosLosRoles);

// Ruta para obtener un rol por ID
router.get('/roles/:id', RolesController.obtenerRolPorId);

// Ruta para crear un nuevo rol
router.post('/roles', [validarJWT, permiso_roles],RolesController.crearRol);

// Ruta para actualizar un rol  por ID
router.put('/roles/:id',[validarJWT, permiso_roles], RolesController.actualizarRol);

// Ruta para actualizar el estado de un rol por ID
router.put('/roles_estado/:id', RolesController.cambiarEstadoRol);


module.exports = router;