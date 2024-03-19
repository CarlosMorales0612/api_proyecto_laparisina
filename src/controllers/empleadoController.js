//Importar paquetes requeridos de node
const { response } = require('express')
const mongoose = require('mongoose');
//Importación de los modelos
const Empleado = require('../models/empleado') // la importación de modelos no se instancia con llaves para evitar errores
const Pedido = require('../models/Pedido')
const Usuario = require('../models/Usuario');



// Obtener todas los empleados -------------------------------------------------------------------------------------------------------------
async function obtenerTodosLosEmpleados(req, res) {
  // const{codigo_rotulacion_empleado} = req.query
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los Empleados.' });
  }
}




// Obtener un empleado por ID --------------------------------------------------------------------------------------------------------------
async function obtenerEmpleadoPorId(req, res) {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findById(id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleado.' });
  }

}

async function obtenerEmpleadoPorCorreo(req, res) {
  const { correo_electronico } = req.params;
  try {
    const empleado = await Empleado.findOne({ correo_electronico: correo_electronico });
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }
    res.json(empleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el empleado.' });
  }
}
async function obtenerEmpleadoPorIdentificacion(req, res) {
  const { identificacion_empleado } = req.params;
  try {
    const empleado = await Empleado.findOne({ identificacion_empleado: identificacion_empleado });
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }
    res.json(empleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el empleado.' });
  }
}
//Registrar empleados
async function crearEmpleado(req, res) {
  

  const { codigo_rotulacion_empleado, nombre_empleado, tipo_contrato_empleado, 
    fecha_inicio_empleado, fecha_vencimiento_contrato_empleado, tipo_documento_empleado, 
    identificacion_empleado, fecha_nacimiento_empleado, edad_empleado, 
    lugar_nacimiento_empleado, direccion_empleado, municipio_domicilio_empleado, 
    estado_civil_empleado, celular_empleado, correo_electronico, alergia_empleado, 
    grupo_sanguineo_emeplado, contacto_emergencia, eps_empleado, pension_empleado, 
    cuenta_bancaria_empleado, area_empleado, area_empleado_produccion } = req.body

  //Expresión regular para validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
  const letrasExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
  const longitudMaximaLetras = 20;

  // Expresión regular para validar documento, celular
  const cuentaExpReg = /^[0-9]{7,10}$/;;
  const longitudMaximaCuenta = 20;
  const codigoExpReg = /^\d{1,4}$/;
  const longitudMaximaCodigo = 4;

  // Expresión regular para validar documento, celular
  const numerosExpReg = /^[0-9]{7,10}$/;
  const longitudMaximaNumeros = 10;
  const longitudMinimaNumeros = 6;

  const edadExpReg = /[0-9]$/;
  const longitudMaximaEdad = 3;

  //const direccionExpReg = /^[A-Za-z0-9\s,.'-*!]+$/;
  // Expresión regular para validar el correo
  const correoExpReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

 
  if (!letrasExpReg.test(lugar_nacimiento_empleado)) {
    return res.status(400).json({ error: 'El campo lugar nacimiento empleado solo permite letras.' });
  }
  if (lugar_nacimiento_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo lugar nacimiento empleado debe tener máximo 20 caracteres.' });
  }
  if (!letrasExpReg.test(municipio_domicilio_empleado)) {
    return res.status(400).json({ error: 'El campo municipio domicilio empleado solo permite letras.' });
  }
  if (municipio_domicilio_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo municipio domicilio empleado debe tener máximo 20 caracteres.' });
  }
  //Soltero/a, Casado/a, Convivencia, Viudo/a, Divorciado/a, Separado/a
  if (!letrasExpReg.test(estado_civil_empleado)) {
    return res.status(400).json({ error: 'El campo estado civil empleado solo permite letras.' });
  }
  if (estado_civil_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo estado civil empleado debe tener máximo 20 caracteres.' });
  }
  if (!letrasExpReg.test(pension_empleado)) {
    return res.status(400).json({ error: 'El campo pension empleado solo permite letras.' });
  }
  if (pension_empleado && pension_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo pension empleado debe tener máximo 20 caracteres.' });
  }
  if (!letrasExpReg.test(area_empleado)) {
    return res.status(400).json({ error: 'El campo area empleado solo permite letras.' });
  }
  if (area_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo area empleado debe tener máximo 20 caracteres.' });
  }

  
  //Se crean dos variables para poder comparar la fecha de nacimiento, que no sea mayor a la fecha actual y que la edad del empleado sea por lo mínimo 18 años, comparando su fecha de nacimiento
  var fecha_actual = new Date();
  var fecha_limite = new Date(fecha_actual.getFullYear() - 18, fecha_actual.getMonth(), fecha_actual.getDate());

  if (fecha_nacimiento_empleado > fecha_limite) {
    return res.status(400).json({ error: 'El empleado debe tener al menos 18 años' });
  } else if (fecha_nacimiento_empleado >= fecha_actual) {
    return res.status(400).json({ error: 'La fecha de nacimiento debe ser anterior a la fecha actual' });
  }

  if (!edadExpReg.test(edad_empleado)) {
    return res.status(400).json({ error: 'El campo edad del empleado solo   permite numeros' });
  }
  if (edad_empleado.length > longitudMaximaEdad) {
    return res.status(400).json({ error: 'El campo código del empleado debe tener máximo 3 caracteres.' });
  }
  // if (!direccionExpReg.test(direccion_empleado)) {
  //   return res.status(400).json({ error: 'Opción de direccón invalida.' });
  // }
  if (!numerosExpReg.test(celular_empleado)) {
    return res.status(400).json({ error: 'El campo celular del empleado solo   permite numeros, sin ningun signo.' });
  }
  if (celular_empleado.length > longitudMaximaNumeros) {
    return res.status(400).json({ error: 'El campo celular del empleado debe tener máximo 10 caracteres.' });
  }
  if (!correoExpReg.test(correo_electronico)) {
    return res.status(400).json({ error: 'Estructura de correo invalida.' });
  }

  

  const body = req.body //Captura de atributos
  let mensaje = ''
  console.log(body)

  try {
    const EmpleadosModel = mongoose.model('empleado');
    const empleado = new EmpleadosModel(body);
    await empleado.save();
    mensaje = 'La inserción se realizó exitosamente';
  } catch (error) {
    console.error('Error completo al guardar el empleado:', error);
    console.error('Error stack:', error.stack);
    mensaje = 'Ocurrió un error al guardar el empleado';
    if (error.name === 'ValidationError') {
      console.error(Object.values(error.errors).map(val => val.message));
      mensaje = Object.values(error.errors).map(val => val.message);
    } else {
      console.error('Ocurrió un error al guardar el empleado:', error.message);
      mensaje = 'Ocurrió un error al guardar el empleado';
    }
  }


  res.json({
    msg: mensaje
  })

}

