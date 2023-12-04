const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define un esquema para los permisos si deseas mantenerlos como subdocumentos
const PermisoSchema = new Schema({
  nombre_permiso: {
    type: String,
    required: true
  },
});

const RolesSchema = new Schema({
  nombre_rol: {
    type: String,
    required: true,
    unique: true,
  },
  
  permisos_rol: [{
    type: PermisoSchema,
    require: true,
   }],

  estado_rol: {
    type: Boolean,
    required: [true, 'El estado es obligatorio'],
    default: false,
  },
});

const Roles = mongoose.model('Roles', RolesSchema);

module.exports = Roles;
