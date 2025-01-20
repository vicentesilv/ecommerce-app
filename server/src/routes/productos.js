const express = require('express');
const { obtenerProductos, crearProducto } = require('../controllers/productos');

const router = express.Router();

router.get('/', obtenerProductos);
router.post('/', crearProducto);

module.exports = router;