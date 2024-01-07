const Pedido = require('../models/Pedido');
const Empleado = require ('../models/empleado')

// Obtener todos los pedidos
async function getAllPedido(req, res) {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    console.log(error)
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
    const pedidoData = req.body;

    pedidoData.fecha_pedido_tomado = new Date().toISOString().split('T')[0]

    // Validar que el campo 'nombre_cliente' solo contenga letras
    if (!/^[A-Za-z\s]+$/.test(pedidoData.nombre_cliente)) {
      return res.status(400).json({ error: 'El nombre del cliente solo debe contener letras.' });
    }
  

    // Validar que el pedido tenga al menos un producto en el detalle_pedido
    if (!pedidoData.detalle_pedido || pedidoData.detalle_pedido.length === 0) {
      return res.status(400).json({ error: 'Debes agregar al menos un producto al pedido.' });
    }

    // Validar que la cantidad del producto sea un número entero no negativo
    if (pedidoData.detalle_pedido && pedidoData.detalle_pedido.length > 0) {
      for (const producto of pedidoData.detalle_pedido) {
        if (!/^\d+$/.test(producto.cantidad_producto) || producto.cantidad_producto < 0) {
          return res.status(400).json({ error: 'La cantidad del producto debe ser un número entero no negativo.' });
        }
      }
    }
    const nuevoPedido = new Pedido(pedidoData);
    await nuevoPedido.save();

    res.status(201).json({ message: 'Pedido creado exitosamente', pedido: nuevoPedido });
  } catch (error) {
      res.status(500).json({ error: 'Error al crear el pedido.', error });
  }
}
 

// Modificar el estado de un pedido por su ID
async function updatePedido(req, res) {
  const { id } = req.params;
  const { estado_pedido } = req.body;

  try {
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    pedido.estado_pedido = estado_pedido;
    await pedido.save();

    res.json({ message: 'El estado del pedido se actualizó exitosamente.', pedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al modificar el estado del pedido.' });
  }
}


// Eliminar un pedido por su ID
async function deletePedido(req, res) {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    await Pedido.deleteOne({ _id: id });

    res.json({ message: 'Pedido eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido.' });
  }
}

// Obtener pedidos pendientes
async function getPedidosPendientes(req, res) {
  try {
    const pedidosPendientes = await Pedido.find({ estado_pedido: { $in: ['Pendiente', 'Tomado'] } });
    res.json(pedidosPendientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos pendientes.' });
  }
}

// Obtener pedidos terminados
async function getPedidosTerminados(req, res) {
  try {
    const pedidosTerminados = await Pedido.find({ estado_pedido: 'Terminado' });
    res.json(pedidosTerminados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos terminados.' });
  }
}

// Obtener pedidos Anulados
async function getPedidosAnulados(req, res) {
  try {
    const pedidosAnulados = await Pedido.find({ estado_pedido: 'Anulado' });
    res.json(pedidosAnulados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos anulados.' });
  }
}

// Obtener pedidos Enviados
async function getPedidosEnviados(req, res) {
  try {
    const pedidosEnviados = await Pedido.find({ estado_pedido: 'Enviado' });
    res.json(pedidosEnviados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos enviados.' });
  }
}

async function asignarDomiciliarioAPedido(req, res) {
  const { id_pedido, id_empleado_domiciliario } = req.body;

  try {
    const pedido = await Pedido.findById(id_pedido);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    // Validar que el empleado exista y sea un domiciliario
    const empleadoDomiciliario = await Empleado.findById(id_empleado_domiciliario);

    if (!empleadoDomiciliario) {
      return res.status(404).json({ error: 'Domiciliario no encontrado.' });
    }

    // Puedes agregar una verificación adicional para asegurarte de que el empleado es un domiciliario
    if (empleadoDomiciliario.tipo_empleado !== 'Domiciliario') {
      return res.status(400).json({ error: 'El empleado no es un domiciliario.' });
    }

    console.log("AQUIIIIII",empleadoDomiciliario);

    // Asignar el domiciliario al pedido
    pedido.empleado_id = empleadoDomiciliario._id;
    pedido.correo_domiciliario =empleadoDomiciliario.correo_empleado;

    await pedido.save();

    res.json({ message: 'Domiciliario asignado al pedido exitosamente.', pedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al asignar domiciliario al pedido.' });
  }
}


module.exports = {
  getAllPedido,
  getPedidoById,
  getPedidosPendientes,
  getPedidosTerminados,
  getPedidosAnulados,
  getPedidosEnviados,
  createPedido,
  updatePedido,
  deletePedido,
  asignarDomiciliarioAPedido
 
};