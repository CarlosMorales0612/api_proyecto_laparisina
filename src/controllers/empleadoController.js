//Importar paquetes requeridos de node
const {response} = require('express')
const mongoose = require('mongoose');
//Importación de los modelos
const Empleado = require('../models/empleado') // la importación de modelos no se instancia con llaves para evitar errores
const Pedido = require('../models/Pedido')



// Obtener todas los empleados -------------------------------------------------------------------------------------------------------------
async function obtenerTodosLosEmpleados(req, res){
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
  const { correo_empleado } = req.params;
  try {
    const empleado = await Empleado.findOne({ correo_empleado: correo_empleado });
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
async function crearEmpleado(req, res){
  
    const {codigo_rotulacion_empleado,nombre_empleado,tipo_contrato_empleado,fecha_inicio_empleado,fecha_vencimiento_contrato_empleado,tipo_documento_empleado,identificacion_empleado,fecha_nacimiento_empleado,edad_empleado,lugar_nacimiento_empleado,direccion_empleado,municipio_domicilio_empleado,estado_civil_empleado,celular_empleado,correo_empleado,alergia_empleado,grupo_sanguineo_emeplado,contacto_emergencia,eps_empleado,pension_empleado,cuenta_bancaria_empleado,area_empleado} = req.body

//Expresión regular para validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
const letrasExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
const longitudMaximaLetras = 20;

 // Expresión regular para validar documento, celular
 const cuentaExpReg =  /^[0-9]{7,10}$/;;
 const longitudMaximaCuenta = 20;
 const codigoExpReg = /^\d{1,4}$/;
const longitudMaximaCodigo = 4;

// Expresión regular para validar documento, celular
const numerosExpReg = /^[0-9]{7,10}$/;
const longitudMaximaNumeros = 10;

const edadExpReg = /[0-9]$/;
const longitudMaximaEdad = 3;

const direccionExpReg = /^[A-Za-z0-9\s,.'-]+$/;
 // Expresión regular para validar el correo
const correoExpReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const grupoSanguineoExpReg = /^[a-zA-Z\s]*$/;

if (!letrasExpReg.test(nombre_empleado)){
    return res.status(400).json({ error: 'El campo nombre empleado solo   permite letras.' });
  }
  if (nombre_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo nombre empleado debe tener máximo 20 caracteres.' });
  }
// if (!letrasExpReg.test(tipo_contrato_empleado)){
//     return res.status(400).json({ error: 'El campo tipo contrato empleado solo permite letras.' });
//   }
//   if (tipo_contrato_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo tipo contrato empleado debe tener máximo 20 caracteres.' });
//   }
// if (!letrasExpReg.test(tipo_documento_empleado)){
//     return res.status(400).json({ error: 'El campo tipo documento empleado solo permite letras.' });
//   }
//   if (tipo_documento_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo tipo documento empleado debe tener máximo 20 caracteres.' });
//   }
  if (!letrasExpReg.test(lugar_nacimiento_empleado)){
    return res.status(400).json({ error: 'El campo lugar nacimiento empleado solo permite letras.' });
  }
  if (lugar_nacimiento_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo lugar nacimiento empleado debe tener máximo 20 caracteres.' });
  }  
  if (!letrasExpReg.test(municipio_domicilio_empleado)){
    return res.status(400).json({ error: 'El campo municipio domicilio empleado solo   permite letras.' });
  }
  if (municipio_domicilio_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo municipio domicilio empleado debe tener máximo 20 caracteres.' });
  }  
  if (!letrasExpReg.test(estado_civil_empleado)){
    return res.status(400).json({ error: 'El campo estado civil empleado solo   permite letras.' });
  }
  if (estado_civil_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo estado civil empleado debe tener máximo 20 caracteres.' });
  }  
  if (!letrasExpReg.test(alergia_empleado)){
    return res.status(400).json({ error: 'El campo alergia empleado solo permite letras.' });
  }
  if (alergia_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo alergia empleado debe tener máximo 20 caracteres.' });
  } 
  if (!letrasExpReg.test(eps_empleado)){
    return res.status(400).json({ error: 'El campo eps empleado solo   permite letras.' });
  }
  if (eps_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo campo eps empleado debe tener máximo 20 caracteres.' });
  } 
  if (!letrasExpReg.test(pension_empleado)){
    return res.status(400).json({ error: 'El campo pension empleado solo   permite letras.' });
  }
  if (pension_empleado && pension_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo pension empleado debe tener máximo 20 caracteres.' });
  } 
   if (!letrasExpReg.test(area_empleado)){
     return res.status(400).json({ error: 'El campo area empleado solo   permite letras.' });
   }
   if (area_empleado.length > longitudMaximaLetras) {
    return res.status(400).json({ error: 'El campo area empleado debe tener máximo 20 caracteres.' });
   } 

  if (!cuentaExpReg.test(cuenta_bancaria_empleado)){
    return res.status(400).json({ error: 'El campo cuenta empleado solo   permite letras.' });
  }
  if (cuenta_bancaria_empleado.length > longitudMaximaCuenta) {
    return res.status(400).json({ error: 'El campo cuenta empleado debe tener máximo 20 caracteres.' });
  } 
  if (!codigoExpReg.test(codigo_rotulacion_empleado)){
    return res.status(400).json({ error: 'El campo código del empleado solo   permite numeros.' });
}
if (codigo_rotulacion_empleado.length > longitudMaximaCodigo) {
    return res.status(400).json({ error: 'El campo código del empleado debe tener máximo 4 caracteres.' });
}
if (!numerosExpReg.test(identificacion_empleado)){
   return res.status(400).json({ error: 'El campo cedula del empleado solo   permite numeros, sin ningun signo.' });
}
if (identificacion_empleado.length > longitudMaximaNumeros) {
   return res.status(400).json({ error: 'El campo cedula del empleado debe tener máximo 10 caracteres.' });
}
if(fecha_nacimiento_empleado < new Date()){
   return res.status(400).json({ error: 'La fecha de nacimiento debe ser anterior a la fecha actual' });
}
if (!edadExpReg.test(edad_empleado)){
   return res.status(400).json({ error: 'El campo edad del empleado solo   permite numeros' });
}
if (edad_empleado.length > longitudMaximaEdad) {
   return res.status(400).json({ error: 'El campo código del empleado debe tener máximo 3 caracteres.' });
}
if (!direccionExpReg.test(direccion_empleado)){
   return res.status(400).json({ error: 'Opción de direccón invalida.' });
}
if (!numerosExpReg.test(celular_empleado)){
   return res.status(400).json({ error: 'El campo celular del empleado solo   permite numeros, sin ningun signo.' });
}
if (celular_empleado.length > longitudMaximaNumeros) {
   return res.status(400).json({ error: 'El campo celular del empleado debe tener máximo 10 caracteres.' });
}
if (!correoExpReg.test(correo_empleado)){
   return res.status(400).json({ error: 'Estructura de correo invalida.' });
}
if (!grupoSanguineoExpReg.test(grupo_sanguineo_emeplado)){
   return res.status(400).json({ error: 'Grupo sanguíneo no válido. Debe ser uno de los siguientes: A+, A-, B+, B-, AB+, AB-, O+, O-' });
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
async function actualizarEmpleado(req, res){
    const {id}= req.params;
    const {codigo_rotulacion_empleado,nombre_empleado,tipo_contrato_empleado,fecha_inicio_empleado,fecha_vencimiento_contrato_empleado,tipo_documento_empleado,identificacion_empleado,fecha_nacimiento_empleado,edad_empleado,lugar_nacimiento_empleado,direccion_empleado,municipio_domicilio_empleado,estado_civil_empleado,celular_empleado,correo_empleado,alergia_empleado,grupo_sanguineo_emeplado,contacto_emergencia,eps_empleado,pension_empleado,cuenta_bancaria_empleado,area_empleado} = req.body
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ error: 'ID de empleado no válido.' });
    // }
   //Expresión regular para validar el tipocliente, nombrecontacto, nombrejuridico, barrio, ciudad.
const letrasExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
const longitudMaximaLetras = 20;

 // Expresión regular para validar documento, celular
 const cuentaExpReg =  /^[0-9]{7,10}$/;;
 const longitudMaximaCuenta = 20;
 const codigoExpReg = /^\d{1,4}$/;
const longitudMaximaCodigo = 4;

// Expresión regular para validar documento, celular
const numerosExpReg = /^[0-9]{7,10}$/;
const longitudMaximaNumeros = 10;

const edadExpReg = /[0-9]$/;
const longitudMaximaEdad = 3;

const direccionExpReg = /^[A-Za-z0-9\s,.'-]+$/;
 // Expresión regular para validar el correo
const correoExpReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const grupoSanguineoExpReg = /^[a-zA-Z\s]*$/;

// if (!letrasExpReg.test(nombre_empleado)){
//     return res.status(400).json({ error: 'El campo nombre empleado solo   permite letras.' });
//   }
//   if (nombre_empleado && nombre_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo nombre empleado debe tener máximo 20 caracteres.' });
//   }
// if (!letrasExpReg.test(tipo_contrato_empleado)){
//     return res.status(400).json({ error: 'El campo tipo contrato empleado solo permite letras.' });
//   }
//   if (tipo_contrato_empleado && tipo_contrato_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo tipo contrato empleado debe tener máximo 20 caracteres.' });
//   }
// if (!letrasExpReg.test(tipo_documento_empleado)){
//     return res.status(400).json({ error: 'El campo tipo documento empleado solo permite letras.' });
//   }
//   if (tipo_documento_empleado && tipo_documento_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo tipo documento empleado debe tener máximo 20 caracteres.' });
//   }
//   if (!letrasExpReg.test(lugar_nacimiento_empleado)){
//     return res.status(400).json({ error: 'El campo lugar nacimiento empleado solo permite letras.' });
//   }
//   if (lugar_nacimiento_empleado && lugar_nacimiento_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo lugar nacimiento empleado debe tener máximo 20 caracteres.' });
//   }  
//   if (!letrasExpReg.test(municipio_domicilio_empleado)){
//     return res.status(400).json({ error: 'El campo municipio domicilio empleado solo   permite letras.' });
//   }
//   if (municipio_domicilio_empleado && municipio_domicilio_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo municipio domicilio empleado debe tener máximo 20 caracteres.' });
//   }  
//   if (!letrasExpReg.test(estado_civil_empleado)){
//     return res.status(400).json({ error: 'El campo estado civil empleado solo   permite letras.' });
//   }
//   if (estado_civil_empleado && estado_civil_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo estado civil empleado debe tener máximo 20 caracteres.' });
//   }  
//   if (!letrasExpReg.test(alergia_empleado)){
//     return res.status(400).json({ error: 'El campo alergia empleado solo permite letras.' });
//   }
//   if (alergia_empleado && alergia_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo alergia empleado debe tener máximo 20 caracteres.' });
//   } 
//   if (!letrasExpReg.test(eps_empleado)){
//     return res.status(400).json({ error: 'El campo eps empleado solo   permite letras.' });
//   }
//   if (eps_empleado && eps.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo campo eps empleado debe tener máximo 20 caracteres.' });
//   } 
//   if (!letrasExpReg.test(pension_empleado)){
//     return res.status(400).json({ error: 'El campo pension empleado solo   permite letras.' });
//   }
//   if (pension_empleado && pension_empleado.length > longitudMaximaLetras) {
//     return res.status(400).json({ error: 'El campo pension empleado debe tener máximo 20 caracteres.' });
//   } 
//   // if (!letrasExpReg.test(area_empleado)){
//   //   return res.status(400).json({ error: 'El campo area empleado solo   permite letras.' });
//   // }
//   // if (area_empleado.length > longitudMaximaLetras) {
//   //   return res.status(400).json({ error: 'El campo area empleado debe tener máximo 20 caracteres.' });
//   // } 

//   if (!cuentaExpReg.test(cuenta_bancaria_empleado)){
//     return res.status(400).json({ error: 'El campo cuenta empleado solo   permite letras.' });
//   }
//   if (cuenta_bancaria_empleado && cuenta_bancaria_empleado.length > longitudMaximaCuenta) {
//     return res.status(400).json({ error: 'El campo cuenta empleado debe tener máximo 20 caracteres.' });
//   } 
//   if (!codigoExpReg.test(codigo_rotulacion_empleado)){
//     return res.status(400).json({ error: 'El campo código del empleado solo   permite numeros.' });
// }
// if (codigo_rotulacion_empleado.length > longitudMaximaCodigo) {
//     return res.status(400).json({ error: 'El campo código del empleado debe tener máximo 4 caracteres.' });
// }
// if (!numerosExpReg.test(identificacion_empleado)){
//    return res.status(400).json({ error: 'El campo cedula del empleado solo   permite numeros, sin ningun signo.' });
// }
// if (identificacion_empleado.length > longitudMaximaNumeros) {
//    return res.status(400).json({ error: 'El campo cedula del empleado debe tener máximo 10 caracteres.' });
// }
// if(fecha_nacimiento_empleado < new Date()){
//    return res.status(400).json({ error: 'La fecha de nacimiento debe ser anterior a la fecha actual' });
// }
// if (!edadExpReg.test(edad_empleado)){
//    return res.status(400).json({ error: 'El campo edad del empleado solo   permite numeros' });
// }
// if (edad_empleado.length > longitudMaximaEdad) {
//    return res.status(400).json({ error: 'El campo código del empleado debe tener máximo 3 caracteres.' });
// }
// if (!direccionExpReg.test(direccion_empleado)){
//    return res.status(400).json({ error: 'Opción de direccón invalida.' });
// }
// if (!numerosExpReg.test(celular_empleado)){
//    return res.status(400).json({ error: 'El campo celular del empleado solo   permite numeros, sin ningun signo.' });
// }
// if (celular_empleado.length > longitudMaximaNumeros) {
//    return res.status(400).json({ error: 'El campo celular del empleado debe tener máximo 10 caracteres.' });
// }
// if (!correoExpReg.test(correo_empleado)){
//    return res.status(400).json({ error: 'Estructura de correo invalida.' });
// }
// if (!grupoSanguineoExpReg.test(grupo_sanguineo_emeplado)){
//    return res.status(400).json({ error: 'Grupo sanguíneo no válido. Debe ser uno de los siguientes: A+, A-, B+, B-, AB+, AB-, O+, O-' });
// }

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
  
// Obtener pedidos por correo del empleado
async function obtenerPedidosPorCorreoEmpleado(req, res) {
  const { correo_empleado } = req.params;
  try {
    // Buscar al empleado por su correo
    const empleado = await Empleado.findOne({ correo_empleado });

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }

    // Buscar los pedidos asignados al empleado por su ID
    const pedidos = await Pedido.find({ empleado_id: empleado._id });

    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los pedidos del empleado.' });
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



module.exports = {
    obtenerTodosLosEmpleados,
    obtenerEmpleadoPorId,
    obtenerEmpleadoPorCorreo,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    obtenerPedidosPorCorreoEmpleado,
    obtenerTodosLosDomiciliarios
}