const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const categoriaRoutes = require('./routes/categoriaRoutes');
const productoRoutes = require('./routes/productoRoutes')
const ordenDeProduccionRoutes = require('./routes/ordenDeProduccionRoutes')
const pedidoRoutes = require('./routes/pedidoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const ClientesRoutes= require('./routes/ClientesRoutes');
const RolesRoutes = require('./routes/RolesRoutes');
const cors = require('cors')

app.use(cors())


app.use(bodyParser.json());

app.use(express.static('uploads'))
// Conectar las rutas

app.use('/api',ClientesRoutes,RolesRoutes, categoriaRoutes,productoRoutes,ordenDeProduccionRoutes,pedidoRoutes,usuarioRoutes);

module.exports = app;