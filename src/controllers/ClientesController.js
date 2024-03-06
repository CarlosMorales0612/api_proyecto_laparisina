const exceljs = require('exceljs');
const mongoose = require('mongoose');
const Clientes = require('../models/ClientesModel');
const ExcelJS = require('exceljs');
const Usuario = require('../models/Usuario');


// Obtener todos los clientes -------------------------------------------------------------------------------------------------------------
async function obtenerTodosLosClientes(req, res) {
  const{numero_documento_cliente}= req.query 
  try {
    const clientes = await Clientes.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes.' });
  }
}

// Obtener un cliente por ID --------------------------------------------------------------------------------------------------------------
async function obtenerClientePorId(req, res) {
  const { id } = req.params;
  try {
    const clientes = await Clientes.findById(id);
    if (!clientes) {
      return res.status(404).json({ error: 'Cliente no encontrada.' });
    }
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente.' });
  }
}
// Obtener un cliente por documento --------------------------------------------------------------------------------------------------------------
async function obtenerClientePorDocumento(req, res) {
  const { numero_documento_cliente } = req.params;
  try {
    const clientes = await Clientes.findOne({ numero_documento_cliente: numero_documento_cliente });
    if (!clientes) {
      return res.status(404).json({ error: 'Cliente no encontrada.' });
    }
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el cliente.' });
  }
}

 async function obtenerClientePorCorreo (req, res) {
  const { correo_cliente } = req.params;
  try {
    const cliente = await Clientes.findOne({ correo_cliente: correo_cliente });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrada.' });
    }
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el cliente.' });
  }
}

