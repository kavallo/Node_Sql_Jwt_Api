const express = require("express");
const { login } = require("../controllers/auth/authController");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Agrega un nuevo producto a la base de datos.
 */
router.post("/", login);

module.exports = router;
