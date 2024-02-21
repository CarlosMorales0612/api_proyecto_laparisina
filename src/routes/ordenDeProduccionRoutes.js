const express = require('express');
const router = express.Router();
const OrdenDeProduccionController = require('../controllers/OrdenDeProduccionController');

// Ruta para obtener todas las ordenes de producción
router.get('/consultar-produccion', OrdenDeProduccionController.obtenerTodasLasOrdenesDeProduccion);

// Ruta para obtener una orden de producción por ID
router.get('/consultar-produccion/:id', OrdenDeProduccionController.obtenerOrdenDeProduccionPorId);

// Ruta para obtener ordenes de producción por área
router.get('/consultar-produccion-area/:area', OrdenDeProduccionController.obtenerOrdenesDeProduccionPorArea);

// Ruta para generar nuevas ordenes de producción
router.post('/crear-produccion', OrdenDeProduccionController.crearOrdenDeProduccion);

// Ruta para actualizar una orden de producción por ID
router.put('/actualizar-produccion/:id', OrdenDeProduccionController.actualizarOrdenDeProduccion);


module.exports = router;