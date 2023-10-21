const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const categoriaRoutes = require('./routes/categoriaRoutes');
const productoRoutes = require('./routes/productoRoutes')
const cors = require('cors')
const multer = require('multer')
const sharp = require('sharp')

app.use(cors())

app.use(bodyParser.json());

app.use(express.static('uploads'))
// Conectar las rutas
app.use('/api', categoriaRoutes,productoRoutes);

module.exports = app;