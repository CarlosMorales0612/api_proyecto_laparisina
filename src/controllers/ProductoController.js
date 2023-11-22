const Producto = require('../models/ProductoModel');
const multer = require('multer')
const multerConfig = require('../../utils/multerConfig')
const fs = require('fs');
const path = require('path');

//----------------------------------------------------------------------------------------------------------------------------------------
const upload = multer(multerConfig).single('image');//nombre que debe tener el campo file al subir la imagen 'image'

//funcion para subir imagen
async function subirImagen(req, res, next) {
  upload(req,res, function(error) {
    if (error) {
      res.json({ message: error });
    }
    return next();
  })
}

// Función para eliminar una imagen por su nombre ----------------------------------------------------------------------------------------
async function eliminarImagen(nombreArchivo) {
  const rutaImagen = path.join(__dirname, '../../uploads/', nombreArchivo);

  try {
    // Verifica si el archivo existe antes de intentar eliminarlo
    await fs.promises.access(rutaImagen, fs.constants.F_OK);
    
    // Elimina el archivo
    await fs.promises.unlink(rutaImagen);

    console.log(`Imagen ${nombreArchivo} eliminada exitosamente.`);
  } catch (error) {
    console.error(`Error al intentar eliminar la imagen ${nombreArchivo}: ${error.message}`);
    throw error; // Puedes decidir manejar el error de otra manera según tus necesidades
  }
}

// Obtener todos los productos ------------------------------------------------------------------------------------------------------------
async function obtenerTodosLosProductos(req, res) {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
}

// Obtener un producto por ID --------------------------------------------------------------------------------------------------------------
async function obtenerProductoPorId(req, res) {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
}

// Crear un nuevo producto ------------------------------------------------------------------------------------------------------------------
async function crearProducto(req, res) {
  const { codigo_producto, nombre_producto, nombre_categoria_producto, descripcion_producto, precio_ico, precio_por_mayor_ico, durabilidad_producto, ingredientes_producto } = req.body
  
  //Expresión regular para validar el código del producto
  const codigoExpReg = /^[0-9]{3,4}$/;

  //Expresión regular para validar el nombre del producto
  const nombreExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
  const longitudMaximaNombre = 20;

  // Expresión regular para validar la descripcion del producto
  const descripcionExpReg = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ,.\s:-]+$/;
  const longitudMaximaDescripcion = 500;

  // Expresión regular para validar el precio_ico y precio_por_mayor_ico del producto
  const precioExpReg = /^[0-9]{4,6}$/;
  const longitudMinimaPrecio = 4;
  const longitudMaximaPrecio = 6;
  const valorMinimoPrecio = 0;

  //Expresión regular para validar los ingredientes
  const ingredientesExpReg = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s,.:'-]+$/;
  const longitudMaximaIngredientes = 500

  //Validación campo codigo_producto
  if (!codigoExpReg.test(codigo_producto)){
    return res.status(400).json({ error: 'El campo código producto solo permite números de 3 y 4 dígitos.' });
  }
  //Validación campo nombre_producto
  if (!nombreExpReg.test(nombre_producto)){
    return res.status(400).json({ error: 'El campo nombre producto solo permite letras.' });
  }
  if (nombre_producto.length > longitudMaximaNombre) {
    return res.status(400).json({ error: 'El campo nombre producto debe tener máximo 20 caracteres.' });
  }
  //Validación campo nombre_categoria_producto
  if (!nombreExpReg.test(nombre_categoria_producto)){
    return res.status(400).json({ error: 'El campo nombre categoría solo permite letras.' });
  }
  if (nombre_categoria_producto.length > longitudMaximaNombre) {
    return res.status(400).json({ error: 'El campo nombre categoría debe tener máximo 20 caracteres.' });
  }
  //Validación campo descripcion_producto
  if (!descripcionExpReg.test(descripcion_producto)) {
    return res.status(400).json({ error: 'El campo descripción solo permite letras y los signos ",." ' });
  }
  if (descripcion_producto.length > longitudMaximaDescripcion) {
    return res.status(400).json({ error: 'El campo descripción debe tener máximo 500 caracteres.' });
  }
  //Validación campo precio_ico
  if (!precioExpReg.test(precio_ico)) {
    return res.status(400).json({ error: 'El campo precio solo permite números.' });
  }
  if (precio_ico.length < longitudMinimaPrecio || precio_ico < valorMinimoPrecio) {
    return res.status(400).json({ error: 'El precio es demasiado bajo' });
  }
  if (precio_ico.length > longitudMaximaPrecio) {
    return res.status(400).json({ error: 'El precio es demasiado alto' });
  }
  //Validación campo precio_por_mayor_ico
  if (!precioExpReg.test(precio_por_mayor_ico)) {
    return res.status(400).json({ error: 'El campo precio solo permite números.' });
  }
  if (precio_por_mayor_ico.length < longitudMinimaPrecio || precio_por_mayor_ico < valorMinimoPrecio) {
    return res.status(400).json({ error: 'El precio es demasiado bajo' });
  }
  if (precio_por_mayor_ico.length > longitudMaximaPrecio) {
    return res.status(400).json({ error: 'El precio es demasiado alto' });
  }
  //Validación campo ingredientes_producto
  if (!ingredientesExpReg.test(ingredientes_producto)) {
    return res.status(400).json({ error: 'Caracteres incorrectos en el campo ingredientes' });
  }
  if (ingredientes_producto.length > longitudMaximaIngredientes) {
    return res.status(400).json({ error: 'El campo ingredientes debe tener máximo 500 caracteres.' });
  }
  
  const producto = new Producto(req.body);
  try {
      if (req.file && req.file.filename) {
        producto.imagen_producto = req.file.filename;
        console.log(producto.imagen_producto)
      } 
      // Guarda el producto en la base de datos
      await producto.save();
      res.status(201).json({
          message: 'Producto creado exitosamente.',
      });
  } catch (error) {
    // Captura el error de Mongoose si es debido a la restricción única
    if (error.code === 11000 && error.keyPattern.nombre_producto) {
      // Código 11000 indica un error de clave duplicada (duplicado único)
      res.status(400).json({ error: `El producto con nombre ${req.body.nombre_producto} ya existe.` });
    } else if (error.code === 11000 && error.keyPattern.codigo_producto){
      res.status(400).json({ error: `El producto con código ${req.body.codigo_producto} ya existe.` });
    } else {
      // Otro tipo de error, envía una respuesta de error genérica
      res.status(500).json({ error: 'Error al crear el producto.' });
    }
  }
}

