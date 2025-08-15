const mongoose = require("mongoose")

const ingredientSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del ingrediente es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    },
    cantidad: {
      type: String,
      required: [true, "La cantidad es obligatoria"],
      trim: true,
    },
    unidad: {
      type: String,
      required: [true, "La unidad es obligatoria"],
      enum: [
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
      ],
      trim: true,
    },
    receta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: [true, "La receta es obligatoria"],
    },
  },
  {
    timestamps: true,
  },
)

// Índice compuesto para evitar ingredientes duplicados en la misma receta
ingredientSchema.index({ nombre: 1, receta: 1 }, { unique: true })

module.exports = mongoose.model("Ingredient", ingredientSchema)
