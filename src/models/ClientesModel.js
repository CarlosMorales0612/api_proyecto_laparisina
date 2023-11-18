const mongoose = require('mongoose');
const {Schema, model}= mongoose

const ClientesSchema = Schema({
    

    tipo_cliente:{
        type:String,
        required: [true,'El tipo de cliente es requerido'],
    },

    nombre_contacto:{
        type: String,
        required: [true,'El campo nombre es requerido']
    },

    nombre_juridico:{
        type: String,
    },
    
    numero_documento_cliente:{
        type:String,
        unique:[true, 'El numero de documento:{VALUE} ya existe'],
        required: [true,'El campo numero de documento es requerido']
    },

    nit_empresa_cliente:{
        type:String,
        unique:[true, 'El nit:{VALUE} ya existe'],
    },

    correo_cliente:{
        type:String,
        unique:[true, 'El direccion de correo:{VALUE} ya existe'],
        required: [true,'El campo correo es requerido']
    },
    
    telefono_cliente:{
        type: String,
        required: [true,'El campo celular es requerido']
    },

    direccion_cliente:{
        type: String,
        required: [true,'La dirección es requerida']
    },

    barrio_cliente:{
        type: String,
        required: [true,'El barrio es requerido']
    },

    ciudad_cliente:{
        type: String,
        required: [true,'La ciudad es requerida']
    },

    estado_cliente:{
        type:Boolean,
        required:[true, 'El estado es obligatorio'],
        default:false,
    }
})

const Clientes = mongoose.model('Clientes', ClientesSchema);

module.exports = Clientes;
