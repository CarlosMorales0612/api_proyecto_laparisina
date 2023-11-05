const mongoose = require('mongoose');
//const Roles = require('./roles'); 

const usuarioSchema = new mongoose.Schema({
  correo_electronico: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: [true, 'El correo debe ser único'],
  },

  contrasena_usuario: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    // Al menos una letra minúscula (a-z).
    // Al menos una letra mayúscula (A-Z).
    // Al menos un dígito númerico (0-9).
    // La longitud de la contraseña debe ser de al menos 8 caracteres.
  },

  //rol_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' }, // Campo de referencia al esquema de Rol

  estado_usuario: {
    type: Boolean,
    required: [true, 'El estado es obligatorio'],
    default: true,
  },

  
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
