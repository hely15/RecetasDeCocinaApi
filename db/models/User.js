const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
    },
    edad: {
      type: Number,
      min: [13, "La edad mínima es 13 años"],
      max: [120, "La edad máxima es 120 años"],
    },
    pais: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

// Middleware para eliminar recetas cuando se elimina un usuario
userSchema.pre("findOneAndDelete", async function () {
  const userId = this.getQuery()._id
  await mongoose.model("Recipe").deleteMany({ usuario: userId })
})

module.exports = mongoose.model("User", userSchema)
