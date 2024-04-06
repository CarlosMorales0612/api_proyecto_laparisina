const Usuario = require('../models/Usuario');
const { response } = require('express');

// const esAdminRol = async (req, res, next) => {
//     if (!req.usuario) {
//         return res.status(500).json({
//             msg: 'Se quiere verificar el rol sin validar el token primero'
//         });
//     }

//     try {
//         // Obtener el nombre del rol a partir del ID almacenado en el usuario
//         const usuario = await Usuario.findById(req.usuario._id).populate('rol_usuario');
//         const { nombre_rol } = usuario.rol_usuario;

//         const { correo_electronico } = req.usuario;

//         // Verificar si el nombre del rol coincide con los roles permitidos
//         if (nombre_rol !== 'Super Admin' && nombre_rol !== 'Administrador') {
//             return res.status(401).json({
//                 msg: `${correo_electronico} no es Super Admin o Administrador, no puede hacer esto`
//             });
//         }

//         // Si el usuario tiene el rol adecuado, permitir continuar con la ejecución
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             msg: 'Error al verificar el rol del usuario'
//         });
//     }
// };

const tienePermiso = async (req, res, next, permisoRequerido) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    try {
        // Obtener el nombre del rol a partir del ID almacenado en el usuario
        const usuario = await Usuario.findById(req.usuario._id).populate('rol_usuario');
        const rolUsuario = usuario.rol_usuario;
        const { correo_electronico } = req.usuario;

        if (!rolUsuario) {
            return res.status(401).json({
                msg: 'El usuario no tiene un rol asignado'
            });
        }

        const permisos = rolUsuario.permisos_rol.map(permiso => permiso.nombre_permiso);

        if (!permisos.includes(permisoRequerido)) {
            return res.status(401).json({
                msg: `${req.usuario.correo_electronico} no tiene el permiso necesario (${permisoRequerido}) para realizar esta acción`
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

// Verificar el permiso 'Dashboard'
const permiso_dashboard = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Dashboard');
};

// Verificar el permiso 'Roles'
const permiso_roles = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Roles');
};

// Verificar el permiso 'Usuarios'
const permiso_usuarios = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Usuarios');
};

// Verificar el permiso 'Usuarios Cliente'
const permiso_usuarios_cliente = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Usuarios Cliente');
};

// Verificar el permiso 'Categorías'
const permiso_categorias = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Categorias');
};

// Verificar el permiso 'Categorías Cliente'
const permiso_categorias_cliente = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Categorias Cliente');
};

// Verificar el permiso 'Productos'
const permiso_productos = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Productos');
};

// Verificar el permiso 'Productos Cliente'
const permiso_productos_cliente = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Productos Cliente');
};

// Verificar el permiso 'Empleados'
const permiso_empleados = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Empleados');
};

// Verificar el permiso 'Clientes'
const permiso_clientes = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Clientes');
};

// Verificar el permiso 'Pedidos'
const permiso_pedidos = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Pedidos');
};

// Verificar el permiso 'Pedidos Empleado'
const permiso_pedidos_empleado = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Pedidos Empleado');
};

// Verificar el permiso 'Pedidos Empleado'
const permiso_pedidos_cliente = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Pedidos Cliente');
};

// Verificar el permiso 'Orden de producción'
const permiso_orden_produccion = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Orden de produccion');
};

// Verificar el permiso 'Orden de producción Empleado'
const permiso_orden_produccion_empleado = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Orden de produccion Empleado');
};

// Verificar el permiso 'Ventas'
const permiso_ventas = async (req, res, next) => {
    await tienePermiso(req, res, next, 'Ventas');
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
    tieneRol,
    permiso_dashboard,
    permiso_roles,
    permiso_usuarios,
    permiso_usuarios_cliente,
    permiso_categorias,
    permiso_categorias_cliente,
    permiso_productos,
    permiso_productos_cliente,
    permiso_empleados,
    permiso_pedidos,
    permiso_pedidos_empleado,
    permiso_pedidos_cliente,
    permiso_clientes,
    permiso_orden_produccion,
    permiso_orden_produccion_empleado,
    permiso_ventas
}