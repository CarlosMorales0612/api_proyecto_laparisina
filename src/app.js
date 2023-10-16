const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pedidoRoutes = require('./routes/pedidoRoutes');

app.use(bodyParser.json());

// Conectar las rutas
app.use('/api', pedidoRoutes);

module.exports = app;