// Crear un nuevo cliente-----------------------------------------------------------------------------------------------------------------
 async function crearCliente(req, res) {
  const {tipo_cliente,nombre_contacto,nombre_juridico,numero_documento_cliente,nit_empresa_cliente,correo_cliente,telefono_cliente,direccion_cliente,barrio_cliente,ciudad_cliente, estado_cliente} = req.body

  //Expresión regular para validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
  const letrasExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,100}$/;
  const longitudMaximaLetras = 100;



  // Expresión regular para validar documento, celular
  const numerosExpReg = /^[0-9]{7,10}$/;
  const longitudMaximaNumeros = 10;

  // Expresión regular para validar el correo
  const correoExpReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  //Expresión regular para validar la dirección 
  const direccionExpReg = /^[A-Za-z0-9\s,.'#-]+$/;


 //Validación de los campos validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
  if (!letrasExpReg.test(tipo_cliente)){
    return res.status(400).json({ error: 'El campo tipo de cliente solo   permite letras.' });
  }
  if (tipo_cliente.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo tipo de cliente debe tener máximo 20 caracteres.' });
  }
  if (!letrasExpReg.test(nombre_contacto)){
    return res.status(400).json({ error: 'El campo nombre de contacto solo   permite letras.' });
  }
  if (nombre_contacto.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo nombre de contacto debe tener máximo 20 caracteres.' });
  }

  if (!letrasExpReg.test(barrio_cliente)){
    return res.status(400).json({ error: 'El campo barrio solo   permite letras.' });
  }
  if (barrio_cliente.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo barrio debe tener máximo 20 caracteres.' });
  }
  if (!letrasExpReg.test(ciudad_cliente)){
    return res.status(400).json({ error: 'El campo ciudad solo   permite letras.' });
  }
  if (ciudad_cliente.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo ciudad debe tener máximo 20 caracteres.' });
  }

  //Validación campo documento, celular
  if (!numerosExpReg.test(numero_documento_cliente)){
    return res.status(400).json({ error: 'El campo número de documento solo   permite números.' });
  }
  if (numero_documento_cliente.length > longitudMaximaNumeros) {
    return res.status(400).json({ error: 'El campo número de documento debe tener máximo 10 caracteres.' });
  }

  if (!numerosExpReg.test(telefono_cliente)){
    return res.status(400).json({ error: 'El campo celular solo   permite números.' });
  }
  if (telefono_cliente.length > longitudMaximaNumeros) {
    return res.status(400).json({ error: 'El campo celular debe tener máximo 10 caracteres.' });
  }

  //Validación campo correo
  if (!correoExpReg.test(correo_cliente)){
    return res.status(400).json({ error: 'Formato de correo invalida.' });
  }

  //Validación campo dirección 
  if (!direccionExpReg.test(direccion_cliente)){
    return res.status(400).json({ error: 'Formato de dirección invalida.' });
  }

  const body = req.body //Captura de atributos
  let mensaje = ''
  console.log(body)

  try {
    const ClienteModel = mongoose.model('Clientes');
    const cliente = new ClienteModel(body);
    await cliente.save();
    mensaje = 'La inserción se realizó exitosamente'
  } catch (error) {
        if(error.name === 'ValidationError'){
            console.error(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        } else {
            console.error('Ocurrió un error al guardar el cliente:', error.message);
            mensaje = 'Ocurrió un error al guardar  el cliente';
        }
  }

  res.json({
    msg: mensaje
  })
}

// Actualizar una cliente por ID -----------------------------------------------------------------------------------------------------------
async function actualizarCliente(req, res) {
  const { id } = req.params;
  const {tipo_cliente,nombre_contacto,nombre_juridico,numero_documento_cliente,nit_empresa_cliente,correo_cliente,telefono_cliente,direccion_cliente,barrio_cliente,ciudad_cliente, estado_cliente} = req.body;
   
   //Expresión regular para validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
   const letrasExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,100}$/;
   const longitudMaximaLetras = 100;

   // Expresión regular para validar documento, celular
   const numerosExpReg = /^[0-9]{7,10}$/;
   const longitudMaximaNumeros = 10;
 
   // Expresión regular para validar el correo
   const correoExpReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
 
   //Expresión regular para validar la dirección 
   const direccionExpReg = /^[A-Za-z0-9\s,.'#-]+$/;
 
  
  //Validación de los campos validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
   if (!letrasExpReg.test(tipo_cliente)){
     return res.status(400).json({ error: 'El campo tipo de cliente solo   permite letras.' });
   }
   if (tipo_cliente.length > longitudMaximaLetras) {
     return res.status(400).json({ error: 'El campo tipo de cliente debe tener máximo 20 caracteres.' });
   }
   if (!letrasExpReg.test(nombre_contacto)){
     return res.status(400).json({ error: 'El campo nombre de contacto solo   permite letras.' });
   }
   if (nombre_contacto.length > longitudMaximaLetras) {
     return res.status(400).json({ error: 'El campo nombre de contacto debe tener máximo 20 caracteres.' });
   }
   if (!letrasExpReg.test(barrio_cliente)){
     return res.status(400).json({ error: 'El campo barrio solo   permite letras.' });
   }
   if (barrio_cliente.length > longitudMaximaLetras) {
     return res.status(400).json({ error: 'El campo barrio debe tener máximo 20 caracteres.' });
   }
   if (!letrasExpReg.test(ciudad_cliente)){
     return res.status(400).json({ error: 'El campo ciudad solo   permite letras.' });
   }
   if (ciudad_cliente.length > longitudMaximaLetras) {
     return res.status(400).json({ error: 'El campo ciudad debe tener máximo 20 caracteres.' });
   }
 
   //Validación campo documento, celular
   if (!numerosExpReg.test(numero_documento_cliente)){
     return res.status(400).json({ error: 'El campo número de documento solo   permite números.' });
   }
   if (numero_documento_cliente.length > longitudMaximaNumeros) {
     return res.status(400).json({ error: 'El campo número de documento debe tener máximo 10 caracteres.' });
   }
 
   if (!numerosExpReg.test(telefono_cliente)){
     return res.status(400).json({ error: 'El campo celular solo   permite números.' });
   }
   if (telefono_cliente.length > longitudMaximaNumeros) {
     return res.status(400).json({ error: 'El campo celular debe tener máximo 10 caracteres.' });
   }
 
   //Validación campo correo
   if (!correoExpReg.test(correo_cliente)){
     return res.status(400).json({ error: 'Formato de correo invalido.' });
   }
 
   //Validación campo dirección 
   if (!direccionExpReg.test(direccion_cliente)){
     return res.status(400).json({ error: 'Formato de dirección invalida.' });
   }


   try {
    let actualizarCliente = req.body;
    // Realiza la actualización en la base de datos
    const clienteActualizado = await Clientes.findByIdAndUpdate(id, actualizarCliente, { new: true });

    // Verifica si el cliente fue encontrada y actualizada correctamente
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }
    
    // Si el cliente se actualiza exitosamente, envía un mensaje de éxito en la respuesta
    res.status(200).json({ message: 'Cliente actualizado exitosamente.', clientes: clienteActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cliente.' });
  }
}

// Eliminar una cliente por ID -------------------------------------------------------------------------------------------------------------
async function eliminarCliente(req, res) {
  const { id } = req.params;
  try {
    const clientes = await Clientes.findByIdAndDelete(id);
    if (!clientes) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }
    res.status(200).json({ message: 'Cliente eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cliente.' });
  }
}
// Cambiar el estado de un cliente por ID------------------------------------------------------------------------------------------------------------
async function cambiarEstadoCliente(req, res) {
  const { id } = req.params;

  try {
    const verificarEstado = await Clientes.findById(id);

    if (!verificarEstado) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }

    const correoCliente = verificarEstado.correo_cliente;
    const nuevoEstadoCliente = !verificarEstado.estado_cliente;

    //Buscar usuario con el mismo correo
    const correoRelacionado = await Usuario.find({
        correo_electronico: correoCliente,
    });

    //Actualizar el estado del usuario encontrado
    await Usuario.findOneAndUpdate(
      { correo_electronico: correoCliente},
      { $set: { estado_usuario: nuevoEstadoCliente } }
    );

    //Cambiar el estado del cliente
    const clientes = await Clientes.findByIdAndUpdate(
      id,
      { $set: { estado_cliente: nuevoEstadoCliente } },
      { new: true }
    );

    res.status(200).json({ message: 'Estado del cliente cambiado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado del cliente y su usuario.' });
  }
}

