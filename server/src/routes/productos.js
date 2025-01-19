const express = require('express');
const router = express.Router();
const {listarProductos,mostrarProducto,crearProducto,editarProducto,eliminarProducto} = require('../controllers/productos');

router.get('/',listarProductos);
router.get('/:id',mostrarProducto);
router.post('/',crearProducto);
router.put('/:id',editarProducto);
router.delete('/:id',eliminarProducto);

module.exports = router