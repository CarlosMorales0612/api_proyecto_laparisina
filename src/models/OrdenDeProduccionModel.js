const mongoose = require('mongoose');

const OrdenDeProduccionSchema = new mongoose.Schema({
  
    nombre_area: {
        type: String,
        required: [true],
    },

    nombre_producto: {
        type: String,
        required: true,
    },

    cantidad_producto: {
    type: Number,
    require: true,
    },

    fecha_actualizacion_estado: {
        type: String,
        required: true,
      },

    fecha_entrega_pedido: {
        type: String,
        required: true,
      },

    estado_orden: {
        type: String,
        required: true,
    },

    pedidos_orden: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido', // Aquí debes poner el nombre del modelo de Pedido
        required: true
      }
    ]
    

});

const OrdenDeProduccion = mongoose.model('Orden_de_produccion', OrdenDeProduccionSchema);

module.exports = OrdenDeProduccion;