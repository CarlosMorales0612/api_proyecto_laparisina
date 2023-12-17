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


//Ruta Obtener empleado por id
router.get('/empleados/:id', empledoController.obtenerEmpleadoPorId);


// Ruta para crear un nuevo usuario
router.post('/empleados', empledoController.crearEmpleado);

// Ruta para actualizar un usuario por ID
router.put('/empleados/:id', empledoController.actualizarEmpleado);

// Ruta para eliminar un usuario por ID
router.delete('/empleados/:id', empledoController.eliminarEmpleado);

router.get('/empleados/pedidos/:correo_empleado', empledoController.obtenerPedidosPorCorreoEmpleado);


module.exports = router;
