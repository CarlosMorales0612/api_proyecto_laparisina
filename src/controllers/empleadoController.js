//Importar paquetes requeridos de node
const {response} = require('express')

//Importación de los modelos
const Empleado = require('../models/empleado') // la importación de modelos no se instancia con llaves para evitar errores

//Consultar
const empleadoGet = async(req, res = response) => {
    const {codigo_rotulacion_empleado} = req.query //Desestructuración

    //Consultar todos los usuarios
    const empleados = await Empleado.find() // cuando algo es asincronico debe ejecutarse con await(espera)

    res.json({
        empleados
    })
}

//Registrar o insertar
const empleadoPost = async(req,res = response) => {
    const body = req.body //Captura de atributos
    let mensaje = ''
    console.log(body)

    try {
        const empleado = new Empleado(body) //Instanciar el objeto
        await empleado.save()
        mensaje = 'El empleado se creo exitosamente'
    } catch (error) {
            if(error.name === 'ValidationError'){
                console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            } else if (error.name === 'MongoError' || error.code === 11000){
                mensaje = 'El nombre del empleado ya existe'
            } else {
                console.error('Ocurrió un error al crear el empleado:', error.message);
                mensaje = 'Ocurrió un error al crear el empleado';
            }
    }

    res.json({
        msg: mensaje
    })
}

//Modificar
const empleadoPut = async(req,res = response) => {
  
    const {codigo_rotulacion_empleado,nombre_empleado,tipo_contrato_empleado,fecha_inicio_empleado,fecha_vencimiento_contrato_empleado,tipo_documento_empleado,identificacion_empleado,fecha_nacimiento_empleado,edad_empleado,lugar_nacimiento_empleado,direccion_empleado,municipio_domicilio_empleado,estado_civil_empleado,celular_empleado,correo_empleado,alergia_empleado,grupo_sanguineo_emeplado,contacto_emergencia,eps_empleado,pension_empleado,cuenta_bancaria_empleado,area_empleado} = req.body
    let mensaje = ''

    try {
        const empleado = await Empleado.findOneAndUpdate({codigo_rotulacion_empleado: codigo_rotulacion_empleado},{nombre_empleado: nombre_empleado,tipo_contrato_empleado: tipo_contrato_empleado,fecha_inicio_empleado: fecha_inicio_empleado, fecha_vencimiento_contrato_empleado: fecha_vencimiento_contrato_empleado,tipo_documento_empleado:tipo_documento_empleado,identificacion_empleado:identificacion_empleado,fecha_nacimiento_empleado:fecha_nacimiento_empleado,edad_empleado:edad_empleado,lugar_nacimiento_empleado:lugar_nacimiento_empleado,direccion_empleado:direccion_empleado,municipio_domicilio_empleado:municipio_domicilio_empleado,estado_civil_empleado:estado_civil_empleado,celular_empleado:celular_empleado,correo_empleado:correo_empleado,alergia_empleado:alergia_empleado,grupo_sanguineo_emeplado:grupo_sanguineo_emeplado,contacto_emergencia:contacto_emergencia,pension_empleado:pension_empleado,cuenta_bancaria_empleado:cuenta_bancaria_empleado,area_empleado:area_empleado}) //Buscar por el nombre y modificar
        mensaje = 'El empleado se actualizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al actualizar el empleado'
    }

    res.json({
        msg: mensaje
        
    })
}

//Eliminar
const empleadoDelete = async(req,res = response) => {
  
    const {codigo_rotulacion_empleado} = req.body
    let mensaje = ''

    try {
        const empleado = await Empleado.deleteOne({codigo_rotulacion_empleado: codigo_rotulacion_empleado}) //Buscar por el id y eliminar el registro
        mensaje = 'El empleado se elimino exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al eliminar el empleado'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    empleadoGet,
    empleadoPost,
    empleadoPut,
    empleadoDelete
}