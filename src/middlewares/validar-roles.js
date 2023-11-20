const { response } = require('express');

const esAdminRol = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol  sin validar el token primero'
        });
    }

    const { rol_usuario, correo_electronico } = req.usuario;

    if (rol_usuario && rol_usuario.nombre_rol === 'Administrador') {
        return res.status(401).json({
            msg: `${correo_electronico} no es Administrador, no puede hacer esto`
        });
    }
    next();
}


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