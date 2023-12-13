const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

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

  rol_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles',
    required: [true, 'El rol es obligatorio'],
    default: '654a96ebdbe2126f5a74161e'
  }, // Campo de referencia al esquema de Rol

  estado_usuario: {
    type: Boolean,
    required: [true, 'El estado es obligatorio'],
    default: true,
  },
  resetPasswordToken: String, // Nuevo campo para el token de restablecimiento
  resetPasswordExpires: Date,


});

usuarioSchema.methods.toJSON = function() {
  const { __v, contrasena_usuario, resetPasswordToken, resetPasswordExpires, _id, ...usuario } = this.toObject(); 
  usuario.uid = _id;
  return usuario;
}


module.exports = model('Usuario', usuarioSchema);
