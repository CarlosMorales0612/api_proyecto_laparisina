const Producto = require('../models/ProductoModel');
const multer = require('multer')
const multerConfig = require('../../utils/multerConfig')

//---------------------------------------------------------------------------------------------------------------------------------------
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

// Obtener todos los productos ----------------------------------------------------------------------------------------------------------
async function obtenerTodosLosProductos(req, res) {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
}

// Obtener un producto por ID -----------------------------------------------------------------------------------------------------------
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

// Actualizar un producto por ID --------------------------------------------------------------------------------------------------------------
async function actualizarProducto(req, res) {
  const { id } = req.params;
  const { codigo_producto, nombre_producto, nombre_categoria_producto, descripcion_producto, precio_ico, precio_por_mayor_ico, durabilidad_producto, ingredientes_producto, imagen_producto, estado_producto } = req.body;
  try {
    let actualizarProducto = req.body;

    // Si se proporciona una nueva imagen, actualiza el campo imagen_producto
    if (req.file && req.file.filename) {
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

// Eliminar un producto por ID --------------------------------------------------------------------------------------------------------------
async function eliminarProducto(req, res) {
  const { id } = req.params;
  try {
    const producto = await Producto.findByIdAndDelete(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.status(200).json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
}

//Exportar funciones -------------------------------------------------------------------------------------------------------------------------
module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  subirImagen
};
