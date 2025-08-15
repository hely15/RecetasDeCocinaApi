const errorHandler = (err, req, res, next) => {
  console.error("Error:", err)

  // Error de validación de Mongoose
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }))

    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors,
    })
  }

  // Error de duplicado (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({
      success: false,
      message: `El ${field} ya existe`,
      error: `Valor duplicado: ${err.keyValue[field]}`,
    })
  }

  // Error de cast (ID inválido)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "ID inválido",
      error: err.message,
    })
  }

  // Error genérico del servidor
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : "Algo salió mal",
  })
}

module.exports = errorHandler
