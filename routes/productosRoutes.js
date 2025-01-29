const express = require("express");
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("../controllers/productosController");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna la lista de productos almacenados en la base de datos.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente.
 */
router.get("/", verificarToken, getProductos);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Retorna un producto específico basado en su ID.
 */
router.get("/:id", verificarToken, getProductoById);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Agrega un nuevo producto a la base de datos.
 */
router.post("/", verificarToken, createProducto);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Modifica un producto existente basado en su ID.
 */
router.put("/:id", verificarToken, updateProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Borra un producto de la base de datos basado en su ID.
 */
router.delete("/:id", verificarToken, deleteProducto);

module.exports = router;
