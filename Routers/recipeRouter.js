const express = require("express")
const Recipe = require("../db/models/Recipe")
const Ingredient = require("../db/models/Ingredient")
const User = require("../db/models/User")
const { createRecipeDTO, updateRecipeDTO } = require("../dto/recipe.dto")
const validatorFieldsDTO = require("../middlewares/validatorFieldsDTO")

const router = express.Router()

// GET /api/recipes - Obtener todas las recetas
router.get("/", async (req, res) => {
  try {
    const { titulo, dificultad, usuario } = req.query
    const filter = {}

    if (titulo) {
      filter.titulo = { $regex: titulo, $options: "i" }
    }
    if (dificultad) {
      filter.dificultad = dificultad
    }
    if (usuario) {
      filter.usuario = usuario
    }

    const recipes = await Recipe.find(filter).populate("usuario", "nombre email").select("-__v").sort({ createdAt: -1 })

    res.json({
      success: true,
      message: "Recetas obtenidas exitosamente",
      data: recipes,
      total: recipes.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener recetas",
      error: error.message,
    })
  }
})

// GET /api/recipes/:id - Obtener receta por ID con ingredientes
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("usuario", "nombre email").select("-__v")

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Receta no encontrada",
      })
    }

    const ingredients = await Ingredient.find({ receta: req.params.id }).select("-__v")

    res.json({
      success: true,
      message: "Receta obtenida exitosamente",
      data: {
        ...recipe.toObject(),
        ingredientes: ingredients,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener receta",
      error: error.message,
    })
  }
})

// POST /api/recipes - Crear nueva receta
router.post("/", createRecipeDTO, validatorFieldsDTO, async (req, res) => {
  try {
    // Verificar que el usuario existe
    const user = await User.findById(req.body.usuario)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    const recipe = new Recipe(req.body)
    await recipe.save()

    const populatedRecipe = await Recipe.findById(recipe._id).populate("usuario", "nombre email").select("-__v")

    res.status(201).json({
      success: true,
      message: "Receta creada exitosamente",
      data: populatedRecipe,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al crear receta",
      error: error.message,
    })
  }
})

// PUT /api/recipes/:id - Actualizar receta
router.put("/:id", updateRecipeDTO, validatorFieldsDTO, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate("usuario", "nombre email")
      .select("-__v")

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Receta no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Receta actualizada exitosamente",
      data: recipe,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al actualizar receta",
      error: error.message,
    })
  }
})

// DELETE /api/recipes/:id - Eliminar receta
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id)

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Receta no encontrada",
      })
    }

    res.json({
      success: true,
      message: "Receta eliminada exitosamente",
      data: recipe,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar receta",
      error: error.message,
    })
  }
})

// GET /api/recipes/:id/ingredients - Obtener ingredientes de una receta
router.get("/:id/ingredients", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Receta no encontrada",
      })
    }

    const ingredients = await Ingredient.find({ receta: req.params.id }).populate("receta", "titulo").select("-__v")

    res.json({
      success: true,
      message: "Ingredientes obtenidos exitosamente",
      data: ingredients,
      total: ingredients.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener ingredientes",
      error: error.message,
    })
  }
})

module.exports = router
