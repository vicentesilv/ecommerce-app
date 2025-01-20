const express = require('express');
const {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
  vaciarCarrito
} = require('../controllers/carro');

const router = express.Router();

router.post('/agregarCarrito', agregarAlCarrito);
router.get('/:idUsuario', obtenerCarrito);
router.delete('/:idCarrito', eliminarDelCarrito);
router.delete('/vaciar/:idUsuario', vaciarCarrito);

module.exports = router;