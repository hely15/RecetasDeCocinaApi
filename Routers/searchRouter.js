const express = require("express")
const Recipe = require("../db/models/Recipe")
const Ingredient = require("../db/models/Ingredient")
const User = require("../db/models/User")

const router = express.Router()

// GET /api/search/recipes-by-ingredient?ingrediente=pollo
router.get("/recipes-by-ingredient", async (req, res) => {
  try {
    const { ingrediente } = req.query

    if (!ingrediente) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro "ingrediente" es obligatorio',
      })
    }

    // Buscar ingredientes que coincidan
    const ingredients = await Ingredient.find({
      nombre: { $regex: ingrediente, $options: "i" },
    }).select("receta")

    const recipeIds = ingredients.map((ing) => ing.receta)

    // Buscar recetas que contengan esos ingredientes
    const recipes = await Recipe.find({ _id: { $in: recipeIds } })
      .populate("usuario", "nombre email")
      .select("-__v")

    res.json({
      success: true,
      message: `Recetas encontradas con ingrediente: ${ingrediente}`,
      data: recipes,
      total: recipes.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la búsqueda",
      error: error.message,
    })
  }
})

// GET /api/search/global?q=pollo
router.get("/global", async (req, res) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro "q" es obligatorio',
      })
    }

    const searchRegex = { $regex: q, $options: "i" }

    // Buscar en usuarios
    const users = await User.find({
      $or: [{ nombre: searchRegex }, { email: searchRegex }, { pais: searchRegex }],
    })
      .select("-__v")
      .limit(10)

    // Buscar en recetas
    const recipes = await Recipe.find({
      $or: [{ titulo: searchRegex }, { descripcion: searchRegex }, { instrucciones: searchRegex }],
    })
      .populate("usuario", "nombre email")
      .select("-__v")
      .limit(10)

    // Buscar en ingredientes
    const ingredients = await Ingredient.find({
      nombre: searchRegex,
    })
      .populate("receta", "titulo")
      .select("-__v")
      .limit(10)

    res.json({
      success: true,
      message: `Resultados de búsqueda para: ${q}`,
      data: {
        usuarios: users,
        recetas: recipes,
        ingredientes: ingredients,
      },
      total: {
        usuarios: users.length,
        recetas: recipes.length,
        ingredientes: ingredients.length,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la búsqueda global",
      error: error.message,
    })
  }
})

module.exports = router
