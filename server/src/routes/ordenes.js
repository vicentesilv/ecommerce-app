const express = require('express');
const { crearOrden, obtenerOrdenes, obtenerDetallesOrden } = require('../controllers/ordenes');

const router = express.Router();

router.post('/', crearOrden);
router.get('/', obtenerOrdenes);
router.get('/:id', obtenerDetallesOrden);

module.exports = router;