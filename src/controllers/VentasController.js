const Pedido = require('../models/Pedido'); // Asegúramos de proporcionar la ruta correcta al archivo Pedido.js

// Realizar una consulta para obtener los pedidos con estado "entregado"
async function getVentas(req, res) {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado_pedido: 'Entregado' };

    const [pedidos, total] = await Promise.all([
      Pedido.countDocuments(query),
      Pedido.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ])

    res.json({
      pedidos,
      total
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ventas.' });
  }
}


module.exports = {
  getVentas
}
