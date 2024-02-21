// middleware.js
const jwt = require('jsonwebtoken');

function decodificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.usuario = decoded; // Guardar el usuario decodificado en la solicitud para uso posterior
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
}

module.exports = decodificarToken;
