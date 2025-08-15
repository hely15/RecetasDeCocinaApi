const express = require("express")
const User = require("../db/models/User")
const Recipe = require("../db/models/Recipe")
const { createUserDTO, updateUserDTO } = require("../dto/user.dto")
const validatorFieldsDTO = require("../middlewares/validatorFieldsDTO")

const router = express.Router()

// GET /api/users - Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-__v")
    res.json({
      success: true,
      message: "Usuarios obtenidos exitosamente",
      data: users,
      total: users.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener usuarios",
      error: error.message,
    })
  }
})

// GET /api/users/:id - Obtener usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Usuario obtenido exitosamente",
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener usuario",
      error: error.message,
    })
  }
})

// POST /api/users - Crear nuevo usuario
router.post("/", createUserDTO, validatorFieldsDTO, async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      data: user,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al crear usuario",
      error: error.message,
    })
  }
})

// PUT /api/users/:id - Actualizar usuario
router.put("/:id", updateUserDTO, validatorFieldsDTO, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select(
      "-__v",
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Usuario actualizado exitosamente",
      data: user,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al actualizar usuario",
      error: error.message,
    })
  }
})

// DELETE /api/users/:id - Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Usuario eliminado exitosamente",
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar usuario",
      error: error.message,
    })
  }
})

// GET /api/users/:id/recipes - Obtener recetas de un usuario
router.get("/:id/recipes", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    const recipes = await Recipe.find({ usuario: req.params.id }).populate("usuario", "nombre email").select("-__v")

    res.json({
      success: true,
      message: "Recetas del usuario obtenidas exitosamente",
      data: recipes,
      total: recipes.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener recetas del usuario",
      error: error.message,
    })
  }
})

module.exports = router
