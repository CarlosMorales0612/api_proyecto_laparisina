const mongoose = require('mongoose');
const {Schema, model}= mongoose

const TransporteSchema = Schema({
    ciudad_cliente:{
        type: String,
        required: [true,'La ciudad es requerida'],
        unique: true,
    },

    precio_transporte:{
        type: Number,
        required: [true, 'El precio del transporte es requerido']
    },

    estado_transporte:{
        type:Boolean,
        required:[true, 'El estado es obligatorio'],
        default:true,
    }
})

const Transporte = mongoose.model('Transporte', TransporteSchema);

module.exports = Transporte;