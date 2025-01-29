const { sql } = require("../../config/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Endpoint de login con JWT
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               clave:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve un token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Usuario o contraseña incorrectos.
 */
const login = async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    // Buscar usuario en la base de datos
    const result =
      await sql.query`SELECT * FROM Usuarios WHERE usuario = ${usuario}`;

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = result.recordset[0];

    // Comparar la contraseña (sin encriptar por ahora)
    if (clave !== user.clave) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { usuario: user.usuario, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar el login" });
  }
};

module.exports = {
  login,
};
