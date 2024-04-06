const express = require('express');
const router = express.Router();
const empledoController = require('../controllers/empleadoController');
const cors = require('cors');
const app = express();
const { validarJWT, permiso_empleados, permiso_pedidos_empleado } = require('../middlewares/index');


app.use(cors());

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // Algunos navegadores pueden enviar solicitudes OPTIONS antes de una solicitud POST
  };

  


  
  app.use(cors(corsOptions));
// Ruta para obtener todos los usuarios
router.get('/empleados',[validarJWT, permiso_empleados], empledoController.obtenerTodosLosEmpleados);

router.get('/domiciliarios', empledoController.obtenerTodosLosDomiciliarios);

router.get('/obtenerEmpleadoPorIdentificacion/:identificacion_empleado', empledoController.obtenerEmpleadoPorIdentificacion);


//Ruta Obtener empleado por id
router.get('/empleados/:id', empledoController.obtenerEmpleadoPorId);


// Ruta para crear un nuevo usuario
router.post('/empleados',[validarJWT, permiso_empleados], empledoController.crearEmpleado);

// Ruta para actualizar un usuario por ID
router.put('/empleados/:id',[validarJWT, permiso_empleados], empledoController.actualizarEmpleado);

router.get('/empleados/pedidos/:id', empledoController.obtenerPedidoPorIdDomiciliario);


// Ruta para asignar un pedido a un domiciliario
router.post('/empleados/asignar-pedido', empledoController.asignarPedidoDomiciliario);


//Obtener domicilios asignados al empleado 
router.get('/empleado/:correo',[validarJWT, permiso_pedidos_empleado], empledoController.domiciliario);


router.get('/consultar-empleado/:correo_electronico', empledoController.obtenerEmpleadoPorCorreo)


// Ruta para cambiar el estado de un empleado por ID
router.put('/empleados_estado/:id',[validarJWT, permiso_empleados], empledoController.cambiarEstadoEmpleado);

module.exports = router;
