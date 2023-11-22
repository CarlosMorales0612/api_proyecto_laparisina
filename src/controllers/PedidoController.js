const Pedido = require('../models/Pedido');
const Cliente = require('../models/ClientesModel');

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
     // Validar que el campo 'nombre_cliente' solo contenga letras
    //  if (!/^[A-Za-z\s]+$/.test(pedidoData.quien_recibe)) {
    //   return res.status(400).json({ error: 'El nombre del Quien recibe solo debe contener letras.' });
    // }
      // Validar que el campo 'telefono_cliente' solo contenga números
    if (!/^\d+$/.test(pedidoData.telefono_cliente)) {
      return res.status(400).json({ error: 'El teléfono solo debe contener números.' });
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
// async function updatePedido(req, res) {
//   const { id } = req.params;
//   const { nuevoEstado } = req.body; // El nuevo estado se espera en el cuerpo de la solicitud

//   // información sobre el rol del usuario autenticado
//   const usuarioAutenticado = req.user;

//   try {
//     const pedido = await Pedido.findById(id);
//     if (!pedido) {
//       return res.status(404).json({ error: 'Pedido no encontrado.' });
//     }

//     // Validar que el nuevo estado sea válido (debe estar en la lista de estados permitidos)
//     const estadosPermitidos = ['tomado', 'preparacion', 'terminado', 'asignado', 'enviado', 'entregado', 'anulado'];

//     // Verificar que el usuario tenga permiso para cambiar el estado del pedido
//     if (
//       usuarioAutenticado.rol === 'empleado' || usuarioAutenticado.rol === 'administrador' ||
//       (usuarioAutenticado.rol === 'domiciliario' && pedido.estado_pedido === 'Asignado' && nuevoEstado === 'Cancelado')
//     ) {
//       if (!estadosPermitidos.includes(nuevoEstado)) {
//         return res.status(400).json({ error: 'Estado no válido.' });
//       }

//       pedido.estado_pedido = nuevoEstado; // Actualizar el estado del pedido
//       await pedido.save();

//       res.json({ message: 'El estado del pedido se actualizó exitosamente.', pedido });
//     } else {
//       return res.status(403).json({ error: 'No tienes permiso para cambiar el estado del pedido.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al modificar el estado del pedido.' });
//   }
// }
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





module.exports = {
  getAllPedido,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
};