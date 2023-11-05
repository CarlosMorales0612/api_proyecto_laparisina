import jwt from 'jsonwebtoken'
import { models } from 'mongoose';
import models from '../models'

export default {
    encode: async(_id, rol_usuario, correo_electronico) => {
        const token = jwt.sign({_id: _id, rol_usuario: rol_usuario, correo_electronico: correo_electronico}, 'proyecto_laparisina', {expiresIn: '1d'});
        return token;
    },
    decode: async(token) => {
        try {
            const {_id} = await jwt.verify(token, 'proyecto_laparisina');
            const usuario = models.Usuario.findOne({_id: _id, estado_usuario: true});
            if(usuario){
                return usuario;
            }
            return false;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}