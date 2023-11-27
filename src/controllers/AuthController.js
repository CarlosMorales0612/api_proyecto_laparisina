const response = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {
    const { correo_electronico, contrasena_usuario } = req.body;

    try {

        //Verificar si existe el email
        const usuario = await Usuario.findOne({ correo_electronico });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña incorrectos.'
            });
        }
        //Si el usuario está activo
        if (!usuario.estado_usuario) {
            return res.status(400).json({
                msg: 'El usuario está inactivo.'
            });
        }
        //Verificar la contraseña
        const validarContraseña = bcrypt.compareSync(contrasena_usuario, usuario.contrasena_usuario);
        if (!validarContraseña) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña incorrectos.'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        //Devuelve el usuario loggeado y el token correspondiente
        res.json({
            usuario,
            token
        })

    } catch (err) {



        return res.status(500).json({
            msg: 'Hable con el admin   '
        })
    };

}


module.exports = {
    login
};