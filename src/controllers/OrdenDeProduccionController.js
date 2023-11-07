// const OrdenProduccion = require('../models/Pedido');
const OrdenDeProduccion = require('../models/OrdenDeProduccionModel');
const Pedido = require('../models/Pedido');

// Función para obtener la fecha actual en el formato "dia/mes/año" sin hora y con hora ----------------------------------------------------
function obtenerFechaActualString() {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0
  const año = fecha.getFullYear();

  return `${dia}/${mes}/${año}`;
}

function obtenerFechaActualConHoraString() {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0
  const año = fecha.getFullYear();
  const horas = fecha.getHours().toString().padStart(2, '0'); // Obtén las horas y asegúrate de que tenga 2 dígitos
  const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Obtén los minutos y asegúrate de que tenga 2 dígitos
  const segundos = fecha.getSeconds().toString().padStart(2, '0'); // Obtén los segundos y asegúrate de que tenga 2 dígitos

  return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
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

// Consultar todas las ordenes de producción  basada en pedidos ----------------------------------------------------------------------------
// async function consultarOrdenesDeProduccion(req, res) {
//   try {
//     // // Obtener la fecha actual
//     // const fechaHoy = new Date();
//     // fechaHoy.setHours(0, 0, 0, 0); // Configura la hora a 00:00:00:000 para comparar solo la fecha

//     // Buscar pedidos con fecha_entrega_pedido igual a la fecha de hoy
//     const pedidos = await Pedido.find({
//       fecha_entrega_pedido: obtenerFechaActualString(), // Usa la función auxiliar para obtener la fecha actual en el formato "dia/mes/año"
//       estado_pedido: 'Tomado'
//     });

//     // Objeto para almacenar la orden de producción consolidada
//     const ordenDeProduccion = {};

//     // Iterar sobre los pedidos encontrados
//     pedidos.forEach(pedido => {
//       // Iterar sobre los detalles del pedido
//       pedido.detalle_pedido.forEach(detalle => {
//         // Construir una clave única para cada producto basado en nombre y categoría
//         const claveProducto = `${detalle.nombre_producto}-${detalle.nombre_categoria_producto}`;

//         // Si el producto ya está en la orden de producción, suma la cantidad
//         if (ordenDeProduccion[claveProducto]) {
//           ordenDeProduccion[claveProducto].cantidad += detalle.cantidad_producto;
//         } else {
//           // Si el producto no está en la orden de producción, agrégalo
//           ordenDeProduccion[claveProducto] = {
//             nombre_producto: detalle.nombre_producto,
//             nombre_categoria_producto: detalle.nombre_categoria_producto,
//             cantidad: detalle.cantidad_producto,
//             estado: detalle.estado_producto
//           };
//         }
//       });
//     });

//     // Convertir el objeto de orden de producción en un array para enviarlo como respuesta
//     const ordenDeProduccionArray = Object.values(ordenDeProduccion);

//     // Enviar la orden de producción consolidada como respuesta
//     res.status(200).json({ ordenDeProduccion: ordenDeProduccionArray });
//   } catch (error) {
//     // Manejar errores aquí
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener las ordenes de producción.' });
//   }
// }

// Crear una nueva orden de produción ------------------------------------------------------------------------------------------------------
async function crearOrdenDeProduccion(req, res) {
  try {
      
      // Obtener los pedidos para hoy en estado 'Tomado'
      const pedidosParaHoy = await Pedido.find({
          fecha_entrega_pedido: obtenerFechaActualString(),
          estado_pedido: 'Tomado'
      });

      // Objeto para almacenar los detalles consolidados de la orden de producción
      const detallesOrdenProduccion = {};
      const idsPedidos = []
      const estadoOrden = 'Pendiente en producción'

      // Iterar sobre los pedidos para consolidar los detalles de la orden de producción
      pedidosParaHoy.forEach(pedido => {
          pedido.detalle_pedido.forEach(detalle => {
              const claveProducto = `${detalle.nombre_producto}-${detalle.nombre_categoria_producto}`;
              if (detallesOrdenProduccion[claveProducto]) {
                  // Verifica si el pedido._id no está ya en pedidos_orden
                  if (!detallesOrdenProduccion[claveProducto].pedidos_orden.includes(pedido._id)) {
                    detallesOrdenProduccion[claveProducto].pedidos_orden.push(pedido._id);
                  }
                  //Sumar cantidad al producto de la orden si ya existe en detallesOrdenProduccion
                  detallesOrdenProduccion[claveProducto].cantidad_producto += detalle.cantidad_producto;
              } else {
                  detallesOrdenProduccion[claveProducto] = {
                      nombre_producto: detalle.nombre_producto,
                      nombre_categoria_producto: detalle.nombre_categoria_producto,
                      cantidad_producto: detalle.cantidad_producto,
                      estado_orden: estadoOrden,
                      fecha_entrega_pedido: pedido.fecha_entrega_pedido,
                      pedidos_orden: [pedido._id]
                  };
              }
          });
          idsPedidos.push(pedido._id);
      });

      // Obtén una matriz de objetos de detallesOrdenProduccion
      const detallesArray = Object.values(detallesOrdenProduccion);
      console.log('4-DETALLES ARRAY',detallesArray)
      console.log(idsPedidos)

      // Guardar las nuevas ordenes de producción
      // Itera sobre los objetos y crea una orden de producción para cada uno
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
      //Funcion paera actualizar estado del pedidos y los productos al mismo estado de la orden
      actualizarEstadoDePedidosOrden(idsPedidos, estadoOrden)
      res.status(201).json({ message: 'Órdenes de producción generadas exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar las ordenes de producción.' });
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
  crearOrdenDeProduccion,
  actualizarOrdenDeProduccion
};



