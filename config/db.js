require("dotenv").config();
const sql = require("mssql");

// Configuración de SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: process.env.DB_ENCRYPTED === "true",
    trustServerCertificate: true,
  },
};

// Función para conectar a la BD
async function connectDB() {
  try {
    await sql.connect(dbConfig);
    console.log("Conectado a SQL Server");
  } catch (error) {
    console.error("Error al conectar a la BD:", error);
  }
}

module.exports = { connectDB, sql };
