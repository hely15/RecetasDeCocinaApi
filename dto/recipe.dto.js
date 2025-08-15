const { body } = require("express-validator")

const createRecipeDTO = [
  body("titulo")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres")
    .trim(),

  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres")
    .trim(),

  body("instrucciones")
    .notEmpty()
    .withMessage("Las instrucciones son obligatorias")
    .isLength({ min: 20 })
    .withMessage("Las instrucciones deben tener al menos 20 caracteres")
    .trim(),

  body("tiempoCoccion").isInt({ min: 1 }).withMessage("El tiempo de cocción debe ser un número mayor a 0"),

  body("dificultad")
    .optional()
    .isIn(["Fácil", "Intermedio", "Difícil"])
    .withMessage("La dificultad debe ser: Fácil, Intermedio o Difícil"),

  body("usuario").notEmpty().withMessage("El usuario es obligatorio").isMongoId().withMessage("ID de usuario inválido"),
]

const updateRecipeDTO = [
  body("titulo").optional().isLength({ min: 3 }).withMessage("El título debe tener al menos 3 caracteres").trim(),

  body("descripcion")
    .optional()
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres")
    .trim(),

  body("instrucciones")
    .optional()
    .isLength({ min: 20 })
    .withMessage("Las instrucciones deben tener al menos 20 caracteres")
    .trim(),

  body("tiempoCoccion").optional().isInt({ min: 1 }).withMessage("El tiempo de cocción debe ser un número mayor a 0"),

  body("dificultad")
    .optional()
    .isIn(["Fácil", "Intermedio", "Difícil"])
    .withMessage("La dificultad debe ser: Fácil, Intermedio o Difícil"),
]

module.exports = {
  createRecipeDTO,
  updateRecipeDTO,
}
