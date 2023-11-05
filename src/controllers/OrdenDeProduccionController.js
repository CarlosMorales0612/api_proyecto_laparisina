const OrdenProduccion = require('../models/Pedido');

// Obtener todas las ordenes de producción ---------------------------------------------------------------------------------------------------
async function obtenerOrdenesDeProduccion(req, res) {
  try {
    // // Obtener la fecha actual
    // const fechaHoy = new Date();
    // fechaHoy.setHours(0, 0, 0, 0); // Configura la hora a 00:00:00:000 para comparar solo la fecha

    // Buscar pedidos con fecha_entrega_pedido igual a la fecha de hoy
    const pedidos = await OrdenProduccion.find({
      fecha_entrega_pedido: obtenerFechaActualString() // Usa la función auxiliar para obtener la fecha actual en el formato "dia/mes/año"
    });

    // Objeto para almacenar la orden de producción consolidada
    const ordenDeProduccion = {};

    // Iterar sobre los pedidos encontrados
    pedidos.forEach(pedido => {
      // Iterar sobre los detalles del pedido
      pedido.detalle_pedido.forEach(detalle => {
        // Construir una clave única para cada producto basado en nombre y categoría
        const claveProducto = `${detalle.nombre_producto}-${detalle.nombre_categoria_producto}`;

        // Si el producto ya está en la orden de producción, suma la cantidad
        if (ordenDeProduccion[claveProducto]) {
          ordenDeProduccion[claveProducto].cantidad += detalle.cantidad_producto;
        } else {
          // Si el producto no está en la orden de producción, agrégalo
          ordenDeProduccion[claveProducto] = {
            nombre_producto: detalle.nombre_producto,
            nombre_categoria_producto: detalle.nombre_categoria_producto,
            cantidad: detalle.cantidad_producto,
            estado: detalle.estado_producto
          };
        }
      });
    });

    // Convertir el objeto de orden de producción en un array para enviarlo como respuesta
    const ordenDeProduccionArray = Object.values(ordenDeProduccion);

    // Enviar la orden de producción consolidada como respuesta
    res.status(200).json({ ordenDeProduccion: ordenDeProduccionArray });
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las ordenes de producción.' });
  }
}

// Función auxiliar para obtener la fecha actual en el formato "dia/mes/año"
function obtenerFechaActualString() {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0
  const año = fecha.getFullYear();

  return `${dia}/${mes}/${año}`;
}

module.exports = {
  obtenerOrdenesDeProduccion
};



