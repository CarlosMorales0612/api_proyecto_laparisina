const Pedido = require('../models/Pedido');

// Obtener todos los pedidos
async function getAllPedido(req, res) {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos.' });
  }
}

// Obtener un pedido por ID
async function getPedidoById(req, res) {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pedido.' });
  }
}

// Crear un nuevo pedido
async function createPedido(req, res) {
  try {
    const nuevoPedido = new Pedido(req.body); // Utiliza el cuerpo de la solicitud para crear el pedido
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el pedido.' });
  }
}

// Actualizar un pedido por ID
async function updatePedido(req, res) {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByIdAndUpdate(id, req.body, { new: true });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pedido.' });
  }
}

// Eliminar un pedido por ID
async function deletePedido(req, res) {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByIdAndDelete(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido.' });
  }
}

module.exports = {
  getAllPedido,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
};
