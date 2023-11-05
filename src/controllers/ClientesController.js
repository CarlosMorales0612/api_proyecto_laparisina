const mongoose = require('mongoose');
const Clientes = require('../models/ClientesModel');

// Obtener todas los clientes -------------------------------------------------------------------------------------------------------------
async function obtenerTodosLosClientes(req, res) {
  const{codigo_cliente}= req.query 
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

// Crear un nuevo cliente-----------------------------------------------------------------------------------------------------------------
 async function crearCliente(req, res) {
  const {codigo_cliente,tipo_cliente,nombre_contacto,nombre_juridico,numero_documento_cliente,nit_empresa_cliente,correo_cliente,celular_cliente,direccion_cliente,barrio_cliente,ciudad_cliente, estado_cliente} = req.body

  //Expresión regular para validar el código del cliente
  const codigoExpReg = /^\d{1,6}$/;
  const longitudMaximaCodigo = 6;

  //Expresión regular para validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
  const letrasExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
  const longitudMaximaLetras = 20;

  // Expresión regular para validar el nit de la empresa
  const nitExpReg = /^[0-9,.-]+$/;
  const longitudMaximaNit = 11;

  // Expresión regular para validar documento, celular
  const numerosExpReg = /^[0-9]{7,10}$/;
  const longitudMaximaNumeros = 10;

  // Expresión regular para validar el correo
  const correoExpReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  //Expresión regular para validar la dirección 
  const direccionExpReg = /^[A-Za-z0-9\s,.'-]+$/;

  //Validación campo codigo
  if (!codigoExpReg.test(codigo_cliente)){
    return res.status(400).json({ error: 'El campo código del cliente solo   permite numeros.' });
  }
  if (codigo_cliente.length > longitudMaximaCodigo) {
    return res.status(400).json({ error: 'El campo código del cliente debe tener máximo 6 caracteres.' });
  }
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
  if (!letrasExpReg.test(nombre_juridico)){
    return res.status(400).json({ error: 'El campo nombre jurídico solo   permite letras.' });
  }
  if (nombre_juridico.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo nombre jurídico debe tener máximo 20 caracteres.' });
  }
  if (!letrasExpReg.test(barrio_cliente)){
    return res.status(400).json({ error: 'El campo nombre jurídico solo   permite letras.' });
  }
  if (barrio_cliente.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo nombre jurídico debe tener máximo 20 caracteres.' });
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
  //Validación campo nit de la empresa

  if (!nitExpReg.test(nit_empresa_cliente)){
    return res.status(400).json({ error: 'El campo nit de empresa solo   permite numeros.' });
  }
  if (nit_empresa_cliente.length > longitudMaximaNit) {
    return res.status(400).json({ error: 'El campo nit de empresa debe tener máximo 11 caracteres.' });
  }

  //Validación campo documento, celular
  if (!numerosExpReg.test(numero_documento_cliente)){
    return res.status(400).json({ error: 'El campo número de documento solo   permite números.' });
  }
  if (numero_documento_cliente.length > longitudMaximaNumeros) {
    return res.status(400).json({ error: 'El campo número de documento debe tener máximo 10 caracteres.' });
  }

  if (!numerosExpReg.test(celular_cliente)){
    return res.status(400).json({ error: 'El campo celular solo   permite números.' });
  }
  if (celular_cliente.length > longitudMaximaNumeros) {
    return res.status(400).json({ error: 'El campo celular debe tener máximo 10 caracteres.' });
  }

  //Validación campo correo
  if (!correoExpReg.test(correo_cliente)){
    return res.status(400).json({ error: 'Opción de correo invalida.' });
  }

  //Validación campo dirección 
  if (!direccionExpReg.test(direccion_cliente)){
    return res.status(400).json({ error: 'Opción de correo invalida.' });
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
  const {codigo_cliente,tipo_cliente,nombre_contacto,nombre_juridico,numero_documento_cliente,nit_empresa_cliente,correo_cliente,celular_cliente,direccion_cliente,barrio_cliente,ciudad_cliente, estado_cliente} = req.body;

   //Expresión regular para validar el código del cliente
   const codigoExpReg = /^\d{1,6}$/;
   const longitudMaximaCodigo = 6;
 
   //Expresión regular para validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
   const letrasExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
   const longitudMaximaLetras = 20;
 
   // Expresión regular para validar el nit de la empresa
   const nitExpReg = /^[0-9,.-]+$/;
   const longitudMaximaNit = 11;
 
   // Expresión regular para validar documento, celular
   const numerosExpReg = /^[0-9]{7,10}$/;
   const longitudMaximaNumeros = 10;
 
   // Expresión regular para validar el correo
   const correoExpReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
 
   //Expresión regular para validar la dirección 
   const direccionExpReg = /^[A-Za-z0-9\s,.'-]+$/;
 
   //Validación campo codigo del cliente
   if (!codigoExpReg.test(codigo_cliente)){
     return res.status(400).json({ error: 'El campo código del cliente solo   permite numeros.' });
   }
   if (codigo_cliente.length > longitudMaximaCodigo) {
     return res.status(400).json({ error: 'El campo código del cliente debe tener máximo 6 caracteres.' });
   }
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
   if (!letrasExpReg.test(nombre_juridico)){
     return res.status(400).json({ error: 'El campo nombre jurídico solo   permite letras.' });
   }
   if (nombre_juridico.length > longitudMaximaLetras) {
     return res.status(400).json({ error: 'El campo nombre jurídico debe tener máximo 20 caracteres.' });
   }
   if (!letrasExpReg.test(barrio_cliente)){
     return res.status(400).json({ error: 'El campo nombre jurídico solo   permite letras.' });
   }
   if (barrio_cliente.length > longitudMaximaLetras) {
     return res.status(400).json({ error: 'El campo nombre jurídico debe tener máximo 20 caracteres.' });
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
   //Validación campo nit de la empresa
 
   if (!nitExpReg.test(nit_empresa_cliente)){
     return res.status(400).json({ error: 'El campo nit de empresa solo   permite numeros.' });
   }
   if (nit_empresa_cliente.length > longitudMaximaNit) {
     return res.status(400).json({ error: 'El campo nit de empresa debe tener máximo 11 caracteres.' });
   }
 
   //Validación campo documento, celular
   if (!numerosExpReg.test(numero_documento_cliente)){
     return res.status(400).json({ error: 'El campo número de documento solo   permite números.' });
   }
   if (numero_documento_cliente.length > longitudMaximaNumeros) {
     return res.status(400).json({ error: 'El campo número de documento debe tener máximo 10 caracteres.' });
   }
 
   if (!numerosExpReg.test(celular_cliente)){
     return res.status(400).json({ error: 'El campo celular solo   permite números.' });
   }
   if (celular_cliente.length > longitudMaximaNumeros) {
     return res.status(400).json({ error: 'El campo celular debe tener máximo 10 caracteres.' });
   }
 
   //Validación campo correo
   if (!correoExpReg.test(correo_cliente)){
     return res.status(400).json({ error: 'Opción de correo invalida.' });
   }
 
   //Validación campo dirección 
   if (!direccionExpReg.test(direccion_cliente)){
     return res.status(400).json({ error: 'Opción de correo invalida.' });
   }


   try {
    let actualizarCliente = req.body;
    // Realiza la actualización en la base de datos
    const clienteActualizado = await Clientes.findByIdAndUpdate(id, actualizarCliente, { new: true });

    // Verifica si la categoría fue encontrada y actualizada correctamente
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Ccliente no encontrado.' });
    }
    
    // Si la categoría se actualiza exitosamente, envía un mensaje de éxito en la respuesta
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

//Exportar funciones -------------------------------------------------------------------------------------------------------------------------
module.exports = {
  obtenerTodosLosClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};