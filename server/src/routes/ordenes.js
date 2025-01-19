const express = require('express');
const router = express.Router();
const {crearOrden,mostrarOrdenes,mostrarOrden} = require('../controllers/ordenes');

router.post('/',crearOrden);
router.get('/',mostrarOrdenes);
router.get('/:id',mostrarOrden);

module.exports = router;