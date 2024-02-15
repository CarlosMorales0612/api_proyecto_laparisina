const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

 // Ruta para obtener todos los pedidos
 router.get('/pedidos', PedidoController.getAllPedido);
 
// Ruta para obtener todos los pedidos
//router.get('/pedidos', [validarJWT,  permiso_pedidos], PedidoController.getAllPedido);


// Ruta para obtener un pedido por ID
router.get('/pedidos/:id', PedidoController.getPedidoById);

// Ruta para crear un nuevo pedido
router.post('/pedidos', PedidoController.createPedido);

// Ruta para actualizar un pedido por ID
router.put('/pedidos/:id', PedidoController.updatePedido);

// Ruta para eliminar un pedido por ID
router.delete('/pedidos/:id', PedidoController.deletePedido);

// Ruta para obtener todos los pedidos pendientes
router.get('/pedidosPendientes', PedidoController.getPedidosPendientes);

// Ruta para obtener todos los pedidos Terminados
router.get('/pedidosTerminados', PedidoController.getPedidosTerminados,);

// Ruta para obtener todos los pedidos Anulados
router.get('/pedidosAnulados', PedidoController.getPedidosAnulados,);

// Ruta para obtener todos los pedidos Terminados
router.get('/pedidosEnviados', PedidoController.getPedidosEnviados,);

//Ruta para asignar un domiciliario a pedidos
router.post('/pedido/asignar-domiciliario', PedidoController.asignarDomiciliarioAPedido);




module.exports = router;
