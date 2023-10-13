const mysql = require('mysql2/promise');

// Configura la conexión a la base de datos
const connection = mysql.createPool({
    host: '192.168.100.2',
    port: '32000',
    user: 'root',
    password: 'root',
    database: 'proyecto', // Nombre de tu base de datos
});

// Función para obtener la lista de productos
async function obtenerProductos() {
  try {
    const [rows, fields] = await connection.query('SELECT * FROM productos');
    return rows;
  } catch (error) {
    throw error;
  }
}

// Función para crear un nuevo producto
async function crearProducto(nuevoProducto) {
  try {
    const [result] = await connection.query('INSERT INTO productos (nombre, precio, categoria, stock) VALUES (?, ?, ?, ?)', [nuevoProducto.nombre, nuevoProducto.precio, nuevoProducto.categoria, nuevoProducto.stock]);
    return { id: result.insertId, ...nuevoProducto };
  } catch (error) {
    throw error;
  }
}

// Función para actualizar el inventario de un producto
async function actualizarInventario(productId, nuevoInventario) {
  try {
    await connection.query('UPDATE productos SET stock = ? WHERE id = ?', [nuevoInventario, productId]);
    return { id: productId, stock: nuevoInventario };
  } catch (error) {
    throw error;
  }
}

// Función para eliminar un producto
async function eliminarProducto(productId) {
  try {
    await connection.query('DELETE FROM productos WHERE id = ?', [productId]);
  } catch (error) {
    throw error;
  }
}

// Función para modificar el precio y la categoría de un producto
async function modificarProducto(productId, nuevoPrecio, nuevaCategoria) {
  try {
    await connection.query('UPDATE productos SET precio = ?, categoria = ? WHERE id = ?', [nuevoPrecio, nuevaCategoria, productId]);
    return { id: productId, precio: nuevoPrecio, categoria: nuevaCategoria };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarInventario,
  eliminarProducto,
  modificarProducto,
};
