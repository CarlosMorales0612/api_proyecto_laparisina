const express = require('express');
const router = express.Router();
const empledoController = require('../controllers/empleadoController');
const cors = require('cors');
const app = express();


app.use(cors());

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // Algunos navegadores pueden enviar solicitudes OPTIONS antes de una solicitud POST
  };
  
  app.use(cors(corsOptions));
// Ruta para obtener todos los usuarios
router.get('/empleados', empledoController.obtenerTodosLosEmpleados);

router.get('/domiciliarios', empledoController.obtenerTodosLosDomiciliarios);

router.get('/obtenerEmpleadoPorIdentificacion/:identificacion_empleado', empledoController.obtenerEmpleadoPorIdentificacion);


//Ruta Obtener empleado por id
router.get('/empleados/:id', empledoController.obtenerEmpleadoPorId);


// Ruta para crear un nuevo usuario
router.post('/empleados', empledoController.crearEmpleado);

// Ruta para actualizar un usuario por ID
router.put('/empleados/:id', empledoController.actualizarEmpleado);

// Ruta para eliminar un usuario por ID
router.delete('/empleados/:id', empledoController.eliminarEmpleado);

router.get('/empleados/pedidos/:id', empledoController.obtenerPedidoPorIdDomiciliario);

// Ruta para asignar un pedido a un domiciliario
router.post('/empleados/asignar-pedido', empledoController.asignarPedidoDomiciliario);


router.get('/empleado/:correo', empledoController.domiciliario)



module.exports = router;
