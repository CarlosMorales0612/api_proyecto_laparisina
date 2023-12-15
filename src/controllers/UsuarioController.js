const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Obtener todos los usuarios con sus roles
async function getAllUsuarios(req, res) {
  try {
    const query = {};

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
        .populate('rol_usuario')
    ]);

    res.json({
      total,
      usuarios
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
}



// Obtener un usuario por ID con el objeto de rol
async function getUsuarioById(req, res) {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id).populate('rol_usuario');
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
}


// Obtener todos los domiciliarios
async function obtenerTodosLosDomiciliarios(req, res) {
  try {
    // Filtrar usuarios por rol igual a "Domiciliarios"
    const usuarios = await Usuario.find({ 'rol_usuario': '656126cb933d1fae687598fd' });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los Usuarios." });
  }
}


async function createUsuario(req, res) {
  const { correo_electronico, contrasena_usuario, rol_usuario, estado_usuario } = req.body;
  try {

    const usuario = new Usuario({ correo_electronico, contrasena_usuario, rol_usuario, estado_usuario });
    // Validar la contraseña con una expresión regular
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(contrasena_usuario)) {
      return res.status(400).json({
        error: 'La contraseña no cumple con los requisitos.',
        details: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y tener al menos 6 caracteres.'
      });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const salt = bcrypt.genSaltSync();
    usuario.contrasena_usuario = bcrypt.hashSync(contrasena_usuario, salt);

    //const hashedPassword = await bcrypt.hash(contrasena_usuario, 10); // 10 es el costo de hashing, puedes ajustarlo según tus necesidades

    // Crear un nuevo usuario
    // const usuario = new Usuario({
    //   correo_electronico,
    //   contrasena_usuario,
    //   rol_usuario,
    //   estado_usuario
    // });

    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Si se produce un error de validación (por ejemplo, datos faltantes o incorrectos), se proporcionan detalles específicos.
      res.status(400).json({ error: 'Error al crear el usuario', details: error.errors });
    } else {
      // En caso de otros errores, se proporciona un mensaje de error genérico.
      res.status(400).json({ error: 'Error al crear el usuario. Detalles: ' + error.message });
    }
  }
}
//Crear usuario


//Actualizar usuario
const updateUsuario = async (req, res = response) => {
  const { id } = req.params;
  const { _id, correo_electronico, contrasena_usuario, ...resto } = req.body;

  try {
    // Verificar si el correo existe en otro usuario
    const existingUser = await Usuario.findOne({ correo_electronico });
    if (existingUser && existingUser._id.toString() !== id) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado en otro usuario.' });
    }

    // Validar y encriptar la contraseña actual (opcional)
    if (contrasena_usuario) {
      const salt = bcrypt.genSaltSync();
      resto.contrasena_usuario = bcrypt.hashSync(contrasena_usuario, salt);
    }

    // Actualizar usuario
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario.' + error });
  }
}


// // Eliminar un usuario por ID
// async function deleteUsuario(req, res) {
//   const { id } = req.params;
//   try {
//     const usuario = await Usuario.findByIdAndUpdate(id, { estado_usuario: false });

//     res.json({ usuario });

//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar el usuario.' });
//   }
// }

async function cambiarEstadoUsuario(req, res) {
  const { id } = req.params;
  try {
    const verificarEstado = await Usuario.findById(id)

    if (!verificarEstado) {
      return res.status(404).json({ error: 'Usuario no encontrada.' });
    } else {
      const estado = verificarEstado.estado_usuario

      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { $set: { estado_usuario: !estado } }, // Cambia a 'false', puedes cambiarlo según tus necesidades
        { new: true }
      );
    }

    res.status(200).json({ message: 'Estado del usuario cambiado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado del usuario.' });
  }
}



module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  cambiarEstadoUsuario,
  obtenerTodosLosDomiciliarios,
};
