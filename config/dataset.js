const mongoose = require("mongoose")
const connectDB = require("./db/connection")
const User = require("./db/models/User")
const Recipe = require("./db/models/Recipe")
const Ingredient = require("./db/models/Ingredient")
require("dotenv").config()

const sampleData = {
  users: [
    {
      nombre: "María González",
      email: "maria@example.com",
      edad: 28,
      pais: "España",
    },
    {
      nombre: "Carlos Rodríguez",
      email: "carlos@example.com",
      edad: 35,
      pais: "México",
    },
    {
      nombre: "Ana López",
      email: "ana@example.com",
      edad: 42,
      pais: "Argentina",
    },
    {
      nombre: "Juan Pérez",
      email: "juan@example.com",
      edad: 31,
      pais: "Colombia",
    },
  ],
  recipes: [
    {
      titulo: "Paella Valenciana",
      descripcion: "Auténtica paella valenciana con pollo, conejo y verduras frescas",
      instrucciones:
        "1. Calentar aceite en paellera. 2. Sofreír pollo y conejo. 3. Agregar verduras. 4. Añadir arroz y caldo. 5. Cocinar 18 minutos.",
      tiempoCoccion: 45,
      dificultad: "Intermedio",
      userEmail: "maria@example.com",
      ingredientes: [
        { nombre: "arroz", cantidad: "400", unidad: "gramos" },
        { nombre: "pollo", cantidad: "500", unidad: "gramos" },
        { nombre: "judías verdes", cantidad: "200", unidad: "gramos" },
        { nombre: "tomate", cantidad: "2", unidad: "piezas" },
        { nombre: "azafrán", cantidad: "1", unidad: "cucharaditas" },
      ],
    },
    {
      titulo: "Tacos de Pollo",
      descripcion: "Deliciosos tacos mexicanos con pollo marinado y vegetales frescos",
      instrucciones:
        "1. Marinar pollo con especias. 2. Cocinar pollo a la plancha. 3. Calentar tortillas. 4. Armar tacos con vegetales frescos.",
      tiempoCoccion: 30,
      dificultad: "Fácil",
      userEmail: "carlos@example.com",
      ingredientes: [
        { nombre: "pollo", cantidad: "400", unidad: "gramos" },
        { nombre: "tortillas", cantidad: "8", unidad: "piezas" },
        { nombre: "cebolla", cantidad: "1", unidad: "piezas" },
        { nombre: "tomate", cantidad: "2", unidad: "piezas" },
        { nombre: "lechuga", cantidad: "100", unidad: "gramos" },
      ],
    },
    {
      titulo: "Lasaña de Carne",
      descripcion: "Clásica lasaña italiana con carne molida y salsa bechamel",
      instrucciones:
        "1. Preparar salsa de carne. 2. Hacer bechamel. 3. Cocinar pasta. 4. Armar capas. 5. Hornear 45 minutos a 180°C.",
      tiempoCoccion: 90,
      dificultad: "Difícil",
      userEmail: "juan@example.com",
      ingredientes: [
        { nombre: "pasta", cantidad: "300", unidad: "gramos" },
        { nombre: "carne molida", cantidad: "500", unidad: "gramos" },
        { nombre: "queso mozzarella", cantidad: "200", unidad: "gramos" },
        { nombre: "leche", cantidad: "500", unidad: "mililitros" },
      ],
    },
    {
      titulo: "Ensalada César",
      descripcion: "Fresca ensalada césar con pollo a la parrilla y aderezo casero",
      instrucciones:
        "1. Asar pollo. 2. Preparar aderezo césar. 3. Tostar pan. 4. Mezclar lechuga con aderezo. 5. Servir con pollo y crutones.",
      tiempoCoccion: 25,
      dificultad: "Fácil",
      userEmail: "ana@example.com",
      ingredientes: [
        { nombre: "lechuga romana", cantidad: "2", unidad: "piezas" },
        { nombre: "pollo", cantidad: "300", unidad: "gramos" },
        { nombre: "queso parmesano", cantidad: "100", unidad: "gramos" },
        { nombre: "pan", cantidad: "4", unidad: "piezas" },
      ],
    },
  ],
}

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB()

    // Clear existing data
    console.log("🧹 Limpiando datos existentes...")
    await Ingredient.deleteMany({})
    await Recipe.deleteMany({})
    await User.deleteMany({})

    console.log("👥 Creando usuarios...")
    const createdUsers = await User.insertMany(sampleData.users)
    console.log(`✅ Creados ${createdUsers.length} usuarios`)

    // Create recipes with ingredients
    console.log("🍽️ Creando recetas e ingredientes...")
    let totalRecipes = 0
    let totalIngredients = 0

    for (const recipeData of sampleData.recipes) {
      // Find the user by email
      const user = createdUsers.find((u) => u.email === recipeData.userEmail)

      if (user) {
        // Create recipe
        const recipe = await Recipe.create({
          titulo: recipeData.titulo,
          descripcion: recipeData.descripcion,
          instrucciones: recipeData.instrucciones,
          tiempoCoccion: recipeData.tiempoCoccion,
          dificultad: recipeData.dificultad,
          usuario: user._id,
        })

        totalRecipes++

        // Create ingredients for this recipe
        const ingredientPromises = recipeData.ingredientes.map((ingredientData) =>
          Ingredient.create({
            nombre: ingredientData.nombre,
            cantidad: ingredientData.cantidad,
            unidad: ingredientData.unidad,
            receta: recipe._id,
          }),
        )

        await Promise.all(ingredientPromises)
        totalIngredients += recipeData.ingredientes.length

        console.log(`✅ Creada receta: ${recipe.titulo} con ${recipeData.ingredientes.length} ingredientes`)
      }
    }

    console.log("\n🎉 ¡Base de datos poblada exitosamente!")
    console.log(`📊 Resumen:`)
    console.log(`   Usuarios: ${createdUsers.length}`)
    console.log(`   Recetas: ${totalRecipes}`)
    console.log(`   Ingredientes: ${totalIngredients}`)

    console.log("\n🚀 ¡Ya puedes probar los endpoints de la API!")
    console.log("   Inicio: GET http://localhost:3000/")
    console.log("   Usuarios: GET http://localhost:3000/api/users")
    console.log("   Recetas: GET http://localhost:3000/api/recipes")
    console.log(
      "   Buscar por ingrediente: GET http://localhost:3000/api/search/recipes-by-ingredient?ingrediente=pollo",
    )

    process.exit(0)
  } catch (error) {
    console.error("❌ Error poblando la base de datos:", error)
    process.exit(1)
  }
}

// Run the seeder
seedDatabase()
