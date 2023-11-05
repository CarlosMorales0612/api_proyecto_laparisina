const {Schema, model} = require ('mongoose');


const RolScheema = ({
    rol: {
        type: 'string',
        required: [true, 'El rol es obligatorio']
    }

})


module.exports = model( 'Rol', RolScheema)