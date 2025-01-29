const { sql } = require("../config/db.js");

// Endpoint para obtener los usuarios
// Ruta protegida con JWT
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener la lista de usuarios
 *     description: Retorna todos los usuarios registrados en la base de datos.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   usuario:
 *                     type: string
 *       401:
 *         description: No autorizado (Token inválido o ausente).
 */
const getUsers = async (req, res) => {
  try {
    const result = await sql.query("SELECT id, usuario FROM Usuarios");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

module.exports = {
  getUsers,
};
