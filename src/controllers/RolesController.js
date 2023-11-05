const mongoose = require('mongoose');
//Importacion de los modelos 
const Roles = require('../models/RolesModel')

// Obtener todos los roles -------------------------------------------------------------------------------------------------------------
async function obtenerTodosLosRoles(req, res) {
  try {
    const roles = await Roles.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles.' });
  }
}

// Obtener un rol por ID --------------------------------------------------------------------------------------------------------------
async function obtenerRolPorId(req, res) {
  const { id } = req.params;
  try {
    const roles = await Roles.findById(id);
    if (!roles) {
      return res.status(404).json({ error: 'Rol no encontrado.' });
    }
    res.json(roles); 
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el Rol.' });
  }
}

// Crear un nuevo rol -----------------------------------------------------------------------------------------------------------------
async function crearRol(req, res) {
  const body = req.body;
  let mensaje = '';
  console.log(body);
  const {nombre_rol,permisos_rol,estado_rol} = req.body

  //Expresión regular para validar el nombre del rol
  const nombreExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
  const longitudMaximaNombre = 20;
  
  if (!nombreExpReg.test(nombre_rol)){
    return res.status(400).json({ error: 'El nombre solo permite letras.' });
  }
  if (nombre_rol.length > longitudMaximaNombre) {
    return res.status(400).json({ error: 'El nombre debe tener máximo 20 caracteres.' });
  }

  try {
    const roles = new Roles(body); 
    // Guardar objeto
    await roles.save();
    mensaje = 'La inserción se realizó exitosamente';
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error(Object.values(error.errors).map((val) => val.message));
      mensaje = Object.values(error.errors).map((val) => val.message);
    } else {
      console.error(error.message);
      mensaje = error.message;
    }
  }
  
  res.json({
    msg: mensaje
  });
}

// Actualizar un rol por ID -----------------------------------------------------------------------------------------------------------
async function actualizarRol(req, res) {
  const { id } = req.params;
  const {nombre_rol,permisos_rol,estado_rol} = req.body;

  //Expresión regular para validar el nombre del rol
  const nombreExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
  const longitudMaximaNombre = 20;
  
  if (!nombreExpReg.test(nombre_rol)){
    return res.status(400).json({ error: 'El nombre solo permite letras.' });
  }
  if (nombre_rol.length > longitudMaximaNombre) {
    return res.status(400).json({ error: 'El nombre debe tener máximo 20 caracteres.' });
  }
  console.log('ID del rol a actualizar:', id);
  console.log('Datos de actualización:', req.body);
  try {
    let actualizarRol = req.body;

    // Realiza la actualización en la base de datos
    const rolActualizado = await Roles.findByIdAndUpdate(id, actualizarRol, { new: true });

    // Verifica si el rol fue encontrado y actualizado correctamente
    if (!rolActualizado) {
      return res.status(404).json({ error: 'Rol no encontrado.' });
    }
    
    // Si el rol se actualiza exitosamente, envía un mensaje de éxito en la respuesta
    res.status(200).json({ message: 'Rol actualizado exitosamente.', roles: rolActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la Rol.' });
  }
}

// Eliminar un rol por ID -------------------------------------------------------------------------------------------------------------
async function eliminarRol(req, res) {
  const { id } = req.params;
  try {
    const roles = await Roles.findByIdAndDelete(id);
    if (!roles) {
      return res.status(404).json({ error: 'Rol no encontrado.' });
    }
    res.status(200).json({ message: 'Rol eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Rol.' });
  }
}


module.exports={
   obtenerTodosLosRoles,
   obtenerRolPorId,
   crearRol,
   actualizarRol,
   eliminarRol
}