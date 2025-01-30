const express = require("express");
const cors = require("cors");

const verificarToken = require("./middleware/authMiddleware");
const setupSwagger = require("./swagger");
const { connectDB, sql } = require("./config/db");

// const dotenv = require("dotenv");
const productosRoutes = require("./routes/productosRoutes");
const loginRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Inicializar Swagger
setupSwagger(app);

// Conectar a la base de datos al iniciar
connectDB();

// Usar rutas de productos
app.use("/productos", productosRoutes);
app.use("/login", loginRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log("Servidor corriendo...");
});
