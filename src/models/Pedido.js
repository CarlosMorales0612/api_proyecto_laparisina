const mongoose = require('mongoose');

const detallePedidoSchema = new mongoose.Schema({
  fecha_pedido_tomado: String,
  nombre_categoria_producto: String,
  nombre_producto: String,
  cantidad_producto: Number,
  precio_producto_unitario: Number,
  iva_producto: Number,
  precio_producto_subtotal: Number,
  metodo_pago: String, // Puede ser 'Efectivo' o 'Transferencia'
});

const pedidoSchema = new mongoose.Schema({
  codigo_cliente: String,
  nombre_cliente: String,
  telefono_cliente: String,
  quien_recibe: String,
  direccion_entrega: String,
  edificio_apto_barrio: String,
  ciudad: String,
  precio_producto_total: Number,
  fecha_entrega_pedido: String,
  estado_pedido: String, // Puede ser uno de los estados que mencionaste
  detalle_pedido: [detallePedidoSchema], // Un array de objetos de detalle de pedido
});

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;
