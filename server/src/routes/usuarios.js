const express = require('express');
const { registro, inicioSesion } = require('../controllers/usuarios');
const router = express.Router();

router.post('/registrar', registro);
router.post('/inicioSesion', inicioSesion);

module.exports = router;
