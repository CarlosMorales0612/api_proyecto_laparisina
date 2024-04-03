const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');
const { validarJWT, permiso_pedidos_cliente, permiso_pedidos } = require('../middlewares/index');

 // Ruta para obtener todos los pedidos
 router.get('/pedidos', PedidoController.getAllPedido);
 
// Ruta para obtener todos los pedidos
//router.get('/pedidos', [validarJWT,  permiso_pedidos], PedidoController.getAllPedido);


// Ruta para obtener un pedido por ID
router.get('/pedidos/:id',[validarJWT, permiso_pedidos], PedidoController.getPedidoById);
router.get('/pedidos-cliente/:id',[validarJWT, permiso_pedidos_cliente], PedidoController.getPedidoById);

// Ruta para crear un nuevo pedido
router.post('/pedidos',[validarJWT, permiso_pedidos], PedidoController.createPedido);
router.post('/pedidos-cliente',[validarJWT, permiso_pedidos_cliente], PedidoController.createPedido);

// Ruta para actualizar un pedido por ID
router.put('/pedidos/:id',[validarJWT, permiso_pedidos], PedidoController.updatePedido);
router.put('/pedidos/:id',[validarJWT, permiso_pedidos], PedidoController.updatePedido);


// Ruta para eliminar un pedido por ID
router.delete('/pedidos/:id', PedidoController.deletePedido);

// Ruta para obtener los pedidos de un cliente
router.get('/pedidosCliente/:id',[validarJWT, permiso_pedidos_cliente], PedidoController.getPedidoCliente);

// Ruta para obtener todos los pedidos pendientes
router.get('/pedidosPendientes',[validarJWT, permiso_pedidos], PedidoController.getPedidosPendientes);

// Ruta para obtener todos los pedidos Terminados
router.get('/pedidosTerminados',[validarJWT, permiso_pedidos], PedidoController.getPedidosTerminados);

// Ruta para obtener todos los pedidos Anulados
router.get('/pedidosAnulados',[validarJWT, permiso_pedidos], PedidoController.getPedidosAnulados);

// Ruta para obtener todos los pedidos Enviados
router.get('/pedidosEnviados',[validarJWT, permiso_pedidos], PedidoController.getPedidosEnviados);

// Ruta para obtener todos los pedidos Entregados
router.get('/pedidosEntregado',[validarJWT, permiso_pedidos], PedidoController.getPedidosEntregadosConPagoPendiente);

//Ruta para asignar un domiciliario a pedidos
router.post('/pedido/asignar-domiciliario',[validarJWT, permiso_pedidos], PedidoController.asignarDomiciliarioAPedido);





module.exports = router;
