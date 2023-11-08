const express = require('express');
const router = express.Router();
const VentasController = require('../controllers/VentasController');

// Ruta para obtener todas las ventas
router.get('/ventas', VentasController.getVentas);

//Ruta para obtener venta por id
router.get('/ventas/:id', VentasController.getVentaById);

module.exports = router;