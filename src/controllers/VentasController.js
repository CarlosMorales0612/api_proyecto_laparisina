const Pedido = require('../models/Pedido'); // Asegúramos de proporcionar la ruta correcta al archivo Pedido.js
const exceljs = require('exceljs');

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

const ventasGetExcel = async (req, res = response) => {
  try {
    const query = { estado_pedido: 'Entregado' };
    const ventas = await Pedido.find(query);

    if (!ventas || ventas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron ventas' });
    }

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Ventas');

    const columnas = [
      'Documento Cliente',
      'Tipo Cliente',
      'Nombre Contacto',
      'Teléfono Cliente',
      'Quién Recibe',
      'Dirección Entrega',
      'Ciudad Cliente',
      'Barrio Cliente',
      'Fecha Entrega Pedido',
      'Estado Pedido',
      'Precio Total Venta',
      'Subtotal Venta',
      'Método de Pago',
      'Valor Domicilio',
      'Correo Domiciliario',
      'NIT Empresa Cliente',
      'Nombre Jurídico',
      'Aumento Empresa',
      'Nombre Domiciliario',
      // Columnas para los detalles del pedido
      'Nombre Producto 1',
      'Cantidad Producto 1',
      'Estado Producto 1',
      'Precio ICO Producto 1',
      'Precio Por Mayor ICO Producto 1',
      'Precio Total Producto 1',
      'Nombre Producto 2',
      'Cantidad Producto 2',
      'Estado Producto 2',
      'Precio ICO Producto 2',
      'Precio Por Mayor ICO Producto 2',
      'Precio Total Producto 2',
      // Asegúrate de ajustar y agregar más columnas si hay más detalles esperados
    ];
    worksheet.addRow(columnas);

    ventas.forEach(venta => {
      const datosVenta = [
        venta.documento_cliente,
        venta.tipo_cliente,
        venta.nombre_contacto,
        venta.telefono_cliente,
        venta.quien_recibe,
        venta.direccion_entrega,
        venta.ciudad_cliente,
        venta.barrio_cliente,
        venta.fecha_entrega_pedido,
        venta.estado_pedido,
        venta.precio_total_venta,
        venta.subtotal_venta,
        venta.metodo_pago,
        venta.valor_domicilio,
        venta.correo_domiciliario,
        venta.nit_empresa_cliente,
        venta.nombre_juridico,
        venta.aumento_empresa,
        venta.nombre_domiciliario,
        // Datos de la venta

        // Detalles del primer producto
        (venta.detalle_pedido[0] || {}).nombre_producto || '',
        (venta.detalle_pedido[0] || {}).cantidad_producto || '',
        (venta.detalle_pedido[0] || {}).estado_producto || '',
        (venta.detalle_pedido[0] || {}).precio_ico || '',
        (venta.detalle_pedido[0] || {}).precio_por_mayor_ico || '',
        (venta.detalle_pedido[0] || {}).precio_total_producto || '',

        // Detalles del segundo producto
        (venta.detalle_pedido[1] || {}).nombre_producto || '',
        (venta.detalle_pedido[1] || {}).cantidad_producto || '',
        (venta.detalle_pedido[1] || {}).estado_producto || '',
        (venta.detalle_pedido[1] || {}).precio_ico || '',
        (venta.detalle_pedido[1] || {}).precio_por_mayor_ico || '',
        (venta.detalle_pedido[1] || {}).precio_total_producto || '',
        // Asegúrate de ajustar para manejar más detalles si son posibles
      ];

      worksheet.addRow(datosVenta);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=ventas.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};



// //Funcion para el excel-------------------------------------------------------------------------------------------------------------------------
// const ventaGetexcel = async (req, res = response) => {
//   try {
//     const query = { estado_pedido: 'Entregado' };

//     const ventas = await Pedido.find(query);

//     if (!ventas || ventas.length === 0) {
//       return res.status(404).json({ message: 'No se encontraron ventas' });
//     }

//     // Crear un libro de Excel
//     const workbook = new exceljs.Workbook();
//     const worksheet = workbook.addWorksheet('Ventas');

//     // Agregar información de la venta al archivo Excel
//     // Crear una fila con los nombres de las columnas
//     const columnas = ['Documento cliente', 'tipo_cliente', 'nombre_contacto','telefono_cliente', 'quien_recibe','direccion_entrega', 'ciudad_cliente', 'barrio_cliente', 'fecha_entrega_pedido', 'fecha_pedido_tomado', 'precio_total_venta', 'subtotal_venta', 'metodo_pago', 'valor_domicilio', 'correo_domiciliario', 'nit_empresa_cliente', 'nombre_juridic', 'aumento_empresa', 'detalle_pedido'];
//     worksheet.addRow(columnas);

//     // Agregar información del cliente al archivo Excel
//     clientes.forEach(cliente => {
//       const estadoCliente = cliente.estado_cliente ? 'activo' : 'inactivo';
//       const datosCliente = [
//       cliente.documento_cliente,
//       cliente.tipo_cliente,
//       cliente.nombre_juridico,
//       cliente.nit_empresa_cliente,
//       cliente.numero_documento_cliente,
//       cliente.telefono_cliente,
//       cliente.ciudad_cliente,
//       cliente.barrio_cliente,
//       cliente.direccion_cliente,
//       cliente.correo_cliente,
//       estadoCliente
//     ];
//     worksheet.addRow(datosCliente);
//   });

//     // Configurar la respuesta HTTP para descargar el archivo
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=cliente.xlsx');

//     // Enviar el archivo Excel al cliente
//     await workbook.xlsx.write(res);

//     res.end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error en el servidor' });
//   }
// }

module.exports = {
  getVentas,
  getVentaById,
  ventasGetExcel
}
