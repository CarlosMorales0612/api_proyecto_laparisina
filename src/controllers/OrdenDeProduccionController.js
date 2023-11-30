// const OrdenProduccion = require('../models/Pedido');
const OrdenDeProduccion = require('../models/OrdenDeProduccionModel');
const Pedido = require('../models/Pedido');
const Producto = require('../models/ProductoModel');

// Función para obtener la fecha actual en el formato "dia/mes/año" sin hora y con hora ----------------------------------------------------
function obtenerFechaActual() {
  const fecha = new Date();
  fecha.setDate(fecha.getDate());
  const fechaFormateada = new Date(fecha).toISOString().split('T')[0];
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0
  const año = fecha.getFullYear();

  return fechaFormateada

  //return `${dia}/${mes}/${año}`;
}

function convertirFecha(fechaDate) {
  const dia = fechaDate.getDate();
  const mes = fechaDate.getMonth() + 1; // Los meses comienzan desde 0
  const año = fechaDate.getFullYear();

  return `${año}-${mes}-${dia}`;
}

function obtenerFechaActualConHoraString() {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0
  const año = fecha.getFullYear();
  const horas = fecha.getHours().toString().padStart(2, '0'); // Obtén las horas y asegúrate de que tenga 2 dígitos
  const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Obtén los minutos y asegúrate de que tenga 2 dígitos
  const segundos = fecha.getSeconds().toString().padStart(2, '0'); // Obtén los segundos y asegúrate de que tenga 2 dígitos

  return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

// Obtener todas las ordenes de producción -------------------------------------------------------------------------------------------------
async function obtenerTodasLasOrdenesDeProduccion(req, res) {
  try {
    const ordenes = await OrdenDeProduccion.find();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ordenes.' });
  }
}

// Obtener una orden de producción por ID ------------------------------------------------------------------------------------------------------------
async function obtenerOrdenDeProduccionPorId(req, res) {
  const { id } = req.params;
  try {
    const orden = await OrdenDeProduccion.findById(id);
    if (!orden) {
      return res.status(404).json({ error: 'Orden de producción no encontrada.' });
    }
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la orden de producción.' });
  }
}


async function crearOrdenDeProduccion(req, res) {
  try {
    // Obtener los IDs de los pedidos desde el cuerpo de la solicitud
    const idsPedidos = req.body.idsPedidos;
    console.log(idsPedidos)

    // Verificar si no se proporcionaron IDs de pedidos
    if (!idsPedidos || idsPedidos.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar al menos un ID de pedido para generar órdenes de producción.' });
    }

    // Obtener los detalles de los pedidos para los IDs proporcionados
    const pedidosParaHoy = await Pedido.find({
      _id: { $in: idsPedidos },
      estado_pedido: 'En produccion'
    });
    console.log(pedidosParaHoy)

    // Verificar si no hay pedidos para hoy
    if (pedidosParaHoy.length === 0) {
      return res.status(200).json({ message: 'No hay órdenes de producción pendientes.' });
    }

    // Objeto para almacenar los detalles consolidados de la orden de producción
    const detallesOrdenProduccion = {};
    //const idsPedidos = []
    const estadoOrden = 'En preparacion'

    // Iterar sobre los pedidos para consolidar los detalles de la orden de producción
    for (const pedido of pedidosParaHoy) {
      for (const detalle of pedido.detalle_pedido) {
          const producto = await Producto.findOne({ nombre_producto: detalle.nombre_producto });
          const categoriaProducto = producto.nombre_categoria_producto;
          const claveProducto = `${detalle.nombre_producto}-${categoriaProducto}`;
          if (detallesOrdenProduccion[claveProducto]) {
              // Verifica si el pedido._id no está ya en pedidos_orden
              if (!detallesOrdenProduccion[claveProducto].pedidos_orden.includes(pedido._id)) {
                  detallesOrdenProduccion[claveProducto].pedidos_orden.push(pedido._id);
              }
              // Sumar cantidad al producto de la orden si ya existe en detallesOrdenProduccion
              detallesOrdenProduccion[claveProducto].cantidad_producto += detalle.cantidad_producto;
          } else {
              detallesOrdenProduccion[claveProducto] = {
                  nombre_producto: detalle.nombre_producto,
                  nombre_categoria_producto: categoriaProducto,
                  cantidad_producto: detalle.cantidad_producto,
                  estado_orden: estadoOrden,
                  fecha_entrega_pedido: convertirFecha(pedido.fecha_entrega_pedido),
                  pedidos_orden: [pedido._id]
              };
          }
      }
      idsPedidos.push(pedido._id);
    }

    // Obtén una matriz de objetos de detallesOrdenProduccion
    const detallesArray = Object.values(detallesOrdenProduccion);

    // Guardar las nuevas órdenes de producción
    for (const x of detallesArray) {
      const nuevaOrdenProduccion = new OrdenDeProduccion({
        nombre_area: x.nombre_categoria_producto,
        nombre_producto: x.nombre_producto,
        cantidad_producto: x.cantidad_producto,
        fecha_actualizacion_estado: obtenerFechaActualConHoraString(),
        fecha_entrega_pedido: x.fecha_entrega_pedido,
        estado_orden: x.estado_orden,
        pedidos_orden: x.pedidos_orden
      });
      // Guardar la nueva orden de producción de cada producto en la base de datos
      await nuevaOrdenProduccion.save();
    }

    // Actualizar estado de pedidos y productos al mismo estado de la orden
    actualizarEstadoDePedidosOrden(idsPedidos, estadoOrden);

    res.status(201).json({ message: 'Órdenes de producción generadas exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar las órdenes de producción.' });
  }
}


//------------------------------------------------------------------------------------------------------------------------------------------
//Funcion para actualizar el estado_pedido y el estado_producto, de los pedidos con los que se genera la orden de produccion
async function actualizarEstadoDePedidosOrden(idsPedidos, nuevoEstadoProducto) {
  try {
    for (const idPedido of idsPedidos) {
      // Actualizar el estado del pedido directamente en la base de datos
      const pedido = await Pedido.findOneAndUpdate(
        { _id: idPedido },
        {
          $set: {
            estado_pedido: nuevoEstadoProducto,
            'detalle_pedido.$[].estado_producto': nuevoEstadoProducto
          }
        },
        { new: true }
      );

      if (pedido) {
        console.log(`Pedido con ID ${idPedido} actualizado.`);
      } else {
        console.log(`Pedido con ID ${idPedido} no encontrado.`);
      }
    }

    console.log('Estado de los pedidos actualizados correctamente.');
  } catch (error) {
    console.error('Error al actualizar los estados de los pedidos:', error);
  }
}

//Editar una orden de producción -----------------------------------------------------------------------------------------------------------
async function actualizarOrdenDeProduccion(req, res) {
  const { id } = req.params;
  const { estado_orden } = req.body;

  try {

    // Busca la orden de producción por ID en la base de datos
    const ordenProduccion = await OrdenDeProduccion.findById(id);

    // Verifica si la orden de producción fue encontrada
    if (!ordenProduccion) {
      return res.status(404).json({ error: 'Orden de producción no encontrada.' });
    } else {
      const idsPedidosOrden = ordenProduccion.pedidos_orden.map(pedido => pedido.toString());
      const estadoOrden = estado_orden
      const nombreProducto = ordenProduccion.nombre_producto
      console.log(nombreProducto)
      console.log(estadoOrden)
      console.log(idsPedidosOrden)

      for (const i of idsPedidosOrden){
        console.log(i)
      }
      // Realiza la actualización en la base de datos
      const ordenActualizada = await OrdenDeProduccion.findByIdAndUpdate(id, 
        { estado_orden, fecha_actualizacion_estado: obtenerFechaActualConHoraString() }, { new: true });

      actualizarEstadoDeProductos(idsPedidosOrden, nombreProducto, estadoOrden)
    }

    // Si la orden de producción se actualiza exitosamente, envía un mensaje de éxito en la respuesta
    res.status(200).json({ message: 'Orden de producción actualizada exitosamente.'});
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la orden de producción.' });
  }
}

//------------------------------------------------------------------------------------------------------------------------------------------
//Funcion para actualizar el estado_producto de los productos con los que se genera la orden de produccion 
async function actualizarEstadoDeProductos(idsPedidosOrden, nombreProducto, estadoProducto) {
  try {
    
    for (const idPedido of idsPedidosOrden) {
      // Actualizar el estado del pedido y estado_producto solo para el producto específico
      const pedidoActualizado = await Pedido.findOneAndUpdate(
        {
          _id: idPedido,
          'detalle_pedido.nombre_producto': nombreProducto
        },
        {
          $set: {
            'detalle_pedido.$[element].estado_producto': estadoProducto
          }
        },
        {
          new: true,
          arrayFilters: [{ 'element.nombre_producto': nombreProducto }]
        }
      );
      console.log(`id: ${idPedido} nombre: ${nombreProducto} estado: ${estadoProducto}`)

      actualizarEstadoPedido(idPedido)

      if (pedidoActualizado) {
        console.log(`Producto ${nombreProducto} del pedido con ID ${idPedido} actualizado.`);
      } else {
        console.log(`Producto ${nombreProducto} del pedido con ID ${idPedido} no encontrado.`);
      }
    }

    console.log('Estados de los productos actualizados correctamente.');
  } catch (error) {
    console.error('Error al actualizar los estados de los productos:', error);
    throw error;
  }
}

//------------------------------------------------------------------------------------------------------------------------------------------
//Funcion para verificar estado de todos los productos y actualizar estado_pedido en caso de que todos los estado_producto sean iguales
async function actualizarEstadoPedido(idPedido) {
  try {
    const pedido = await Pedido.findById(idPedido);

    if (!pedido) {
      return { error: 'Pedido no encontrado.' };
    }

    const estadosProductos = pedido.detalle_pedido.map(producto => producto.estado_producto);

    // Verifica si todos los estados de los productos son iguales
    const sonEstadosIguales = estadosProductos.every(estado => estado === estadosProductos[0]);

    if (sonEstadosIguales) {
      // Si todos los estados son iguales, actualiza el estado_pedido del pedido usando findByIdAndUpdate
      const estadoProducto = estadosProductos[0];
      const pedidoActualizado = await Pedido.findByIdAndUpdate(idPedido, { estado_pedido: estadoProducto }, { new: true });

      return { mensaje: 'Estado del pedido actualizado correctamente.', pedido: pedidoActualizado };
    } else {
      // Si los estados no son iguales, no se realiza ninguna acción
      return { mensaje: 'Los estados de los productos no son iguales. No se actualizó el estado del pedido.' };
    }
  } catch (error) {
    console.error(error);
    return { error: 'Ocurrió un error al actualizar el estado del pedido.' };
  }
}


//Exportar funciones -------------------------------------------------------------------------------------------------------------------------
module.exports = {
  obtenerTodasLasOrdenesDeProduccion,
  obtenerOrdenDeProduccionPorId,
  crearOrdenDeProduccion,
  actualizarOrdenDeProduccion
};



