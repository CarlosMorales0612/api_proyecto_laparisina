const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
async function getAllUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
}

// Obtener un usuario por ID
async function getUsuarioById(req, res) {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
}

async function createUsuario(req, res) {
  const { correo_electronico, contrasena_usuario, estado_usuario } = req.body;

  try {
    // Verificar si el correo electrónico ya está registrado
    const existeEmail = await Usuario.findOne({ correo_electronico });
    if (existeEmail) {
      return res.status(400).json({ msg: 'El correo ya se encuentra registrado' });
    }

    // Validar la contraseña con una expresión regular
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(contrasena_usuario)) {
      return res.status(400).json({
        error: 'La contraseña no cumple con los requisitos.',
        details: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y tener al menos 6 caracteres.'
      });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(contrasena_usuario, 10); // 10 es el costo de hashing, puedes ajustarlo según tus necesidades

    // Crear un nuevo usuario
    const usuario = new Usuario({
      correo_electronico,
      contrasena_usuario: hashedPassword,
      estado_usuario
    });

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





async function updateUsuario(req, res) {
  const { id } = req.params;
  const { correo_electronico, contasena_usuario,  estado_usuario } = req.body;
  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Validar la contraseña actual (opcional)
    

    // Encriptar la nueva contraseña (si se proporciona)
    let newHashedPassword = usuario.contaseña_usuario;
    if (contaseña_usuario) {
      newHashedPassword = await bcrypt.hash(contaseña_usuario, 10);
    }

    // Actualizar el usuario en la base de datos
    usuario.contaseña_usuario = newHashedPassword;
    
    usuario.estado_usuario = estado_usuario;

    await usuario.save();

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
}


// Eliminar un usuario por ID
async function deleteUsuario(req, res) {
  const { id } = req.params;
  try {
    const usuario = await User.findByIdAndDelete(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
}



module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
