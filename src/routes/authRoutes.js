const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { check } = require('express-validator');
const { validarCampos } = require ('../middlewares/validar-campos-usuario')


// Ruta para lograr el login
router.post('/login', [
    check('correo_electronico', 'El correo es inválido').isEmail(),
    check('contrasena_usuario', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
],
AuthController.login);

module.exports = router;