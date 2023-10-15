const User = require('../models/User');

// Obtener todos los usuarios
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
}

// Obtener un usuario por ID
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
}

// Crear un nuevo usuario
async function createUser(req, res) {
  const { correo_electronico, contaseña_usuario, rol_usuario } = req.body;
  try {
    const user = new User({ correo_electronico, contaseña_usuario, rol_usuario });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario.' });
  }
}

// Actualizar un usuario por ID
async function updateUser(req, res) {
  const { id } = req.params;
  const { correo_electronico, contaseña_usuario, rol_usuario } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { correo_electronico, contaseña_usuario, rol_usuario }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
}

// Eliminar un usuario por ID
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
}



module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
