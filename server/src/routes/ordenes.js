const express = require('express');
const { crearOrden, obtenerOrdenes, obtenerDetallesOrden } = require('../controllers/ordenes');

const router = express.Router();

router.post('/crearOrden', crearOrden);
router.get('/listarOrdenes', obtenerOrdenes);
router.get('/orden/:id', obtenerDetallesOrden);

module.exports = router;