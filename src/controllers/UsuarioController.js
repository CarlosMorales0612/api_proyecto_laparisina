const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Obtener todos los usuarios
async function getAllUsuarios(req, res) {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado_usuario: true};

    const [ usuarios, total] = await Promise.all([
      Usuario.countDocuments( query),      
      Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
    ])

    res.json({
      usuarios,
      total
    });

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
  const { correo_electronico, contrasena_usuario, rol_usuario, estado_usuario } = req.body;
  try {

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
    Usuario.contrasena_usuario = bcrypt.hashSync(contrasena_usuario, salt);

    //const hashedPassword = await bcrypt.hash(contrasena_usuario, 10); // 10 es el costo de hashing, puedes ajustarlo según tus necesidades

    // Crear un nuevo usuario
    const usuario = new Usuario({
      correo_electronico,
      contrasena_usuario,
      rol_usuario,
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
//Crear usuario


//Actualizar usuario
const updateUsuario = async (req, res = response) => {
  const { id } = req.params;
  const { _id, contrasena_usuario, correo_electronico, ...resto } = req.body;
  try {
    // Validar la contraseña actual (opcional)
    if (contrasena_usuario) {
      // Encriptar la contraseña antes de guardarla en la base de datos
      const salt = bcrypt.genSaltSync();
      resto.contrasena_usuario = bcrypt.hashSync(contrasena_usuario, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario.' + error });
  }
}


// Eliminar un usuario por ID
async function deleteUsuario(req, res) {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByIdAndUpdate(id, { estado_usuario: false });

    res.json({ usuario});

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
