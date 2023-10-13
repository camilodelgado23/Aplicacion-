// En productosController.js
const express = require('express');
const router = express.Router();
const productosModel = require('../models/productosModel');
const xlsx = require('xlsx'); // Importa la librería xlsx para trabajar con archivos Excel

// Endpoint para obtener la lista de productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await productosModel.obtenerProductos();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Endpoint para crear un nuevo producto
router.post('/productos', async (req, res) => {
  try {
    const nuevoProducto = req.body;
    const productoCreado = await productosModel.crearProducto(nuevoProducto);
    res.json(productoCreado);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Endpoint para actualizar el inventario de un producto
router.put('/productos/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const nuevoInventario = req.body.stock;
    const productoActualizado = await productosModel.actualizarInventario(productId, nuevoInventario);
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar el inventario del producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Endpoint para eliminar un producto
router.delete('/productos/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await productosModel.eliminarProducto(productId);
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Endpoint para cargar productos desde un archivo Excel
router.post('/cargar-excel', async (req, res) => {
  try {
    const file = req.files.archivo; // Supongamos que estás utilizando una librería para manejar la carga de archivos, como 'express-fileupload'
    if (!file) {
      return res.status(400).json({ mensaje: 'No se ha proporcionado un archivo' });
    }

    // Cargar los productos desde el archivo Excel y guardarlos
    const productos = await cargarProductosDesdeExcel(file.data);
    await productosModel.guardarProductos(productos);

    res.json({ mensaje: 'Productos cargados exitosamente desde el archivo Excel' });
  } catch (error) {
    console.error('Error al cargar productos desde el archivo Excel:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Función para cargar productos desde un archivo Excel
async function cargarProductosDesdeExcel(excelData) {
  try {
    const workbook = xlsx.read(excelData);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(worksheet);
  } catch (error) {
    console.error('Error al cargar productos desde el archivo Excel:', error);
    throw error;
  }
}

module.exports = router;
