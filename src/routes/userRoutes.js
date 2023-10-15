const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Ruta para obtener todos los usuarios
router.get('/users', UserController.getAllUsers);

// Ruta para obtener un usuario por ID
router.get('/users/:id', UserController.getUserById);

// Ruta para crear un nuevo usuario
router.post('/users', UserController.createUser);

// Ruta para actualizar un usuario por ID
router.put('/users/:id', UserController.updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/users/:id', UserController.deleteUser);


module.exports = router;
