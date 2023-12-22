const Usuario = require('../models/Usuario');
const { response } = require('express');

const esAdminRol = async (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    try {
        // Obtener el nombre del rol a partir del ID almacenado en el usuario
        const usuario = await Usuario.findById(req.usuario._id).populate('rol_usuario');
        const { nombre_rol } = usuario.rol_usuario;

        const { correo_electronico } = req.usuario;

        // Verificar si el nombre del rol coincide con los roles permitidos
        if (nombre_rol !== 'Super Admin' && nombre_rol !== 'Administrador') {
            return res.status(401).json({
                msg: `${correo_electronico} no es Super Admin o Administrador, no puede hacer esto`
            });
        }

        // Si el usuario tiene el rol adecuado, permitir continuar con la ejecución
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al verificar el rol del usuario'
        });
    }
};


const tieneRol = (...roles) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol  sin validar el token primero'
            });
        }

        if (roles.includes(req.usuario.rol_usuario.nombre_rol)) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            });
        }

        next();
    }


}


module.exports = {
    esAdminRol,
    tieneRol
}