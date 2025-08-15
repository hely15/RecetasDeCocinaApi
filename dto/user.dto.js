const { body } = require("express-validator")

const createUserDTO = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres")
    .trim(),

  body("email").isEmail().withMessage("Debe ser un email válido").normalizeEmail(),

  body("edad").optional().isInt({ min: 13, max: 120 }).withMessage("La edad debe estar entre 13 y 120 años"),

  body("pais").optional().trim().isLength({ min: 2 }).withMessage("El país debe tener al menos 2 caracteres"),
]

const updateUserDTO = [
  body("nombre").optional().isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres").trim(),

  body("email").optional().isEmail().withMessage("Debe ser un email válido").normalizeEmail(),

  body("edad").optional().isInt({ min: 13, max: 120 }).withMessage("La edad debe estar entre 13 y 120 años"),

  body("pais").optional().trim().isLength({ min: 2 }).withMessage("El país debe tener al menos 2 caracteres"),
]

module.exports = {
  createUserDTO,
  updateUserDTO,
}
