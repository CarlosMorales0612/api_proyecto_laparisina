const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({

  correo_electronico: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: [true, 'El correo debe ser único'],
  },

  contaseña_usuario: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    // Al menos una letra minúscula (a-z).
    // Al menos una letra mayúscula (A-Z).
    // Al menos un dígito númerico (0-9).
    // Al menos un carácter especial, que puede ser uno de los siguientes: @, $, !, %, *, ?, o &.
    // La longitud de la contraseña debe ser de al menos 8 caracteres.
  },

  rol_usuario: {
    type: String, // Agrega un campo para el rol del usuario
    required: [true, 'El rol es obligatorio'],
    // Puedes establecer un valor por defecto para el rol si lo deseas
    // default: 'Usuario',
  },

  permisos_usuario: [
    {
      nombre_producto: {
        type: String,
        required: [true, 'El campo nombre producto es requerido.']
      },

      permisos: [{
        type: String,
        required: [true, 'El campo nombre categoria producto es requerido.']
      }],
      
    },
  ],

  estado_usuario: {
    type: Boolean,
    required: [true, 'El estado es obligatorio'],
    default: true,
  },

  
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
