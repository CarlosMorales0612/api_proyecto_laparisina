const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const { check } = require('express-validator');
const { validarCampos } = require ('../middlewares/validar-campos-usuario')

// Ruta para obtener todos los usuarios
router.get('/usuarios', UsuarioController.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', UsuarioController.getUsuarioById);

// Ruta para crear un nuevo usuario
router.post('/usuarios', [
    check('correo_electronico', 'El correo es inválido').isEmail(),
    check('contrasena_usuario', 'La contraseña debe contar con al menos 6 caracteres').isLength({ min: 6}),
    validarCampos
] ,UsuarioController.createUsuario);

// Ruta para actualizar un usuario por ID
router.put('/usuarios/:id', UsuarioController.updateUsuario);

// Ruta para eliminar un usuario por ID
router.delete('/usuarios/:id', UsuarioController.deleteUsuario);


module.exports = router;
