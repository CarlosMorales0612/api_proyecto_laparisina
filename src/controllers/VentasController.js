const Pedido = require('../models/Pedido'); // Asegúramos de proporcionar la ruta correcta al archivo Pedido.js

// Realizar una consulta para obtener los pedidos con estado "entregado"
async function getVentas(req, res) {
  try {
    const query = { estado_pedido: 'Entregado' };

    const ventas = await Pedido.find(query);

    res.json({
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
    const venta = await Pedido.findOne({ _id: id, estado_pedido: 'Entregado' });

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
