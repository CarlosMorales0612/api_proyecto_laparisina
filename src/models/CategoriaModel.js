const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  
    nombre_categoria_producto: {
        type: String,
        required: [true],
        unique: [true]
    },

    descripcion_categoria_producto: {
        type: String,
        required: true,
    },

    imagen_categoria_producto: {
    type: String,
    },

    estado_categoria_producto: {
        type: Boolean,
        required: true,
        default: true
    }

});

const CategoriaProducto = mongoose.model('Categoria_producto', CategoriaSchema);

module.exports = CategoriaProducto;
