const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({

    codigo_producto: {
        type: String,
        required: true,
        unique: [true]
    },
  
    nombre_producto: {
        type: String,
        required: [true],
        unique: [true]
    },

   nombre_categoria_producto: {
        type: String,
        required: true,
    },

    descripcion_producto: {
        type: String,
        required: true,
    },

    precio_ico: {
        type: Number,
        required: true,
    },

    precio_por_mayor_ico: {
        type: Number,
        required: true,
    },

    durabilidad_producto: {
        type: String,
        required: true,
    },

    ingredientes_producto: {
        type: String,
        required: true,
    },

    imagen_producto: {
    type: String,
    },

    estado_producto: {
        type: Boolean,
        required: true,
        default: true
    }

});

const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = Producto;
