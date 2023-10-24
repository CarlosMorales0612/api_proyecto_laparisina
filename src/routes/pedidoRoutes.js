const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

// Ruta para obtener todos los pedidos
router.get('/pedidos', PedidoController.getAllPedido);

// Ruta para obtener un pedido por ID
router.get('/pedidos/:id', PedidoController.getPedidoById);

// Ruta para crear un nuevo pedido
router.post('/pedidos', PedidoController.createPedido);

// Ruta para actualizar un pedido por ID
router.put('/pedidos/:id', PedidoController.updatePedido);

// Ruta para eliminar un pedido por ID
router.delete('/pedidos/:id', PedidoController.deletePedido);


module.exports = router;
