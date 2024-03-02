const express = require('express');
const router = express.Router();
const VentasController = require('../controllers/VentasController');
const { validarJWT, permiso_ventas } = require('../middlewares/index');

// Ruta para obtener todas las ventas
router.get('/ventas', [validarJWT, permiso_ventas], VentasController.getVentas);

//Ruta para obtener venta por id
router.get('/ventas/:id', [validarJWT, permiso_ventas], VentasController.getVentaById);

router.get('/ventas_excel', [], VentasController.ventasGetExcel);

module.exports = router;