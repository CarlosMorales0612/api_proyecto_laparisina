const express = require('express');
const router = express.Router();
const VentasController = require('../controllers/VentasController');

// Ruta para obtener todas las ventas
router.get('/ventas', VentasController.getVentas);

module.exports = router;