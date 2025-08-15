const { body } = require("express-validator")

const createIngredientDTO = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre del ingrediente es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres")
    .trim(),

  body("cantidad").notEmpty().withMessage("La cantidad es obligatoria").trim(),

  body("unidad")
    .notEmpty()
    .withMessage("La unidad es obligatoria")
    .isIn([
      "gramos",
      "kilogramos",
      "litros",
      "mililitros",
      "tazas",
      "cucharadas",
      "cucharaditas",
      "piezas",
      "dientes",
      "hojas",
    ])
    .withMessage("Unidad inválida"),

  body("receta").notEmpty().withMessage("La receta es obligatoria").isMongoId().withMessage("ID de receta inválido"),
]

module.exports = {
  createIngredientDTO,
}
