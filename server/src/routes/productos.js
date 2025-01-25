const express = require('express');
const router = express.Router();

const { obtenerProductos, crearProducto, mostrarImagen,editarProducto } = require('../controllers/productos');
const verificarToken = require('../config/middleware');

router.get('/mostrarProductos', verificarToken, obtenerProductos);
router.post('/crearProducto', crearProducto);
router.get('/imagen/:nombreImagen', mostrarImagen);
router.put('/editarProducto/:id', editarProducto);
module.exports = router;
