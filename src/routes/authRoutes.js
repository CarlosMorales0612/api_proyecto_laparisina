const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos-usuario')


// Ruta para lograr el login
router.post('/login', [
    check('correo_electronico', 'El correo es inválido').isEmail(),
    check('contrasena_usuario', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
],
    AuthController.login);

// Ruta para solicitar el restablecimiento de contraseña
router.post('/forgot-password', [
    check('correo_electronico', 'El correo es inválido').isEmail(),
    validarCampos,
],
    AuthController.forgotpassword);

// Ruta para restablecer la contraseña
router.post('/reset-password', [
    check('correo_electronico', 'El correo es inválido').isEmail(),
    check('newPassword', 'La nueva contraseña es obligatoria').not().isEmpty(),
    check('token', 'El token es obligatorio').not().isEmpty(),
    validarCampos,
],
    AuthController.resetpassword);


module.exports = router;