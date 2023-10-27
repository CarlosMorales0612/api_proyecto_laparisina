const CategoriaProducto = require('../models/CategoriaModel');
const multer = require('multer')
const multerConfig = require('../../utils/multerConfig')

const upload = multer(multerConfig).single('image');//Cuando llave y valor es igual se puede dejar solo un nombre ej: storage

//funcion para subir imagen ----------------------------------------------------------------------------------------------------------------
async function subirImagen(req, res, next) {
  upload(req,res, function(error) {
    if (error) {
      res.json({ message: error });
    }
    return next();
  })
}

// Obtener todas las categorias -------------------------------------------------------------------------------------------------------------
async function obtenerTodasLasCategorias(req, res) {
  try {
    const categorias = await CategoriaProducto.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorias.' });
  }
}

// Obtener una categoria por ID --------------------------------------------------------------------------------------------------------------
async function obtenerCategoriasPorId(req, res) {
  const { id } = req.params;
  try {
    const categoria = await CategoriaProducto.findById(id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoria no encontrada.' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoria.' });
  }
}

// Crear una nueva categoria -----------------------------------------------------------------------------------------------------------------
async function crearCategoria(req, res) {
  const { nombre_categoria_producto, descripcion_categoria_producto} = req.body

  //Expresión regular para validar el nombre de la categoría
  const nombreExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
  const longitudMaximaNombre = 20;

  // Expresión regular para validar la descripcion de la categoría
  const descripcionExpReg = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ,.-]+$/;
  const longitudMaximaDescripcion = 100;
  
  if (!nombreExpReg.test(nombre_categoria_producto)){
    return res.status(400).json({ error: 'El nombre solo permite letras.' });
  }
  if (nombre_categoria_producto.length > longitudMaximaNombre) {
    return res.status(400).json({ error: 'El nombre debe tener máximo 20 caracteres.' });
  }

  if (!descripcionExpReg.test(descripcion_categoria_producto)) {
    return res.status(400).json({ error: 'La descripción solo permite letras y los signos ",." ' });
  }
  if (descripcion_categoria_producto.length > longitudMaximaDescripcion) {
    return res.status(400).json({ error: 'La descripción debe tener máximo 100 caracteres.' });
  }

  const categoria = new CategoriaProducto(req.body);
  try {
      if (req.file && req.file.filename) {
        categoria.imagen_categoria_producto = req.file.filename;
        console.log(categoria.imagen_categoria_producto)
      } 
      // Guarda la categoría en la base de datos
      await categoria.save();
      res.status(201).json({
          message: 'Categoría creada exitosamente.',
      });
  } catch (error) {
    // Captura el error de Mongoose si es debido a la restricción unique
    if (error.code === 11000 && error.keyPattern.nombre_categoria_producto) {
      // Código 11000 indica un error de nombre duplicado
      res.status(400).json({ error: `La categoría ${req.body.nombre_categoria_producto} ya existe.` });
    } else {
      // Otro tipo de error, envía una respuesta de error genérica
      res.status(500).json({ error: 'Error al crear la categoría.' });
    }
  }
}

// Actualizar una categoria por ID -----------------------------------------------------------------------------------------------------------
async function actualizarCategoria(req, res) {
  const { id } = req.params;
  const { nombre_categoria_producto, descripcion_categoria_producto } = req.body;

  // Expresión regular para validar el nombre de la categoría
  const nombreExpReg = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]{1,20}$/;
  const longitudMaximaNombre = 20;

  // Expresión regular para validar la descripcion de la categoría
  const descripcionExpReg = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ,.-]+$/;
  const longitudMaximaDescripcion = 100;

  if (!nombreExpReg.test(nombre_categoria_producto)) {
    return res.status(400).json({ error: 'El nombre solo permite letras.' });
  }
  if (nombre_categoria_producto.length > longitudMaximaNombre) {
    return res.status(400).json({ error: 'El nombre debe tener máximo 20 caracteres.' });
  }

  if (!descripcionExpReg.test(descripcion_categoria_producto)) {
    return res.status(400).json({ error: 'La descripción solo permite letras y los signos ",." ' });
  }
  if (descripcion_categoria_producto.length > longitudMaximaDescripcion) {
    return res.status(400).json({ error: 'La descripción debe tener máximo 100 caracteres.' });
  }

  try {
    let actualizarCategoria = req.body;

    // Si se proporciona una nueva imagen, actualiza el campo imagen_categoria_producto
    if (req.file && req.file.filename) {
      actualizarCategoria.imagen_categoria_producto = req.file.filename;
    } else {
      const categoria = await CategoriaProducto.findById(req.params.id);
      actualizarCategoria.imagen_categoria_producto = categoria.imagen_categoria_producto
    }

    // Realiza la actualización en la base de datos
    const categoriaActualizada = await CategoriaProducto.findByIdAndUpdate(id, actualizarCategoria, { new: true });

    // Verifica si la categoría fue encontrada y actualizada correctamente
    if (!categoriaActualizada) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }
    
    // Si la categoría se actualiza exitosamente, envía un mensaje de éxito en la respuesta
    res.status(200).json({ message: 'Categoría actualizada exitosamente.', categoria: categoriaActualizada });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría.' });
  }
}

// Eliminar una categoria por ID -------------------------------------------------------------------------------------------------------------
async function eliminarCategoria(req, res) {
  const { id } = req.params;
  try {
    const categoria = await CategoriaProducto.findByIdAndDelete(id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }
    res.status(200).json({ message: 'Categoría eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría.' });
  }
}

//Exportar funciones -------------------------------------------------------------------------------------------------------------------------
module.exports = {
  obtenerTodasLasCategorias,
  obtenerCategoriasPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  subirImagen
};
