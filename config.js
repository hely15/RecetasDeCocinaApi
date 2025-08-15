require("dotenv").config()

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/culinary_recipes",
  nodeEnv: process.env.NODE_ENV || "development",
}

module.exports = config
