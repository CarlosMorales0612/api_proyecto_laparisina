const express = require('express');
const router = express.Router();
const empledosController = require('../controllers/empleadoController');

// Ruta para obtener todos los usuarios
router.get('/empleados', empledosController.obtenerTodosLosEmpleados);

//Ruta Obtener empleado por id
router.get('/empleados/:id', empledosController.obtenerEmpleadoPorId);


// Ruta para crear un nuevo usuario
router.post('/empleados', empledosController.crearEmpleado);

// Ruta para actualizar un usuario por ID
router.put('/empleados/:id', empledosController.actualizarEmpleado);

// Ruta para eliminar un usuario por ID
router.delete('/empleados/:id', empledosController.eliminarEmpleado);


module.exports = router;
