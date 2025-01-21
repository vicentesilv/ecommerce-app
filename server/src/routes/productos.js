const express = require('express');
const { obtenerProductos, crearProducto, mostrarImagen,editarProducto } = require('../controllers/productos');

const router = express.Router();

router.get('/mostrarProductos', obtenerProductos);
router.post('/crearProducto', crearProducto);
router.get('/imagen/:nombreImagen', mostrarImagen);
router.put('/editarProducto/:id', editarProducto);
module.exports = router;