//Actualizar empleado
async function actualizarEmpleado(req, res) {
  const { id } = req.params;
  const { codigo_rotulacion_empleado, nombre_empleado, tipo_contrato_empleado, fecha_inicio_empleado, fecha_vencimiento_contrato_empleado, tipo_documento_empleado, identificacion_empleado, fecha_nacimiento_empleado, edad_empleado, lugar_nacimiento_empleado, direccion_empleado, municipio_domicilio_empleado, estado_civil_empleado, celular_empleado, correo_electronico, alergia_empleado, grupo_sanguineo_emeplado, contacto_emergencia, eps_empleado, pension_empleado, cuenta_bancaria_empleado, area_empleado } = req.body
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: 'ID de empleado no válido.' });
  // }
  //Expresión regular para validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
  const letrasExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
  const longitudMaximaLetras = 20;

  // Expresión regular para validar documento, celular
  const cuentaExpReg = /^[0-9]{7,10}$/;;
  const longitudMaximaCuenta = 20;
  const codigoExpReg = /^\d{1,4}$/;
  const longitudMaximaCodigo = 4;

  // Expresión regular para validar documento, celular
  const numerosExpReg = /^[0-9]{7,10}$/;
  const longitudMaximaNumeros = 10;

  const edadExpReg = /[0-9]$/;
  const longitudMaximaEdad = 3;

  const direccionExpReg = /^[A-Za-z0-9\s,.'-*!]+$/;
  // Expresión regular para validar el correo
  const correoExpReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const grupoSanguineoExpReg = /^[a-zA-Z\s]*$/;

 
  try {
    let actualizarEmpleado = req.body;
    // Realiza la actualización en la base de datos
    const empleadoActualizado = await Empleado.findByIdAndUpdate(id, actualizarEmpleado, { new: true });

    // Verifica si el cliente fue encontrada y actualizada correctamente
    if (!empleadoActualizado) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }

    // Si el cliente se actualiza exitosamente, envía un mensaje de éxito en la respuesta
    res.status(200).json({ message: 'Empleado actualizado exitosamente.', empleados: empleadoActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cliente.' });
  }
}
// Eliminar una empleado por ID -------------------------------------------------------------------------------------------------------------
async function eliminarEmpleado(req, res) {
  const { id } = req.params;
  try {
    const empleados = await Empleado.findByIdAndDelete(id);
    if (!empleados) {
      return res.status(404).json({ error: 'empleado no encontrado.' });
    }
    res.status(200).json({ message: 'Empleado eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la empleado.' });
  }
}

async function obtenerPedidoPorIdDomiciliario(req, res) {
  const { id } = req.params;
  try {
    // Buscar al domiciliario por su ID
    const domiciliario = await Empleado.findById(id);

    if (!domiciliario || domiciliario.area_empleado !== 'Domiciliario') {
      return res.status(404).json({ error: 'Domiciliario no encontrado.' });
    }
  
    // Buscar el pedido asignado al domiciliario por su ID
    const pedido = await Pedido.findOne({ empleado_id: domiciliario._id });

    if (!pedido) {
      return res.status(404).json({ message: 'No hay pedidos asignados a este domiciliario.' });
    }

    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el pedido del domiciliario.' });
  }
}

// Obtener todos los domiciliarios
async function obtenerTodosLosDomiciliarios(req, res) {
  try {
    // Filtrar usuarios por rol igual a "Domiciliarios"
    const empleados = await Empleado.find({ 'area_empleado': 'Domiciliario' });
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los empleados." });
  }
}

async function asignarPedidoDomiciliario(req, res) {
  const { id_pedido, id_empleado_domiciliario } = req.body;

  try {
    // Validar que el pedido exista
    const pedido = await Pedido.findById(id_pedido);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }


    // Validar que el empleado exista y sea un domiciliario
    const domiciliario = await Empleado.findById(id_empleado_domiciliario);
    if (!domiciliario || domiciliario.area_empleado !== 'Domiciliario') {
      return res.status(404).json({ error: 'Domiciliario no encontrado.' });
    }

    // Asignar el domiciliario al pedido
    pedido.empleado_id = domiciliario._id.toString(); // Usar el ID del domiciliario
    debugger;
    await pedido.save();

    res.json({ message: 'Domiciliario asignado al pedido exitosamente.', pedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al asignar domiciliario al pedido.' });
  }
}

// En tu archivo de rutas o controladores
async function domiciliario(req, res) {
  const { correo } = req.params;
  try {
    const usuario = await Empleado.findOne({ correo_electronico: correo });
    if (!usuario || usuario.area_empleado !== 'Domiciliario') {
      return res.status(404).json({ error: 'Domiciliario no encontrado.' });
    }

    const pedido = await Pedido.find({ empleado_id: usuario._id, estado_pedido: 'Enviado' });

    if (!pedido) {
      return res.status(404).json({ message: 'No hay pedidos asignados a este domiciliario.' });
    }

    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el pedido del domiciliario.' });
  }
};
//cambiar estado
async function cambiarEstadoEmpleado(req, res) {
  const { id } = req.params;

  try {
    
    const verificarEstado = await Empleado.findById(id);

    if (!verificarEstado) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }

    const correoEmpleado = verificarEstado.correo_electronico;
    const nuevoEstadoEmpleado = !verificarEstado.estado_empleado;

    //Buscar usuario con el mismo correo
    const correoRelacionado = await Usuario.find({
      correo_electronico: correoEmpleado,
    });

    //Actualizar el estado del usuario encontrado
    await Usuario.findOneAndUpdate(
      { correo_electronico: correoEmpleado},
      { $set: { estado_usuario: nuevoEstadoEmpleado } }
    );

    //Cambiar el estado del empleado
    const empleados = await Empleado.findByIdAndUpdate(
      id,
      { $set: { estado_empleado: nuevoEstadoEmpleado } },
      { new: true }
    );

    res.status(200).json({ message: 'Estado del empleado cambiado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado del empleado y su usuario.' });
}
}
module.exports = {
  obtenerTodosLosEmpleados,
  obtenerEmpleadoPorId,
  obtenerEmpleadoPorCorreo,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  obtenerPedidoPorIdDomiciliario,
  obtenerTodosLosDomiciliarios,
  asignarPedidoDomiciliario,
  domiciliario,
  obtenerEmpleadoPorIdentificacion,
  cambiarEstadoEmpleado,
}