const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Ruta para obtener todos los usuarios
router.get('/usuarios', UsuarioController.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', UsuarioController.getUsuarioById);

// Ruta para crear un nuevo usuario
router.post('/usuarios', UsuarioController.createUsuario);

// Ruta para actualizar un usuario por ID
router.put('/usuarios/:id', UsuarioController.updateUsuario);

// Ruta para eliminar un usuario por ID
router.delete('/usuarios/:id', UsuarioController.deleteUsuario);


module.exports = router;
