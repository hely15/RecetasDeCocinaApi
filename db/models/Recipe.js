const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      minlength: [10, "La descripción debe tener al menos 10 caracteres"],
    },
    instrucciones: {
      type: String,
      required: [true, "Las instrucciones son obligatorias"],
      minlength: [20, "Las instrucciones deben tener al menos 20 caracteres"],
    },
    tiempoCoccion: {
      type: Number,
      required: [true, "El tiempo de cocción es obligatorio"],
      min: [1, "El tiempo mínimo es 1 minuto"],
    },
    dificultad: {
      type: String,
      enum: ["Fácil", "Intermedio", "Difícil"],
      default: "Fácil",
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es obligatorio"],
    },
  },
  {
    timestamps: true,
  },
)

// Middleware para eliminar ingredientes cuando se elimina una receta
recipeSchema.pre("findOneAndDelete", async function () {
  const recipeId = this.getQuery()._id
  await mongoose.model("Ingredient").deleteMany({ receta: recipeId })
})

recipeSchema.pre("deleteMany", async function () {
  const recipes = await this.model.find(this.getQuery())
  const recipeIds = recipes.map((recipe) => recipe._id)
  await mongoose.model("Ingredient").deleteMany({ receta: { $in: recipeIds } })
})

module.exports = mongoose.model("Recipe", recipeSchema)
