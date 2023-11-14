const Rol = require('../models/RolesModel')
const Usuario = require('../models/Usuario');

const rol_valido = async (rol_usuario = '') => {
    const existeRol = await Rol.findOne({ rol_usuario });
    if (!existeRol) {
        throw new Error(`El rol ${rol_usuario} no está registrado en la BD`);
    }
}

const email_existe = async (correo_electronico = '') => {
    // Verificar si el correo electrónico ya está registrado
    const existeEmail = await Usuario.findOne({ correo_electronico });
    if (existeEmail) {
        throw new Error(`El correo: ${correo_electronico} ya se encuentra registrado`);
    }
}

const existeUsuarioPorId = async (id) => {
    // Verificar si el correo electrónico ya está registrado
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario) {
        throw new Error(`El id no existe ${ id }`);
    }
}


module.exports = {
    rol_valido,
    email_existe,
    existeUsuarioPorId
}