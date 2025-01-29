const { sql } = require("../config/db.js");

// Obtener todos los productos
const getProductos = async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Productos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Obtener producto por ID
const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result =
      await sql.query`SELECT * FROM Productos WHERE productoid = ${id}`;
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
  const { nombreproducto, precioproducto } = req.body;
  try {
    await sql.query`INSERT INTO Productos (nombreproducto, precioproducto) VALUES (${nombreproducto}, ${precioproducto})`;
    res.status(201).json({ message: "Producto agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombreproducto, precioproducto } = req.body;
  try {
    const result =
      await sql.query`UPDATE Productos SET nombreproducto = ${nombreproducto}, precioproducto = ${precioproducto} WHERE productoid = ${id}`;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const result =
      await sql.query`DELETE FROM Productos WHERE productoid = ${id}`;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
