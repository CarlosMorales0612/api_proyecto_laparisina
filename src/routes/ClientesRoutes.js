const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/ClientesController');


// Ruta para obtener todos las categorias
router.get('/clientes', ClientesController.obtenerTodosLosClientes);

// Ruta para obtener una categoria por ID
router.get('/clientes/:id', ClientesController.obtenerClientePorId);

// Ruta para crear una nueva categoria
router.post('/clientes',  ClientesController.crearCliente);

// Ruta para actualizar una categoria por ID
router.put('/clientes/:id',ClientesController.actualizarCliente);

// Ruta para eliminar una categoria por ID
router.delete('/clientes/:id', ClientesController.eliminarCliente);


module.exports = router;