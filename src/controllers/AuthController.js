const response = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { generarJWT } = require('../helpers/generar-jwt');

const ngrokUrl = 'https://36d7-2800-e2-9780-d2e-b96f-6e67-bfe0-351.ngrok.io'; // Reemplaza con la URL proporcionada por Ngrok 


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
                msg: 'El usuario está inactivo.',
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

// Endpoint para solicitar recuperación de contraseña
const forgotpassword = async (req, res = response) => {
    try {
        const { correo_electronico } = req.body;

        // Verifica si el usuario existe en la base de datos
        const user = await Usuario.findOne({ correo_electronico });

        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        // Genera un token único (puedes usar librerías como `crypto` para generar un token aleatorio)
        const token = crypto.randomBytes(32).toString('hex'); // Ejemplo de generación de token

        // Podrías generar un token único y enviarlo por correo para que el usuario lo use en un endpoint de reseteo de contraseña
        // Guarda el token en la base de datos para este usuario
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Establece la expiración del token (aquí es una hora en milisegundos)
        await user.save();


        // Configura el transporte para enviar correos con Nodemailer (debes configurar con tus propias credenciales de correo)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'isaacdavidmez79@gmail.com', // Coloca tu correo electrónico desde el que se enviará el mensaje
                pass: 'fobd jhlg tsqy wuso' // Coloca tu contraseña del correo electrónico
            }
        });

        // Crea el mensaje de correo electrónico
        const mailOptions = {
            from: 'isaacdavidmez79@gmail.com', // Coloca tu correo electrónico
            to: correo_electronico,
            subject: 'Recuperación de contraseña',
            text: `Hola ${user.correo_electronico}; somos el equipo Parisina, aquí está tu enlace para restablecer la contraseña: http://localhost:4200/#/auth/restaurar-contrasena?token=${token}` //${ngrokUrl}/reset-password?token=${token}
        };

        // Envía el correo electrónico
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ha ocurrido un error al procesar la solicitud' });
    }
};

// Endpoint para resetear la contraseña
const resetpassword = async (req, res = response) => {
    try {
        const { newPassword, token } = req.body;

        // Buscar al usuario cuyo token coincide y aún no ha expirado
        const user = await Usuario.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // El token aún no ha expirado
        });

        if (!user) {
            return res.status(400).json({ message: 'El token es inválido o ha expirado' });
        }

        // Validar la contraseña con la expresión regular
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                message: 'La contraseña no cumple con los requisitos, cuál es el vacile mi papá.',
                details: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y tener al menos 6 caracteres.'
            });
        }

        // Hashea la nueva contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualiza la contraseña del usuario en la base de datos
        user.contrasena_usuario = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ha ocurrido un error al procesar la solicitud' });
    }
};



module.exports = {
    login,
    forgotpassword,
    resetpassword
};