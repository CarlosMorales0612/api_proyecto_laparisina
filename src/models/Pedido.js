const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({

  documento_cliente: {
    type: String,
    required: [true, 'El campo código_cliente es requerido.'],
  },
  
   nombre_contacto: {
    type: String,
    required: [true, 'El campo nombre cliente es requerido.']
  },

  telefono_cliente: {
    type: String,
    required: [true, 'El campo telefono cliente es requerido.']
  },
  quien_recibe: {
    type: String,
    required: [true, 'El campo quien recibe es requerido.']
  },
  direccion_entrega: {
    type: String,
    required: [true, 'El campo direccion entrega es requerido.']
  },
  edificio_apto_barrio: {
    type: String,
    required: [true, 'El campo edificio apto barrio es requerido.']
  },
  ciudad_cliente: {
    type: String,
    required: [true, 'El campo ciudad es requerido.']
  },
  ciudad_barrio: {
    type: String,
    required: [true, 'El campo ciudad es requerido.']
  },
  fecha_entrega_pedido: {
    type: String,
    //required: [true, 'El campo fecha entrega pedido es requerido.']
  },
  estado_pedido: {
    type: String,
    required: true,
    enum: ['Pendiente', 'Tomado', 'Preparacion', 'Terminado', 'Asignado', 'Enviado', 'Entregado', 'Anulado'],
    default: ['Pendiente']
  },
  precio_total_venta: {
    type: Number,
    required: [true, 'El campo precio total venta es requerido.']
  },
  metodo_pago: {
    type: String,
    enum: ['Efectivo', 'Transferencia'],
    required: [true, 'El campo metodo pago es requerido.']
  },
  detalle_pedido: [
    {
      nombre_producto: {
        type: String,
        required: [true, 'El campo nombre producto es requerido.']
      },
      nombre_categoria_producto: {
        type: String,
        required: [true, 'El campo nombre categoria producto es requerido.']
      },
      fecha_pedido_tomado: {
        type: String,
        required: [true, 'El campo fecha pedido tomado es requerido.']
      },
      cantidad_producto: {
        type: Number,
        required: [true, 'El campo cantidad producto es requerido.'],
      },
      estado_producto: {
        type: String,
        default: 'Tomado', // Establecer "tomado" como valor por defecto
      },
      precio_ico: {
        type: Number,
        required: [true, 'El campo precio ico es requerido.']
      },
      precio_total_producto: {
        type: Number,
        required: [true, 'El campo precio total_producto es requerido.']
      }

    }
  ]
});

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;