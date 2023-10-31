import token from '../services/token'

export default {
    verifyClient: async(req, res, next) => {
        if(!req.headers.token){
            res.status(404).send({
                message: 'No se envio el token correctamente'
            });
        }
        const response = await token.decode(req.headers.token);
        if(response){
            if(response.rol == 'Cliente' || response.rol == 'Admin'){
                next();
            }else{
                res.status(403).send({
                    message: 'No esta permitido visitar esta ruta'
                });
            }
        }else{
            res.status(403).send({
                message: 'El token no es valido'
            });
        }
    },
    verifyAdmin: async(req, res, next) => {
        if(!req.headers.token){
            res.status(404).send({
                message: 'No se envio el token correctamente'
            });
        }
        const response = await token.decode(req.headers.token);
        if(response){
            if(response.rol == 'Admin'){
                next();
            }else{
                res.status(403).send({
                    message: 'No esta permitido visitar esta ruta'
                });
            }
        }else{
            res.status(403).send({
                message: 'El token no es valido'
            });
        }
    }
}