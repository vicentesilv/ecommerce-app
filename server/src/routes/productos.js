const express = require('express');
const router = express.Router();

const { obtenerProductos,obtenerProducto, crearProducto, mostrarImagen,editarProducto,mostrarProductosVendedor,eliminarProducto} = require('../controllers/productos');
const { verificarToken, verificarRol } = require('../middleware/middleware.verify');

//cual¿quier usuario puede ver y buscar los productos
router.get('/mostrarProductos', obtenerProductos);
router.get('/obtnerProducto/:nombre', obtenerProducto);
router.get('/imagen/:nombreImagen', mostrarImagen);

//solo los vendedores pueden crear y editar productos
router.get('/mostrarProductosVendedor/:idVendedor', verificarToken,verificarRol("vendedor"),mostrarProductosVendedor);
router.post('/crearProducto', verificarToken,verificarRol("vendedor"),crearProducto);
router.put('/editarProducto/:id', verificarToken,verificarRol("vendedor"),editarProducto);
router.delete('/eliminarProducto/:id', verificarToken,verificarRol("vendedor"),eliminarProducto);

module.exports = router;
