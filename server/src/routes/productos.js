const express = require('express');
const { obtenerProductos, crearProducto, editarProducto } = require('../controllers/productos');

const router = express.Router();

router.get('/listarProductos', obtenerProductos);
router.post('/crearProducto', crearProducto);
router.put('/editarProducto/:id', editarProducto);

module.exports = router;