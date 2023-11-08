const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/ClientesController');


// Ruta para obtener todos los clientes
router.get('/clientes', ClientesController.obtenerTodosLosClientes);

// Ruta para obtener un cliente por ID
router.get('/clientes/:id', ClientesController.obtenerClientePorId);

// Ruta para crear un nuevo cliente
router.post('/clientes',  ClientesController.crearCliente);

// Ruta para actualizar un cliente por ID
router.put('/clientes/:id',ClientesController.actualizarCliente);

// Ruta para actualizar un cliente por ID
router.put('/clientes_estado/:id',ClientesController.cambiarEstadoCliente);

// Ruta para eliminar un cliente por ID
router.delete('/clientes/:id', ClientesController.eliminarCliente);


module.exports = router;