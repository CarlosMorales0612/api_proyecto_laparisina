const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(bodyParser.json());

// Conectar las rutas
app.use('/api', usuarioRoutes);

module.exports = app;