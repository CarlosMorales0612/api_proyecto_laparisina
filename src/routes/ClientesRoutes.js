const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/ClientesController');
const { validarJWT, permiso_clientes } = require('../middlewares/index');


// Ruta para obtener todos los clientes
router.get('/clientes',[validarJWT, permiso_clientes], ClientesController.obtenerTodosLosClientes);
router.get('/clientes-registrar', ClientesController.obtenerTodosLosClientes);

// Ruta para obtener un cliente por ID
router.get('/clientes/:id', ClientesController.obtenerClientePorId);

// Ruta para obtener un cliente por documento
router.get('/clientes/consultar/:numero_documento_cliente', ClientesController.obtenerClientePorDocumento);

// Ruta para obtener un cliente por correo
router.get('/cliente/:correo_cliente', ClientesController.obtenerClientePorCorreo);


// Ruta para crear un nuevo cliente
router.post('/clientes', ClientesController.crearCliente);

// Ruta para actualizar un cliente por ID
router.put('/clientes/:id',[validarJWT, permiso_clientes],ClientesController.actualizarCliente);

// Ruta para actualizar un cliente por ID
router.put('/clientes_estado/:id',[validarJWT, permiso_clientes],ClientesController.cambiarEstadoCliente);

// Ruta para descargar el excel
router.get('/clientes_excel',[validarJWT, permiso_clientes], ClientesController.clienteGetexcel);

// // Ruta para obtener un cliente por número de documento
// router.get('/clientes/consultar/:documento_cliente', ClientesController.obtenerClientePorDocumento);



module.exports = router;