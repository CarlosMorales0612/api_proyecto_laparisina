const mongoose = require('mongoose');
const Transporte = require('../models/TransporteModel');

// Obtener todos los Transporte -------------------------------------------------------------------------------------------------------------
async function obtenerTodosLosTransporte(req, res) {
    const{ciudad_cliente}= req.query 
    try {
      const transporte = await Transporte.find();
      res.json(transporte);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los transportes.' });
    }
  }

  // Obtener todos los Transporte -------------------------------------------------------------------------------------------------------------
async function obtenerTransporteActivos(req, res) {

  const{ciudad_cliente}= req.query 
  try {
    const transporte = await Transporte.find({estado_transporte : true});
    res.json(transporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los transportes activos.' });
  }
}

// Obtener un rol por ID --------------------------------------------------------------------------------------------------------------
 async function obtenerTransportePorId(req, res) {
  const { id } = req.params;
  try {
    const transporte = await Transporte.findById(id);
    if (!transporte) {
      return res.status(404).json({ error: 'Transporte no encontrado.' });
    }
    res.json(transporte); 
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el Transporte.' });
  }
}

// Crear un nuevo valor de transporte -----------------------------------------------------------------------------------------------------------------
async function crearTransporte(req, res) {
    const body = req.body;
    let mensaje = '';
    console.log(body);
    const {ciudad_cliente,precio_transporte,estado_transporte} = req.body
  
    //Expresión regular para validar la ciudad
    const ciudadExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{3,20}$/;
    const longitudMaximaNombre = 50;

    // Expresión regular para validar precio del transporte
    const precioExpReg = /^[0-9]{4,5}$/;
    const longitudMaximaNumeros = 5;
    
    if (!ciudadExpReg.test(ciudad_cliente)){
      return res.status(400).json({ error: 'La ciudad solo permite letras.' });
    }
    if (ciudad_cliente.length > longitudMaximaNombre) {
      return res.status(400).json({ error: 'La ciudad debe tener un minimo de 3 y un máximo 50 caracteres.' });
    }

    if (!precioExpReg.test(precio_transporte)){
        return res.status(400).json({ error: 'El precio solo permite número.' });
    }
    if (precio_transporte.length > longitudMaximaNumeros) {
        return res.status(400).json({ error: 'La precio debe tener un minimo de 4 y un máximo 5 caracteres.' });
    }
  
    try {
      const transporte = new Transporte(body); 
      // Guardar objeto
      await transporte.save();
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

  // Actualizar un transporte por ID -----------------------------------------------------------------------------------------------------------
    async function actualizarTransporte(req, res) {
    const { id } = req.params;
    const {ciudad_cliente,precio_transporte,estado_transporte} = req.body
  
    //Expresión regular para validar la ciudad
    const ciudadExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{3,20}$/;
    const longitudMaximaNombre = 50;

    // Expresión regular para validar precio del transporte
    const precioExpReg = /^[0-9]{4,5}$/;
    const longitudMaximaNumeros = 5;
    
    if (!ciudadExpReg.test(ciudad_cliente)){
      return res.status(400).json({ error: 'La ciudad solo permite letras.' });
    }
    if (ciudad_cliente.length > longitudMaximaNombre) {
      return res.status(400).json({ error: 'La ciudad debe tener un minimo de 3 y un máximo 50 caracteres.' });
    }

    if (!precioExpReg.test(precio_transporte)){
        return res.status(400).json({ error: 'El precio solo permite número.' });
    }
    if (precio_transporte.length > longitudMaximaNumeros) {
        return res.status(400).json({ error: 'La precio debe tener un minimo de 4 y un máximo 5 caracteres.' });
    }
    console.log('ID del transporte a actualizar:', id);
    console.log('Datos de actualización:', req.body);
    try {
      let actualizarTransporte = req.body;
  
      // Realiza la actualización en la base de datos
      const transporteActualizado = await Transporte.findByIdAndUpdate(id, actualizarTransporte, { new: true });
  
      // Verifica si el transporte fue encontrado y actualizado correctamente
      if (!transporteActualizado) {
        return res.status(404).json({ error: 'Transporte no encontrado.' });
      }
      
      // Si el transporte se actualiza exitosamente, envía un mensaje de éxito en la respuesta
      res.status(200).json({ message: 'transporte actualizado exitosamente.', transporte: transporteActualizado });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la transporte.' });
    }
  }

  // Eliminar un rol por ID -------------------------------------------------------------------------------------------------------------
async function eliminarTranspote(req, res) {
  const { id } = req.params;
  try {
    const transporte = await Transporte.findByIdAndDelete(id);
    if (!transporte) {
      return res.status(404).json({ error: 'Transporte no encontrado.' });
    }
    res.status(200).json({ message: 'Transporte eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Transporte.' });
  }
}
//Cambiar el estado del transporte por ID--------------------------------------------------------------------------------------
async function cambiarEstadoTransporte(req, res) {
  const { id } = req.params;
  try {
    const verificarEstado = await Transporte.findById(id)

    if (!verificarEstado) {
      return res.status(404).json({ error: 'Transporte no encontrada.' });
    } else {
      const estado = verificarEstado.estado_transporte

      const transporte = await Transporte.findByIdAndUpdate(
        id,
        { $set: { estado_transporte: !estado } }, // Cambia a 'false', puedes cambiarlo según tus necesidades
        { new: true }
      );
    }

    res.status(200).json({ message: 'Estado del Transporte cambiado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado del Transporte.' });
  }
}

module.exports={
  obtenerTodosLosTransporte,
  obtenerTransportePorId,
  crearTransporte,
  actualizarTransporte,
  cambiarEstadoTransporte,
  eliminarTranspote,
  obtenerTransporteActivos,
}