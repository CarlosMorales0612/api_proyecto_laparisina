const Pedido = require('../models/Pedido'); // Asegúramos de proporcionar la ruta correcta al archivo Pedido.js

// Realizar una consulta para obtener los pedidos con estado "entregado"
async function getVentas(req, res) {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado_pedido: 'Entregado' };

    const [total, ventas] = await Promise.all([
      Pedido.countDocuments(query),
      Pedido.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ])
    res.json({
      total,
      ventas
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ventas.' });
  }
}

// Obtener una venta por ID
async function getVentaById(req, res) {
  const { id } = req.params;
  try {
    const venta = await Pedido.findOne({ _id: id, estado_pedido: 'Tomado' });

    if (!venta) {
      return res.status(404).json({ error: 'Pedido no encontrado o no está "Entregado".' });
    }

    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la venta.' });
  }
}


module.exports = {
  getVentas,
  getVentaById
}
