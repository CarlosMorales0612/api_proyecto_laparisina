const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());

// Conectar las rutas
app.use('/api', userRoutes);

module.exports = app;