//Funcion para el excel-------------------------------------------------------------------------------------------------------------------------
const clienteGetexcel = async (req, res = response) => {
  try {
    const clientes = await Clientes.find();

    if (!clientes || clientes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron clientes' });
    }

    // Crear un libro de Excel
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Clientes');

    // Agregar información del cliente al archivo Excel
    // Crear una fila con los nombres de las columnas
    const columnas = ['Tipo cliente', 'Nombre de contacto', 'Nombre juridico','NIT', 'Número de cedula','Número de celular', 'Ciudad', 'Barrio', 'Dirección', 'Correo electrónico', 'Estado'];
    worksheet.addRow(columnas);

    // Agregar información del cliente al archivo Excel
    clientes.forEach(cliente => {
      const estadoCliente = cliente.estado_cliente ? 'activo' : 'inactivo';
      const datosCliente = [
      cliente.tipo_cliente,
      cliente.nombre_contacto,
      cliente.nombre_juridico,
      cliente.nit_empresa_cliente,
      cliente.numero_documento_cliente,
      cliente.telefono_cliente,
      cliente.ciudad_cliente,
      cliente.barrio_cliente,
      cliente.direccion_cliente,
      cliente.correo_cliente,
      estadoCliente
    ];
    worksheet.addRow(datosCliente);
  });

    // Configurar la respuesta HTTP para descargar el archivo
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=cliente.xlsx');

    // Enviar el archivo Excel al cliente
    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

//Exportar funciones -------------------------------------------------------------------------------------------------------------------------
module.exports = {
  obtenerTodosLosClientes,
  obtenerClientePorId,
  obtenerClientePorDocumento,
  obtenerClientePorCorreo,
  crearCliente,
  actualizarCliente,
  cambiarEstadoCliente,
  eliminarCliente,
  clienteGetexcel,
  obtenerClientePorCorreo
};