const express = require('express');
const router = express.Router();
const TransporteController = require('../controllers/TransporteController');


// Ruta para obtener todos los roles
router.get('/transporte', TransporteController.obtenerTodosLosTransporte);

// Ruta para obtener un rol por ID
router.get('/transporte/:id', TransporteController.obtenerTransportePorId);

// Ruta para crear un nuevo rol
router.post('/transporte',  TransporteController.crearTransporte);

// Ruta para actualizar un rol  por ID
router.put('/transporte/:id', TransporteController.actualizarTransporte);

// Ruta para actualizar el estado de un rol por ID
router.put('/transporte_estado/:id', TransporteController.cambiarEstadoTransporte);

// Ruta para eliminar un rol por ID
router.delete('/transporte/:id', TransporteController.eliminarTranspote);


module.exports = router;