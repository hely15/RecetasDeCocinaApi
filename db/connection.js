const mongoose = require("mongoose")
const config = require("../config")

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri)
    console.log("✅ Conexión exitosa a MongoDB")
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message)
    process.exit(1)
  }
}

module.exports = connectDB
