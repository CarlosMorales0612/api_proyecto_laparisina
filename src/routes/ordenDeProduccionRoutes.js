const express = require('express');
const router = express.Router();
const OrdenDeProduccionController = require('../controllers/OrdenDeProduccionController');
const { validarJWT, permiso_orden_produccion } = require('../middlewares/index');

// Ruta para obtener todas las ordenes de producción
router.get('/consultar-produccion', [validarJWT, permiso_orden_produccion], OrdenDeProduccionController.obtenerTodasLasOrdenesDeProduccion);

// Ruta para obtener una orden de producción por ID
router.get('/consultar-produccion/:id', [validarJWT, permiso_orden_produccion], OrdenDeProduccionController.obtenerOrdenDeProduccionPorId);

// Ruta para obtener ordenes de producción por área
router.get('/consultar-produccion-area/:area', [validarJWT, permiso_orden_produccion], OrdenDeProduccionController.obtenerOrdenesDeProduccionPorArea);

// Ruta para generar nuevas ordenes de producción
router.post('/crear-produccion', [validarJWT, permiso_orden_produccion], OrdenDeProduccionController.crearOrdenDeProduccion);

// Ruta para actualizar una orden de producción por ID
router.put('/actualizar-produccion/:id', [validarJWT, permiso_orden_produccion], OrdenDeProduccionController.actualizarOrdenDeProduccion);


module.exports = router;