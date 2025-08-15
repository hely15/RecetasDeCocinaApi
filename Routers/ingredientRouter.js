const express = require("express")
const Ingredient = require("../db/models/Ingredient")
const Recipe = require("../db/models/Recipe")
const { createIngredientDTO } = require("../dto/ingredient.dto")
const validatorFieldsDTO = require("../middlewares/validatorFieldsDTO")

const router = express.Router()

// GET /api/ingredients - Obtener todos los ingredientes
router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find()
      .populate("receta", "titulo usuario")
      .select("-__v")
      .sort({ createdAt: -1 })

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

// POST /api/ingredients - Agregar ingrediente a una receta
router.post("/", createIngredientDTO, validatorFieldsDTO, async (req, res) => {
  try {
    // Verificar que la receta existe
    const recipe = await Recipe.findById(req.body.receta)
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Receta no encontrada",
      })
    }

    const ingredient = new Ingredient(req.body)
    await ingredient.save()

    const populatedIngredient = await Ingredient.findById(ingredient._id).populate("receta", "titulo").select("-__v")

    res.status(201).json({
      success: true,
      message: "Ingrediente agregado exitosamente",
      data: populatedIngredient,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Este ingrediente ya existe en la receta",
      })
    }

    res.status(400).json({
      success: false,
      message: "Error al agregar ingrediente",
      error: error.message,
    })
  }
})

// DELETE /api/ingredients/:id - Eliminar ingrediente
router.delete("/:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id)

    if (!ingredient) {
      return res.status(404).json({
        success: false,
        message: "Ingrediente no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Ingrediente eliminado exitosamente",
      data: ingredient,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar ingrediente",
      error: error.message,
    })
  }
})

module.exports = router
