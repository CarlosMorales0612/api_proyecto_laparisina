const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  correo_electronico: {
    type: String,
    required: true,
    unique: true,
  },
  
  contaseña_usuario: {
    type: String,
    required: true,
  },

  rol_usuario: {
    type: String, // Agrega un campo para el rol del usuario
    required: true,
    // Puedes establecer un valor por defecto para el rol si lo deseas
    // default: 'Usuario',
  },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
