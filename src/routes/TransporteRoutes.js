const express = require('express');
const router = express.Router();
const TransporteController = require('../controllers/TransporteController');
const { validarJWT, permiso_transportes } = require('../middlewares/index');


// Ruta para obtener todos los roles
router.get('/transporte', TransporteController.obtenerTodosLosTransporte);

// Ruta para obtener un rol por ID
router.get('/transporte/:id', TransporteController.obtenerTransportePorId);

// Ruta para obtener un rol por ID
router.get('/transporteActivo', TransporteController.obtenerTransporteActivos);


// Ruta para crear un nuevo rol
router.post('/transporte',[validarJWT, permiso_transportes],  TransporteController.crearTransporte);

// Ruta para actualizar un rol  por ID
router.put('/transporte/:id',[validarJWT, permiso_transportes], TransporteController.actualizarTransporte);

// Ruta para actualizar el estado de un rol por ID
router.put('/transporte_estado/:id',[validarJWT, permiso_transportes], TransporteController.cambiarEstadoTransporte);


module.exports = router;