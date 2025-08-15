const express = require("express")
const cors = require("cors")
const connectDB = require("./db/connection")
const config = require("./config")
const errorHandler = require("./middlewares/errorHandler")

// Importar routers
const userRouter = require("./routers/userRouter")
const recipeRouter = require("./routers/recipeRouter")
const ingredientRouter = require("./routers/ingredientRouter")
const searchRouter = require("./routers/searchRouter")

const app = express()

// Conectar a la base de datos
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API de Recetas",
    version: "1.0.0",
    endpoints: {
      usuarios: "/api/users",
      recetas: "/api/recipes",
      ingredientes: "/api/ingredients",
      busqueda: "/api/search",
    },
    documentation: "Consulta el README.md para más información",
  })
})

// Rutas de la API
app.use("/api/users", userRouter)
app.use("/api/recipes", recipeRouter)
app.use("/api/ingredients", ingredientRouter)
app.use("/api/search", searchRouter)

// Middleware de manejo de errores
app.use(errorHandler)

// Ruta para manejar endpoints no encontrados
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint no encontrado",
    availableEndpoints: ["GET /", "GET /api/users", "GET /api/recipes", "GET /api/ingredients", "GET /api/search"],
  })
})

// Iniciar servidor
const PORT = config.port
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`)
  console.log(`📱 API disponible en: http://localhost:${PORT}`)
  console.log(`📚 Documentación: http://localhost:${PORT}`)
})

module.exports = app