// Actualizar un producto por ID ------------------------------------------------------------------------------------------------------------
async function actualizarProducto(req, res) {
  const { id } = req.params;
  const { codigo_producto, nombre_producto, nombre_categoria_producto, descripcion_producto, precio_ico, precio_por_mayor_ico, durabilidad_producto, ingredientes_producto, imagen_producto, estado_producto } = req.body;
  
  //Expresión regular para validar el código del producto
  const codigoExpReg = /^[0-9]{3,4}$/;

  //Expresión regular para validar el nombre del producto
  const nombreExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
  const longitudMaximaNombre = 20;

  // Expresión regular para validar la descripcion del producto
  const descripcionExpReg = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ,.\s-]+$/;
  const longitudMaximaDescripcion = 500;

  // Expresión regular para validar el precio_ico y precio_por_mayor_ico del producto
  const precioExpReg = /^[0-9]{4,6}$/;
  const longitudMinimaPrecio = 4;
  const longitudMaximaPrecio = 6;
  const valorMinimoPrecio = 0;

  //Expresión regular para validar los ingredientes
  const ingredientesExpReg = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s,.:'-]+$/;
  const longitudMaximaIngredientes = 500

  //Validación campo codigo_producto
  if (!codigoExpReg.test(codigo_producto)){
    return res.status(400).json({ error: 'El campo código producto solo permite números de 3 y 4 dígitos.' });
  }
  //Validación campo nombre_producto
  if (!nombreExpReg.test(nombre_producto)){
    return res.status(400).json({ error: 'El campo nombre producto solo permite letras.' });
  }
  if (nombre_producto.length > longitudMaximaNombre) {
    return res.status(400).json({ error: 'El campo nombre producto debe tener máximo 20 caracteres.' });
  }
  //Validación campo nombre_categoria_producto
  if (!nombreExpReg.test(nombre_categoria_producto)){
    return res.status(400).json({ error: 'El campo nombre categoría solo permite letras.' });
  }
  if (nombre_categoria_producto.length > longitudMaximaNombre) {
    return res.status(400).json({ error: 'El campo nombre categoría debe tener máximo 20 caracteres.' });
  }
  //Validación campo descripcion_producto
  if (!descripcionExpReg.test(descripcion_producto)) {
    return res.status(400).json({ error: 'El campo descripción solo permite letras y los signos ",." ' });
  }
  if (descripcion_producto.length > longitudMaximaDescripcion) {
    return res.status(400).json({ error: 'El campo descripción debe tener máximo 500 caracteres.' });
  }
  //Validación campo precio_ico
  if (!precioExpReg.test(precio_ico)) {
    return res.status(400).json({ error: 'El campo precio solo permite números.' });
  }
  if (precio_ico.length < longitudMinimaPrecio || precio_ico < valorMinimoPrecio) {
    return res.status(400).json({ error: 'El precio es demasiado bajo' });
  }
  if (precio_ico.length > longitudMaximaPrecio) {
    return res.status(400).json({ error: 'El precio es demasiado alto' });
  }
  //Validación campo precio_por_mayor_ico
  if (!precioExpReg.test(precio_por_mayor_ico)) {
    return res.status(400).json({ error: 'El campo precio solo permite números.' });
  }
  if (precio_por_mayor_ico.length < longitudMinimaPrecio || precio_por_mayor_ico < valorMinimoPrecio) {
    return res.status(400).json({ error: 'El precio es demasiado bajo' });
  }
  if (precio_por_mayor_ico.length > longitudMaximaPrecio) {
    return res.status(400).json({ error: 'El precio es demasiado alto' });
  }
  //Validación campo ingredientes_producto
  if (!ingredientesExpReg.test(ingredientes_producto)) {
    return res.status(400).json({ error: 'Caracteres incorrectos en el campo ingredientes' });
  }
  if (ingredientes_producto.length > longitudMaximaIngredientes) {
    return res.status(400).json({ error: 'El campo ingredientes debe tener máximo 500 caracteres.' });
  }

  try {
    // Obtener el producto existente antes de la actualización
    const productoExistente = await Producto.findById(id);

    // Verifica si el nombre ha cambiado
    const nombreCambiado = nombre_producto !== productoExistente.nombre_producto;

    // Realiza la validación de duplicados solo si el nombre ha cambiado
    if (nombreCambiado) {
      const productoDuplicado = await Producto.findOne({ nombre_producto });

      if (productoDuplicado) {
        return res.status(400).json({ error: `El producto ${nombre_producto} ya existe.` });
      }
    }

    let actualizarProducto = req.body;

    // Si se proporciona una nueva imagen, actualiza el campo imagen_producto
    if (req.file && req.file.filename) {
      // Elimina la imagen existente antes de asignar la nueva
      if (productoExistente.imagen_producto) {
        await eliminarImagen(productoExistente.imagen_producto);
      }

      // Asigna la nueva imagen al objeto de actualización
      actualizarProducto.imagen_producto = req.file.filename;
    } else {
      const producto = await Producto.findById(req.params.id);
      actualizarProducto.imagen_producto = producto.imagen_producto
    }

    // Realiza la actualización en la base de datos
    const productoActualizado = await Producto.findByIdAndUpdate(id, actualizarProducto, { new: true });

    // Verifica si el producto fue encontrado y actualizada correctamente
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    
    // Si el producto se actualiza exitosamente, envía un mensaje de éxito en la respuesta
    res.status(200).json({ message: 'Producto actualizado exitosamente.', producto: productoActualizado });
  } catch (error) {
    // Captura el error de Mongoose si es debido a la restricción única
    if (error.code === 11000 && error.keyPattern.nombre_producto) {
      // Código 11000 indica un error de clave duplicada (duplicado único)
      res.status(400).json({ error: `El producto con nombre ${req.body.nombre_producto} ya existe.` });
    } else if (error.code === 11000 && error.keyPattern.codigo_producto){
      res.status(400).json({ error: `El producto con código ${req.body.codigo_producto} ya existe.` });
    } else {
      // Otro tipo de error, envía una respuesta de error genérica
      res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
  }
}

// Cambiar el estado de un producto por ID ------------------------------------------------------------------------------------------------------------
async function cambiarEstadoProducto(req, res) {
  const { id } = req.params;
  try {
    const verificarEstado = await Producto.findById(id)
    if (!verificarEstado) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      const estado = verificarEstado.estado_producto

      const producto = await Producto.findByIdAndUpdate(
        id,
        { $set: { estado_producto: !estado } }, // Cambia a estado diferebte que tiene
        { new: true }
      );
    }
    res.status(200).json({ message: 'Estado del producto cambiado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado del producto.' });
  }
}

//Exportar funciones ------------------------------------------------------------------------------------------------------------------------
module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  cambiarEstadoProducto,
  subirImagen
};
