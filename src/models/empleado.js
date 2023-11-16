const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  
codigo_rotulacion_empleado: {
    type: String,
    required: true,
    unique:[true, 'El codigo rotulacion empleado:{VALUE} ya existe'],
    required: [true,'El codigo rotulacion empleado es requerido']
  },
  
  nombre_empleado: {
    type: String,
    required: [true,'El nombre empleado es requerido'],
  },
  tipo_contrato_empleado: {
    type: String,
    required: [true,'El tipo contrato empleado es requerido'],
    
  },
  fecha_inicio_empleado: {
    type: Date,
    required: true
  },
      
  fecha_vencimiento_contrato_empleado:{
    type: Date,
    required: true
  },
  
  tipo_documento_empleado:{
    type: String,
    required: [true,'El tipo documento empleado es requerido'],
  },
  identificacion_empleado:{
    type: String,
    unique:[true, 'La identicicacion empleado:{VALUE} ya existe'],
    required: [true,'La identificacion empleado es requerido'],
  },
  fecha_nacimiento_empleado:{
    type: Date,
    required: [true,'La fecha nacimiento empleado es requerido'],
  },
  
  edad_empleado: {
    type: Number,
    required: [true,'La edad empleado es requerido'],
  },
  lugar_nacimiento_empleado:{
    type: String,
    required: [true,'El lugar nacimiento empleado es requerido'],
  },
  direccion_empleado:{
    type: String,
    required: [true,'La direccion empleado es requerido'],

  },
  municipio_domicilio_empleado:{
    type:String,
    required: [true,'El municipio domicilio es requerido'],
  },
  estado_civil_empleado:{
    type:String,
    required: [true,'El estado civil empleado es requerido'],
  },
  celular_empleado:{
    type:String,
    required: [true,'El celular empleado es requerido'],
  },
  correo_empleado:{
    type:String,
    unique:[true, 'El correo empleado:{VALUE} ya existe'],
    required: [true,'El correo empleado es requerido'],
  },
  alergia_empleado:{
    type:String,
    required: [true,'El campo alergia es requerido'],
  },
  grupo_sanguineo_emeplado:{
    type:String,
  },
  contacto_emergencia:[{
    nombre_contacto_emergencia:{
        type:String,
        match: /^[a-zA-Z\s]*$/,
    },
    parentesco_empleado:{
        type:String,
        match: /^[a-zA-Z\s]*$/,
    },
    telefono_contacto_emergencia:{
        type:String,
        match: /^\d{10}$/,
    },
  }],
  eps_empleado:{
    type:String,
    required: [true,'La eps empleado es requerido'],
  },
  pension_empleado:{
    type:String,
    required: [true,'El fondo pension empleado es requerido'],
  },
  cuenta_bancaria_empleado:{
    type:String,
    unique:[true, 'la cuenta bancaria del empleado:{VALUE} ya existe'],
    required: [true,'La cuenta bancaria es requerido'], 
  },
  area_empleado:{
    type:String,
    // required: [true,'El area empleado es requerido'],
  }


});

const empleado = mongoose.model('empleado', empleadoSchema);

module.exports = empleado;