const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const productoRoutes = require('./routes/productoRoutes')
const ordenDeProduccionRoutes = require('./routes/ordenDeProduccionRoutes')
const pedidoRoutes = require('./routes/pedidoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const ClientesRoutes = require('./routes/ClientesRoutes');
const RolesRoutes = require('./routes/RolesRoutes');
<<<<<<< HEAD
const empleadoRoutes = require('./routes/empleadoRoutes')
=======
const ventasRoutes = require('./routes/ventasRoutes');
>>>>>>> 607ba1972808d06cfbb1732b386fe08780911714
const cors = require('cors')

app.use(cors())


app.use(bodyParser.json());

app.use(express.static('uploads'))

// Conectar las rutas

<<<<<<< HEAD
app.use('/api',empleadoRoutes,ClientesRoutes,RolesRoutes, categoriaRoutes,productoRoutes,ordenDeProduccionRoutes,pedidoRoutes,usuarioRoutes);
=======
app.use('/api', authRoutes, ClientesRoutes, RolesRoutes, categoriaRoutes, productoRoutes, ordenDeProduccionRoutes, pedidoRoutes, usuarioRoutes, ventasRoutes);
>>>>>>> 607ba1972808d06cfbb1732b386fe08780911714

module.exports = app;