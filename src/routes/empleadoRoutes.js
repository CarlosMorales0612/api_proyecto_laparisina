const express = require('express');
const router = express.Router();
const empledoController = require('../controllers/empledoController');

// Ruta para obtener todos los usuarios
router.get('/empleado', empledoController.empleadoGet);


// Ruta para crear un nuevo usuario
router.post('/empleado', empledoController.empleadoPost);

// Ruta para actualizar un usuario por ID
router.put('/empleado/:id', empledoController.empleadoPut);

// Ruta para eliminar un usuario por ID
router.delete('/empleado/:id', empledoController.empleadoDelete);


module.exports = router;
