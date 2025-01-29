const express = require("express");
const { getUsers } = require("../controllers/usersController");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Retorna la lista de usuarios almacenados en la base de datos.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 */
router.get("/", verificarToken, getUsers);

module.exports = router;
