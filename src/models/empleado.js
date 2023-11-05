const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  
codigo_rotulacion_empleado: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]+$/, 
  },
  
  nombre_empleado: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]*$/, 
  },
  tipo_contrato_empleado: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
    
  },
  fecha_inicio_empleado: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        
        return value < this.fecha_vencimiento_contrato_empleado;
        
      },
      message: 'La fecha de inicio del contrato debe ser anterior a la fecha de vencimiento del contrato.'
    }
  },
      
  fecha_vencimiento_contrato_empleado:{
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        
        return value > this.fecha_inicio_empleado;
        
      },
      message: 'La fecha de vencimiento del contrato debe ser superior a la fecha de inicio del contrato.'
    }
  },
  
  tipo_documento_empleado:{
    type: String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
  },
  identificacion_empleado:{
    type: String,
    required: true,
    match: /^\d{10}$/,
  },
  fecha_nacimiento_empleado:{
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value < new Date();
      },
      message: 'La fecha de nacimiento debe ser anterior a la fecha actual',
    },
  },
  
  edad_empleado: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger, 
      message: 'La edad debe ser un número entero positivo.',
    },
  },
  lugar_nacimiento_empleado:{
    type: String,
    required: true,
    match: /^[a-zA-Z\s]*$/, 
  },
  direccion_empleado:{
    type: String,
    required: true,

  },
  municipio_domicilio_empleado:{
    type:String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
  },
  estado_civil_empleado:{
    type:String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
  },
  celular_empleado:{
    type:String,
    required: true,
    match: /^\d{10}$/,
  },
  correo_empleado:{
    type:String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  alergia_empleado:{
    type:String,
    required: true,
  },
  grupo_sanguineo_emeplado:{
    type:String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
  },
  contacto_emergencia:[{
    nombre_contacto_emergencia:{
        type:String,
        required: true,
        match: /^[a-zA-Z\s]*$/,
    },
    parentesco_empleado:{
        type:String,
        required: true,
        match: /^[a-zA-Z\s]*$/,
    },
    telefono_contacto_emergencia:{
        type:String,
        required: true,
        match: /^\d{10}$/,
    },
  }],
  eps_empleado:{
    type:String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
  },
  pension_empleado:{
    type:String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
  },
  cuenta_bancaria_empleado:{
    type:String,
    required: true,
    match: /^[0-9]+$/, 
  },
  area_empleado:{
    type:String,
    required: true,
    match: /^[a-zA-Z\s]*$/,
  }


});

const empleado = mongoose.model('empleado', empleadoSchema);

module.exports = empleado;
