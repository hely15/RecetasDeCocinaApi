# API de Recetas Culinarias

Una API REST completa para una plataforma de recetas culinarias donde los usuarios pueden registrarse, agregar recetas con ingredientes, y buscar recetas por ingredientes específicos.

## Video De Sustentacion 
>[Video](https://correouisedu-my.sharepoint.com/:f:/g/personal/hely2254255_correo_uis_edu_co/Ejr2EbAPIPJJmuO8wkDKnDAB4JaQjQNJMDb6xwcuw-KQpw)


## 🚀 Características

- **Gestión de Usuarios**: Registro, consulta, actualización y eliminación de usuarios
- **Gestión de Recetas**: CRUD completo de recetas con relación a usuarios
- **Gestión de Ingredientes**: Agregar, consultar y eliminar ingredientes por receta
- **Búsqueda Avanzada**: Buscar recetas por ingredientes específicos
- **Validaciones**: Validación de datos con DTOs y manejo de errores
- **Relaciones**: Eliminación en cascada de datos relacionados

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Express Validator** - Validación de datos
- **Dotenv** - Gestión de variables de entorno

## 📁 Estructura del Proyecto

```
culinary-recipes-api/
├── db/
│   ├── connection.js        # Conexión a MongoDB
│   └── models/
│       ├── User.js         # Modelo de usuario
│       ├── Recipe.js       # Modelo de receta
│       └── Ingredient.js   # Modelo de ingrediente
├── dto/
│   ├── user.dto.js         # Validaciones de usuario
│   ├── recipe.dto.js       # Validaciones de receta
│   └── ingredient.dto.js   # Validaciones de ingrediente
├── middlewares/
│   ├── validatorFieldsDTO.js # Middleware de validación
│   └── errorHandler.js     # Manejo de errores
├── routers/
│   ├── userRouter.js       # Rutas de usuarios
│   ├── recipeRouter.js     # Rutas de recetas
│   ├── ingredientRouter.js # Rutas de ingredientes
│   └── searchRouter.js     # Rutas de búsqueda
├── .env                    # Variables de entorno
├── config.js               # Configuración general
├── dataset.js              # Script de datos de prueba
├── app.js                  # Servidor principal
├── package.json            # Dependencias y scripts
└── README.md              # Documentación
```

## 📦 Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone <repository-url>
cd culinary-recipes-api
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar variables de entorno**
El archivo `.env` ya está configurado:
\`\`\`env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/recipes_db
NODE_ENV=development
\`\`\`

4. **Iniciar MongoDB**
Asegúrate de que MongoDB esté ejecutándose en tu sistema.

5. **Poblar la base de datos con datos de prueba**
\`\`\`bash
npm run seed
\`\`\`

6. **Iniciar el servidor**
# Desarrollo (con nodemon)
```
npm run dev
```
# Producción
```
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Documentación de Endpoints

### 🏠 Inicio

#### GET /
Información general de la API.

**Response:**
```json
{
  "success": true,
  "message": "API de Recetas",
  "version": "1.0.0",
  "endpoints": {
    "usuarios": "/api/users",
    "recetas": "/api/recipes",
    "ingredientes": "/api/ingredients",
    "busqueda": "/api/search"
  }
}
```

---

## 🧪 Ejemplos de Uso con Postman

### 1. **Crear Usuario**
```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "nombre": "Pedro García",
  "email": "pedro@example.com",
  "edad": 29,
  "pais": "España"
}
```

### 2. **Obtener Todos los Usuarios**
```
GET http://localhost:3000/api/users
```

### 3. **Crear Receta**
```
POST http://localhost:3000/api/recipes
Content-Type: application/json

{
  "titulo": "Gazpacho Andaluz",
  "descripcion": "Refrescante sopa fría de tomate típica del sur de España",
  "instrucciones": "1. Pelar y trocear tomates. 2. Mezclar con ajo, pan, aceite y vinagre. 3. Triturar hasta obtener textura cremosa. 4. Refrigerar 2 horas antes de servir.",
  "tiempoCoccion": 15,
  "dificultad": "Fácil",
  "usuario": "AQUÍ_VA_EL_ID_DEL_USUARIO"
}
```

### 4. **Agregar Ingredientes a Receta**
```
POST http://localhost:3000/api/ingredients
Content-Type: application/json

{
  "nombre": "tomate",
  "cantidad": "1",
  "unidad": "kilogramos",
  "receta": "AQUÍ_VA_EL_ID_DE_LA_RECETA"
}
```

### 5. **Buscar Recetas por Ingrediente**
```
GET http://localhost:3000/api/search/recipes-by-ingredient?ingrediente=pollo
```

### 6. **Obtener Receta con Ingredientes**
```
GET http://localhost:3000/api/recipes/AQUÍ_VA_EL_ID_DE_LA_RECETA
```

### 7. **Búsqueda Global**
```
GET http://localhost:3000/api/search/global?q=tomate
```

### 8. **Filtrar Recetas**
```
GET http://localhost:3000/api/recipes?titulo=paella&dificultad=Intermedio
```

---

## 🔧 Colección de Postman

### Configuración de Environment
Crea un environment en Postman con estas variables:

- `baseUrl`: `http://localhost:3000`
- `userId`: (se llenará después de crear un usuario)
- `recipeId`: (se llenará después de crear una receta)

### Requests Principales

1. **Health Check**
   - Method: `GET`
   - URL: `{{baseUrl}}/`

2. **Crear Usuario**
   - Method: `POST`
   - URL: `{{baseUrl}}/api/users`
   - Body (JSON):
   ```json
   {
     "nombre": "Test User",
     "email": "test@example.com",
     "edad": 25,
     "pais": "España"
   }
   ```

3. **Crear Receta**
   - Method: `POST`
   - URL: `{{baseUrl}}/api/recipes`
   - Body (JSON):
   ```json
   {
     "titulo": "Receta de Prueba",
     "descripcion": "Una deliciosa receta de prueba",
     "instrucciones": "Instrucciones detalladas de la receta de prueba",
     "tiempoCoccion": 30,
     "dificultad": "Fácil",
     "usuario": "{{userId}}"
   }
   ```

4. **Agregar Ingrediente**
   - Method: `POST`
   - URL: `{{baseUrl}}/api/ingredients`
   - Body (JSON):
   ```json
   {
     "nombre": "sal",
     "cantidad": "1",
     "unidad": "cucharaditas",
     "receta": "{{recipeId}}"
   }
   ```

---

## 🚨 Manejo de Errores

### Errores de Validación (400)
```json
{
  "success": false,
  "message": "Errores de validación",
  "errors": [
    {
      "field": "nombre",
      "message": "El nombre es obligatorio",
      "value": ""
    }
  ]
}
```

### Recurso No Encontrado (404)
```json
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

### Error del Servidor (500)
```json
{
  "success": false,
  "message": "Error interno del servidor",
  "error": "Descripción del error"
}
```

---

## 🎯 Casos de Uso Principales

### 1. **Flujo Completo de Usuario**
1. Crear usuario → `POST /api/users`
2. Crear receta → `POST /api/recipes`
3. Agregar ingredientes → `POST /api/ingredients`
4. Buscar recetas → `GET /api/search/recipes-by-ingredient`

### 2. **Búsqueda de Recetas**
- Por ingrediente: `GET /api/search/recipes-by-ingredient?ingrediente=pollo`
- Global: `GET /api/search/global?q=pasta`
- Con filtros: `GET /api/recipes?dificultad=Fácil`

### 3. **Gestión de Datos**
- Ver todas las recetas: `GET /api/recipes`
- Ver recetas de un usuario: `GET /api/users/:id/recipes`
- Ver ingredientes de una receta: `GET /api/recipes/:id/ingredients`

---

## 📊 Datos de Prueba

El script `dataset.js` crea:
- **4 usuarios** con diferentes perfiles
- **4 recetas** variadas (Paella, Tacos, Lasaña, Ensalada César)
- **17 ingredientes** distribuidos en las recetas

Para ejecutar:
```bash
npm run seed
```

## Diseñado Por Hely Santiago Diaz Almeida