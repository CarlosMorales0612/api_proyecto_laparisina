const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({

  empleado_id: {
    type: mongoose.Schema.Types.ObjectId,
  },

  documento_cliente: {
    type: String,
    required: [true, 'El campo documento es requerido.'],
  },
  tipo_cliente: {
    type: String,
    required: [true, 'El campo tipo cliente es requerido.'],
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
  },
  direccion_entrega: {
    type: String,
    required: [true, 'El campo direccion entrega es requerido.']
  },
  ciudad_cliente: {
    type: String,
    required: [true, 'El campo ciudad es requerido.']
  },
  barrio_cliente: {
    type: String,
    required: [true, 'El campo barrio es requerido.']
  },
  fecha_entrega_pedido: {
    type: String,
    required: [true, 'El campo fecha entrega pedido es requerido.']
  },
  fecha_pedido_tomado: {
    type: String,
  },

  estado_pedido: {
    type: String,
    required: true,
    enum: ['Pendiente','Tomado','En producción', 'En preparación', 'Terminado', 'Enviado', 'Entregado', 'Anulado'],
    default: 'Pendiente'
  },

  precio_total_venta: {
    type: Number,
    required: [true, 'El campo precio total venta es requerido.']
  },
  subtotal_venta: {
    type: Number,
    required: [true, 'El campo subtotal es requerido.']
  },
  metodo_pago: {
    type: String,
    enum: ['Efectivo', 'Transferencia'],
    required: [true, 'El campo metodo pago es requerido.']
  },
  valor_domicilio: {
    type: Number,
    required: [true, 'El campo valor Domicilio es requerido.']
  },
  correo_domiciliario: {
    type: String
  },
  nit_empresa_cliente: {
    type: String,
  },
  estado_pago:{
    type: String
  },
  nombre_juridico: {
    type: String,
  },
  aumento_empresa: {
    type: Number,
    
  },
  nombre_domiciliario:{
    type: String,
  },
  tipo_entrega:{
    type: String,
  },

  detalle_pedido: [
    {
      nombre_producto: {
        type: String,
        required: [true, 'El campo nombre producto es requerido.']
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
      precio_por_mayor_ico:{
        type: Number,
        required: [true, 'El campo precio ico es requerido.']
      },
      precio_total_producto: {
        type: Number,
        required: [true, 'El campo precio total_producto es requerido.']
      },
     
    }
  ]
});

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;
