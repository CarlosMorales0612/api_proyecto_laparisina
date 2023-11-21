const jwt = require('jsonwebtoken');
const USuario = require('../models/Usuario');
const Usuario = require('../models/Usuario');

const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay un token en la petición'
        });
    }
    console.log(token);


    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);


        if( !usuario) {
            return res.status(401).json({
                msg: 'Token no válido, usuario inexistente'
            });
        }

        //Verificar si el uid tiene estado en true
        if( !usuario.estado_usuario){
            return res.status(401).json({
                msg: 'Token no válido, estado falso'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    };
};



module.exports = {
    validarJWT
}