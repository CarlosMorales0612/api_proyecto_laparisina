// Importamos el modelo de Pedido
const Pedido = require('../models/Pedido'); // Asegúramos de proporcionar la ruta correcta al archivo Pedido.js

// Realizar una consulta para obtener los pedidos con estado "entregado"
Pedido.find({ estado_pedido: 'entregado' }, (err, pedidos) => {
  if (err) {
    console.error('Error al buscar los pedidos:', err);
  } else {
    console.log('Pedidos entregados:', pedidos);
  }
});
