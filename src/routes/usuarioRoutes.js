const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const { check } = require('express-validator');
 const { rol_valido, email_existe, existeUsuarioPorId } = require('../helpers/db-validadores');
const { validarCampos, validarJWT, esAdminRol, tieneRol } = require('../middlewares/index');


// Ruta para obtener todos los usuarios
router.get('/usuarios', UsuarioController.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', UsuarioController.getUsuarioById);

// Ruta para crear un nuevo usuario
router.post('/usuarios', [
    check('correo_electronico', 'El correo es inválido').isEmail(),
    check('correo_electronico').custom(email_existe),
    check('contrasena_usuario', 'La contraseña debe contar con al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos,
    check('rol_usuario').custom(rol_valido),

], UsuarioController.createUsuario);

// Ruta para actualizar un usuario por ID
router.put('/usuarios/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], UsuarioController.updateUsuario);

// Ruta para eliminar un usuario por ID
router.delete('/usuarios/:id', [
    validarJWT,
    //Esta validación, se encarga de verificar de que sí o sí para acceder a este método se deba ser administrador.
    esAdminRol,
    //Esta validación, se encarga de verificar de que los roles que se encuentren aquí, tengan acceso a este método.
    //tieneRol('Administrador'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], UsuarioController.deleteUsuario);


module.exports = router;
